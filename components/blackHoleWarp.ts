import { gsap } from 'gsap';
import * as THREE from 'three';

/**
 * runWarp — the "reality torn into the black hole" transition.
 *
 * Instead of CSS-transforming the live page (which just spins a rectangle), we
 * snapshot the current viewport to a texture and feed it to a WebGL shader that
 * actually distorts those pixels: a swirling vortex + radial in-fall toward the
 * hole point, chromatic-aberration fringing, and a growing event horizon with a
 * hot accretion rim. When the collapse finishes we fade to black and reload —
 * which replays the preloader and drops the visitor back on the hero.
 *
 * holeX / holeY are the hole's centre in viewport (CSS-px) coordinates; they may
 * be negative when the hole bleeds above the top edge, which is fine — the
 * vortex simply converges on a point above the fold.
 */

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uTex;
uniform float uProgress;
uniform vec2  uHole;     // hole centre in UV (y already GL-flipped)
uniform float uAspect;   // viewport w/h

void main() {
  vec2 uv = vUv;

  // aspect-corrected vector from the hole, so the swirl stays circular
  vec2 d = uv - uHole;
  d.x *= uAspect;
  float r   = length(d);
  float ang = atan(d.y, d.x);

  float p = uProgress;

  // swirl — inner pixels rotate far faster, intensity ramps with progress
  ang += p * 3.4 * exp(-r * 3.0);

  // radial in-fall — sample from further out so content streams toward the hole,
  // then an extra late-stage collapse yanks everything in at the end
  float pull = p * (0.62 / (r + 0.16));
  float sr   = r * (1.0 + pull);
  sr = mix(sr, sr * (1.0 + p * 1.6), smoothstep(0.55, 1.0, p));

  vec2 sd  = vec2(cos(ang), sin(ang)) * sr;
  sd.x /= uAspect;
  vec2 suv = uHole + sd;

  // chromatic aberration along the radial direction, widening as it collapses
  vec2  dir = normalize(uv - uHole + 1e-5);
  float ca  = p * 0.013 * (0.4 + r);
  float cr = texture2D(uTex, suv + dir * ca).r;
  float cg = texture2D(uTex, suv).g;
  float cb = texture2D(uTex, suv - dir * ca).b;
  vec3 col = vec3(cr, cg, cb);

  // anything pulled past the texture edge reads as empty space
  if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) col = vec3(0.0);

  // event horizon: a black disk that swells to swallow the centre
  float eh   = p * 0.45;
  float hole = smoothstep(eh, eh * 0.6, r);              // 1 inside .. 0 outside
  col = mix(col, vec3(0.0), hole);

  // dim the whole frame as it finishes folding away
  col *= (1.0 - smoothstep(0.78, 1.0, p));

  gl_FragColor = vec4(col, 1.0);
}
`;

export async function runWarp(holeX: number, holeY: number): Promise<void> {
  const html = document.documentElement;
  if (html.dataset.warping) return; // one-way trip; ignore repeat presses
  html.dataset.warping = '1';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Black veil over <html> (outside <body>) so the body's own state never
  // affects it — it holds solid black right up to the reload.
  const veil = document.createElement('div');
  veil.dataset.warpVeil = '1';
  veil.style.cssText =
    'position:fixed;inset:0;background:#000;opacity:0;z-index:2147483647;pointer-events:none';
  html.appendChild(veil);

  // Ask the preloader to replay on the load that follows: the intro normally
  // fires only once ever, but pressing the hole is an explicit "do it again".
  const reload = () => {
    try { sessionStorage.setItem('intro:replay', '1'); } catch {}
    window.location.reload();
  };

  const fadeAndReload = (duration: number) =>
    gsap
      .timeline({ onComplete: reload })
      .to(veil, { opacity: 1, duration, ease: 'power2.in' })
      .to({}, { duration: 0.45 });

  if (reduce) {
    fadeAndReload(0.6);
    return;
  }

  // Snapshot the current viewport. The visitor is at the very top when they
  // press the apex barricade, so body's top-left == the viewport.
  let snap: HTMLCanvasElement | null = null;
  try {
    const { toCanvas } = await import('html-to-image');
    // pixelRatio:1 + skipFonts keeps the capture fast so the warp starts promptly
    snap = await toCanvas(document.body, {
      width: W,
      height: H,
      pixelRatio: 1,
      skipFonts: true,
      backgroundColor: getComputedStyle(document.body).backgroundColor || '#05060a',
      filter: (node) =>
        !(node instanceof HTMLElement && node.dataset && node.dataset.warpVeil === '1'),
    });
  } catch {
    snap = null;
  }

  if (!snap) {
    // capture failed (some browsers/CSS) — still give a clean fade-out
    fadeAndReload(0.8);
    return;
  }

  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:2147483646;pointer-events:none';
  html.appendChild(overlay);

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(W, H);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  overlay.appendChild(canvas);

  const tex = new THREE.CanvasTexture(snap);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;

  const uniforms: Record<string, THREE.IUniform> = {
    uTex: { value: tex },
    uProgress: { value: 0 },
    uHole: { value: new THREE.Vector2(holeX / W, 1 - holeY / H) }, // GL-flip Y
    uAspect: { value: W / H },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    depthTest: false,
    depthWrite: false,
  });

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  quad.frustumCulled = false;
  scene.add(quad);

  const draw = () => renderer.render(scene, camera);
  draw();

  const cleanup = () => {
    tex.dispose();
    material.dispose();
    quad.geometry.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };

  gsap.to(uniforms.uProgress, {
    value: 1,
    duration: 1.7,
    ease: 'power2.in',
    onUpdate: draw,
    onComplete: () => {
      // collapse to solid black, hold in the dark, then a slow dawn from black to
      // white — reload lands on the preloader's white field, so the count begins
      // straight out of the white with no flash.
      gsap
        .timeline({ onComplete: () => { cleanup(); gsap.delayedCall(0.15, reload); } })
        .to(veil, { opacity: 1, duration: 0.5, ease: 'power2.in' })
        .to({}, { duration: 0.3 })
        .to(veil, { backgroundColor: '#ffffff', duration: 0.95, ease: 'power1.inOut' })
        .to({}, { duration: 0.2 });
    },
  });
}
