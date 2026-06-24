'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import * as THREE from 'three';

/**
 * BlackHoleLaser — the LaserFlow light, bent into a ring around a dark circle.
 *
 * Reuses LaserFlow's shader machinery (sRGB tone `g`, hash `h21`, value noise,
 * `fbm2`) but works in POLAR space: the glow lives in a band at a fixed radius,
 * so the beam's flowing wisps travel *around* the circle instead of up a line.
 * Inside that band sits a crisp black event horizon; a hot white photon ring
 * hugs its edge. The result reads as an accretion disk of laser-light wrapped
 * around a black hole. Adapts pixel ratio to hold framerate; pauses off-screen.
 */

const VERT = `
precision highp float;
attribute vec3 position;
void main(){ gl_Position = vec4(position, 1.0); }
`;

const FRAG = `
precision highp float;
precision highp int;

uniform float iTime;
uniform vec3  iResolution;
uniform vec3  uColor;
uniform float uFade;
uniform float uFlowTime;
uniform float uFogTime;
uniform float uRingRadius;     // ring radius, fraction of screen height
uniform float uThickness;      // ring band thickness
uniform float uWispIntensity;  // overall brightness of the light
uniform float uFlowSpeed;      // how fast the wisps travel around the ring
uniform float uFogIntensity;   // soft glow/haze around the ring

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define FOG_OCTAVES 5

// --- LaserFlow building blocks (reused) ---
float g(float x){ return x<=0.00031308 ? 12.92*x : 1.055*pow(x,1.0/2.4)-0.055; }
float h21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+34.123); return fract(p.x*p.y); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d=h21(i+vec2(1,1));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm2(vec2 p){
  float v=0.0,amp=0.6; mat2 m=mat2(0.86,0.5,-0.5,0.86);
  for(int i=0;i<FOG_OCTAVES;++i){ v+=amp*vnoise(p); p=m*p*2.03+17.1; amp*=0.52; }
  return v;
}

// World-space geometry (units of the Schwarzschild radius).
#define RS       1.0     // event horizon / photon capture radius
#define DISK_IN  2.6     // accretion-disk inner edge
#define DISK_OUT 9.0     // accretion-disk outer edge
#define STEPS    180     // ray-integration steps

// Emission of the accretion disk at a world-space hit point on the y=0 plane.
// White-hot inner edge -> laser-color mid -> dark-red rim, dragged into
// tangential streaks, with relativistic Doppler beaming toward the camera.
vec3 diskColor(vec3 hit, vec3 ro, float flow){
  float rr  = length(hit.xz);
  float t   = clamp((rr - DISK_IN)/(DISK_OUT - DISK_IN), 0.0, 1.0); // 0 inner..1 outer
  float ang = atan(hit.z, hit.x);

  // tangential streaks: high angular frequency, low radial -> stretched wisps
  float a   = ang/TWO_PI;
  // long tangential filaments: lower angular freq than before (smoother, less
  // dotty) but keep the contrast that made the disk read brightly.
  float n1  = fbm2(vec2(a*18.0 - flow,       rr*0.9 + flow*0.2));
  float n2  = fbm2(vec2(a*40.0 + 5.0 - flow*0.7, rr*0.6));
  float fil = pow(max(n1,0.0),2.0)*1.0 + pow(max(n2,0.0),2.8)*0.55;

  float heat = pow(1.0 - t, 2.0);                               // hottest inside
  float edge = smoothstep(0.0, 0.08, t) * (1.0 - smoothstep(0.74, 1.0, t));
  float bright = edge * (0.07 + 1.3*fil) * (0.4 + 2.3*heat);

  vec3 hot  = vec3(1.30, 1.18, 1.02);
  vec3 mid  = uColor;
  vec3 cool = uColor * vec3(0.55, 0.22, 0.10);
  vec3 col  = mix(hot, mid,  smoothstep(0.0, 0.28, t));
  col       = mix(col, cool, smoothstep(0.42, 1.0, t));

  // relativistic Doppler beaming — orbital velocity tangential to the ring,
  // faster toward the inner edge; the approaching side brightens and blue-shifts.
  vec3  vdir  = normalize(vec3(-hit.z, 0.0, hit.x));
  vec3  toCam = normalize(ro - hit);
  float beta  = 0.46 * sqrt(DISK_IN/max(rr, DISK_IN));
  float mu    = dot(vdir, toCam);
  col *= pow(1.0/(1.0 - beta*mu), 3.2);
  col += col * vec3(0.08,0.14,0.30) * max(mu, 0.0);   // blue-shift approaching side

  return col * bright;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - 0.5*iResolution.xy)/iResolution.y;

  float flow = uFlowTime * uFlowSpeed;

  // camera: near edge-on, looking at the hole (smaller elev = more edge-on)
  float elev = 0.22;
  float D    = 23.0;
  vec3 ro  = vec3(0.0, sin(elev)*D, -cos(elev)*D);
  vec3 fwd = normalize(-ro);
  vec3 rgt = normalize(cross(fwd, vec3(0.0,1.0,0.0)));
  vec3 up  = cross(rgt, fwd);
  vec3 rd  = normalize(fwd*2.7 + uv.x*rgt + uv.y*up);

  // integrate a light ray, bending it around the hole (GR geodesic term).
  vec3 pos = ro;
  vec3 dir = rd;
  vec3 hvec = cross(pos, dir);
  float h2 = dot(hvec, hvec);          // conserved angular momentum
  float dt = 0.185;

  vec3 disk = vec3(0.0);
  float captured = 0.0;

  for(int i=0;i<STEPS;++i){
    float r2  = dot(pos, pos);
    vec3  acc = -1.5 * h2 * pos / pow(r2, 2.5);   // light-bending acceleration
    vec3  prev = pos;
    dir += acc*dt;
    pos += dir*dt;

    float r = length(pos);
    if(r < RS){ captured = 1.0; break; }          // swallowed by the hole

    // disk-plane crossing -> emissive gas (multiple crossings = lensed arcs)
    if(prev.y*pos.y < 0.0){
      float f   = prev.y/(prev.y - pos.y);
      vec3  hit = mix(prev, pos, f);
      float rr  = length(hit.xz);
      if(rr > DISK_IN && rr < DISK_OUT) disk += diskColor(hit, ro, flow);
    }

    if(r > 30.0 && dot(pos, dir) > 0.0) break;     // escaped to infinity
  }

  vec3 col = disk;

  col *= uWispIntensity * 0.105;
  col  = vec3(g(col.r), g(col.g), g(col.b));
  col *= uFade;

  // alpha = luminous coverage: black space stays transparent (stars show
  // through, no opaque box), the disk + its falloff glow composites over the
  // page. uFogIntensity now widens that glow's reach into the surrounding space.
  float lum = max(col.r, max(col.g, col.b));
  float a   = clamp(lum * (0.85 + 0.6 * uFogIntensity), 0.0, 1.0);
  gl_FragColor = vec4(col, a);
}
`;

export interface BlackHoleLaserProps {
  className?: string;
  style?: CSSProperties;
  dpr?: number;
  /** Ring (accretion disk) color — the laser hue. */
  color?: string;
  /** Ring radius as a fraction of screen height. */
  ringRadius?: number;
  /** Thickness of the glowing band. */
  thickness?: number;
  /** Overall brightness of the light. */
  wispIntensity?: number;
  /** How fast the wisps travel around the ring. */
  flowSpeed?: number;
  /** Soft glow/haze around the ring. */
  fogIntensity?: number;
}

const hexToVec3 = (hex: string): [number, number, number] => {
  let c = hex.trim();
  if (c[0] === '#') c = c.slice(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const n = parseInt(c, 16) || 0xffffff;
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export const BlackHoleLaser = ({
  className,
  style,
  dpr,
  color = '#ff7a1a',
  ringRadius = 0.26,
  thickness = 0.05,
  wispIntensity = 5.0,
  flowSpeed = 1.0,
  fogIntensity = 1.0,
}: BlackHoleLaserProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);
  const currentDprRef = useRef(1);
  const baseDprRef = useRef(1);
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,                 // composite over the starfield — no black box
      premultipliedAlpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    baseDprRef.current = Math.min(dpr ?? (window.devicePixelRatio || 1), 2);
    currentDprRef.current = baseDprRef.current;
    renderer.setPixelRatio(currentDprRef.current);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));

    const [cr, cg, cb] = hexToVec3(color);
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      uColor: { value: new THREE.Vector3(cr, cg, cb) },
      uFade: { value: 1 },
      uFlowTime: { value: 0 },
      uFogTime: { value: 0 },
      uRingRadius: { value: ringRadius },
      uThickness: { value: thickness },
      uWispIntensity: { value: wispIntensity },
      uFlowSpeed: { value: flowSpeed },
      uFogIntensity: { value: fogIntensity },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.RawShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const setSize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      const pr = currentDprRef.current;
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(w * pr, h * pr, pr);
    };
    setSize();
    renderer.render(scene, camera); // guarantee a first painted frame immediately

    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(setSize);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    const io = new IntersectionObserver(
      e => { inViewRef.current = e[0]?.isIntersecting ?? true; },
      { threshold: 0 }
    );
    io.observe(mount);

    const onVis = () => { pausedRef.current = document.hidden; };
    document.addEventListener('visibilitychange', onVis, { passive: true });

    const clock = new THREE.Clock();
    let frameMs: number[] = [];
    let lastCheck = performance.now();
    let lastChange = 0;
    let fade = 1;
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (pausedRef.current || !inViewRef.current) return;

      const dt = clock.getDelta();
      uniforms.iTime.value = clock.elapsedTime;

      const cdt = Math.min(0.033, Math.max(0.001, dt));
      if (!reduceMotion) {
        uniforms.uFlowTime.value += cdt;
        uniforms.uFogTime.value += cdt;
      }
      fade = Math.min(1, fade + cdt / 1.0);
      uniforms.uFade.value = fade;

      renderer.render(scene, camera);

      frameMs.push(dt * 1000);
      const now = performance.now();
      if (now - lastCheck > 800 && frameMs.length > 0) {
        const avg = frameMs.reduce((a, b) => a + b, 0) / frameMs.length;
        const fps = 1000 / Math.max(1, avg);
        const cur = currentDprRef.current;
        const base = baseDprRef.current;
        let next = cur;
        if (fps < 50) next = Math.max(0.6, cur * 0.85);
        else if (fps > 58 && cur < base) next = Math.min(base, cur * 1.1);
        if (Math.abs(next - cur) > 0.01 && now - lastChange > 2000) {
          currentDprRef.current = next;
          lastChange = now;
          setSize();
        }
        frameMs = [];
        lastCheck = now;
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (mount.contains(canvas)) mount.removeChild(canvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpr]);

  useEffect(() => {
    const u = uniformsRef.current;
    if (!u) return;
    const [cr, cg, cb] = hexToVec3(color);
    (u.uColor.value as THREE.Vector3).set(cr, cg, cb);
    u.uRingRadius.value = ringRadius;
    u.uThickness.value = thickness;
    u.uWispIntensity.value = wispIntensity;
    u.uFlowSpeed.value = flowSpeed;
    u.uFogIntensity.value = fogIntensity;
  }, [color, ringRadius, thickness, wispIntensity, flowSpeed, fogIntensity]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: '100%', height: '100%', position: 'relative', ...style }}
    />
  );
};

export default BlackHoleLaser;
