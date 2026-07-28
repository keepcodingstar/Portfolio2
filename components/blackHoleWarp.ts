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
 *
 * PRE-BAKED SOURCE: the visitor is always at the apex when the warp fires, so
 * the "before" view is essentially the same for every user. If a pre-baked JPG
 * exists at PREBAKED_SOURCE, we load it as the shader texture — instant, no DOM
 * capture cost. If the file is missing or its aspect ratio is wildly off from
 * the current viewport (mobile), we fall back to the live html-to-image capture.
 * Bake by taking a screenshot of the apex view (Space zone from the top, hazard
 * tape visible) and saving it to /public/warp/source.jpg (~1920×1080, q=80).
 * Bake with the BlackHoleLaser HIDDEN — the real hole is pinned on top of the
 * shader during the warp, so the source texture should be black-hole-less.
 */

const PREBAKED_SOURCE = '/warp/source.jpg';

/**
 * Warm the pre-baked warp source in the browser cache. Called from the apex on
 * mount so that by the time the visitor presses the barricade the image is
 * ready to hand off to the shader with zero fetch cost. Silent on 404 — the
 * runtime path falls back to html-to-image if the file isn't there.
 */
export function preloadWarpSource(): void {
  if (typeof window === 'undefined') return;
  const img = new window.Image();
  img.decoding = 'async';
  img.src = PREBAKED_SOURCE;
}

async function loadPrebaked(viewportAspect: number): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.decoding = 'async';
    img.onload = () => {
      const baked = img.naturalWidth / img.naturalHeight;
      // discard if the baked aspect is far from the current viewport — stretching
      // a 16:9 desktop bake across a portrait phone would read wrong.
      if (!baked || Math.abs(baked - viewportAspect) > 0.5) resolve(null);
      else resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = PREBAKED_SOURCE;
  });
}

/**
 * Speculative capture layer.
 *
 * When the apex zone comes fully into view, the visitor is *staring at* what
 * would become the warp source. Snapshot then, cache in module scope, and
 * runWarp uses it instantly on press — even without a pre-baked JPG.
 *
 * captureWarpSource() is idempotent: it returns the cached canvas if one exists,
 * awaits an in-flight capture if one is running, or starts a new one. The cache
 * is invalidated on window resize since dimensions in the snapshot no longer
 * match the viewport the shader is rendering into.
 */
let cachedSnap: HTMLCanvasElement | null = null;
let cachedFor: { w: number; h: number } | null = null;
let captureInFlight: Promise<HTMLCanvasElement | null> | null = null;

export async function captureWarpSource(): Promise<HTMLCanvasElement | null> {
  if (typeof window === 'undefined') return null;
  const W = window.innerWidth;
  const H = window.innerHeight;

  // cache hit — same viewport, snap is still valid
  if (cachedSnap && cachedFor && cachedFor.w === W && cachedFor.h === H) {
    return cachedSnap;
  }
  // in-flight capture — reuse the promise so overlapping callers get the same result
  if (captureInFlight) return captureInFlight;

  captureInFlight = (async () => {
    try {
      const { toCanvas } = await import('html-to-image');
      const c = await toCanvas(document.body, {
        width: W,
        height: H,
        pixelRatio: 1,
        skipFonts: true,
        backgroundColor: getComputedStyle(document.body).backgroundColor || '#05060a',
        filter: skipWarpElements,
      });
      cachedSnap = c;
      cachedFor = { w: W, h: H };
      return c;
    } catch {
      return null;
    } finally {
      captureInFlight = null;
    }
  })();

  return captureInFlight;
}

/**
 * html-to-image filter — drop elements that would double-up during the warp.
 *   - The veil (data-warp-veil) is the fade-out layer, shouldn't self-capture.
 *   - .bh-stage is the BlackHoleLaser wrapper; the real one gets pinned on top
 *     of the shader during warp, so the snapshot must not contain a copy.
 */
function skipWarpElements(node: Node): boolean {
  if (!(node instanceof HTMLElement)) return true;
  if (node.dataset?.warpVeil === '1') return false;
  if (node.classList?.contains('bh-stage')) return false;
  return true;
}

/** Drop the cached snapshot — call on viewport changes that invalidate it. */
export function invalidateWarpCache(): void {
  cachedSnap = null;
  cachedFor = null;
}

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

// The real BlackHoleLaser floats above this shader; there is NO growing black
// disk in the fragment output. The visual is content STREAKING radially toward
// the hole (spaghettification), with a gentle swirl and chromatic fringing —
// the extending stretch reads as material being drawn into the hole on top.
void main() {
  vec2 uv = vUv;

  // aspect-corrected vector from the hole, so the swirl + stretch stay circular
  vec2 d = uv - uHole;
  d.x *= uAspect;
  float r   = length(d);
  float ang = atan(d.y, d.x);

  float p = uProgress;

  // gentle swirl — reduced from 3.4 so the radial stretch reads over the twist
  ang += p * 1.8 * exp(-r * 3.0);

  // radial in-fall — sample from further out so content streams toward the hole,
  // then an extra late-stage collapse yanks everything in at the end
  float pull = p * 0.72 / (r + 0.16);
  float sr   = r * (1.0 + pull);
  sr = mix(sr, sr * (1.0 + p * 1.7), smoothstep(0.55, 1.0, p));

  vec2 pullDir = vec2(cos(ang), sin(ang));

  // Radial motion blur: sample along the pull direction, near→far. Each step
  // pushes the sample a fraction further toward the origin, so the near-hole
  // streak reads as the current UV smeared into the hole. Weighted so the base
  // sample dominates while later steps fade — the extending stretch.
  const int SAMPLES = 6;
  vec3 col = vec3(0.0);
  float total = 0.0;
  vec2 chromaDir = normalize(uv - uHole + 1e-5);
  float ca = p * 0.014 * (0.4 + r);
  for (int i = 0; i < SAMPLES; i++) {
    float t   = float(i) / float(SAMPLES - 1);
    float ext = 1.0 + t * p * 0.55;      // each sample stretches a bit further
    vec2  sd  = pullDir * (sr * ext);
    sd.x /= uAspect;
    vec2 suv = uHole + sd;

    float cr = texture2D(uTex, suv + chromaDir * ca).r;
    float cg = texture2D(uTex, suv).g;
    float cb = texture2D(uTex, suv - chromaDir * ca).b;

    float w = 1.0 - t * 0.55;             // near samples dominate
    col += vec3(cr, cg, cb) * w;
    total += w;
  }
  col /= total;

  // anything pulled past the texture edge reads as empty space
  vec2 edgeSd = pullDir * sr;
  edgeSd.x /= uAspect;
  vec2 edgeSuv = uHole + edgeSd;
  if (edgeSuv.x < 0.0 || edgeSuv.x > 1.0 || edgeSuv.y < 0.0 || edgeSuv.y > 1.0) {
    col = vec3(0.0);
  }

  // dim the whole frame as it finishes folding into the hole
  col *= (1.0 - smoothstep(0.72, 1.0, p));

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

  const reload = () => window.location.reload();

  const fadeAndReload = (duration: number) =>
    gsap
      .timeline({ onComplete: reload })
      .to(veil, { opacity: 1, duration, ease: 'power2.in' })
      .to({}, { duration: 0.25 });

  if (reduce) {
    fadeAndReload(0.45);
    return;
  }

  // Fallback ladder for the shader's source texture, fastest to slowest:
  //   1. pre-baked JPG at /warp/source.jpg (if it's been baked & preloaded)
  //   2. cached speculative snapshot captured when the apex came into view
  //   3. live html-to-image capture — the original path, ~500-1500ms wallclock
  let source: HTMLImageElement | HTMLCanvasElement | null = await loadPrebaked(W / H);
  if (!source) source = await captureWarpSource();

  if (!source) {
    // capture failed (some browsers/CSS) — still give a clean fade-out
    fadeAndReload(0.5);
    return;
  }

  // Pin the actual BlackHoleLaser on top of the shader so the effect reads as
  // content being drawn INTO the hole (rather than a shader-drawn black disk
  // eating the frame). z-index stack:
  //   veil (2147483647)  ← final black + white flash to reload
  //   bh-stage pinned    (2147483646)  ← the real hole graphic, crisp on top
  //   shader overlay     (2147483645)  ← the warping snapshot, behind
  const bhStage = document.querySelector<HTMLElement>('.bh-stage');
  if (bhStage) {
    bhStage.style.position = 'fixed';
    bhStage.style.zIndex = '2147483646';
    bhStage.style.pointerEvents = 'none';
  }

  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:2147483645;pointer-events:none';
  html.appendChild(overlay);

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(W, H);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  overlay.appendChild(canvas);

  // one code path for both texture kinds: HTMLImageElement (pre-baked JPG) and
  // HTMLCanvasElement (live html-to-image capture). needsUpdate flags the first
  // upload for the image case; CanvasTexture would set this automatically, but
  // the base Texture used here needs the hint explicitly.
  const tex = new THREE.Texture(source);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;

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
    ease: 'power3.in',
    onUpdate: draw,
    onComplete: () => {
      // collapse to solid black, brief hold, then a quick dawn from black to
      // white — reload lands on the preloader's white field, so the count begins
      // straight out of the white with no flash.
      gsap
        .timeline({ onComplete: () => { cleanup(); reload(); } })
        .to(veil, { opacity: 1, duration: 0.28, ease: 'power2.in' })
        .to({}, { duration: 0.12 })
        .to(veil, { backgroundColor: '#ffffff', duration: 0.4, ease: 'power1.inOut' })
        .to({}, { duration: 0.08 });
    },
  });
}
