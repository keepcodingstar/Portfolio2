'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Clouds, Cloud } from '@react-three/drei';

/**
 * The hero's clouds. They belong to the PAGE, not the preloader.
 *
 * The intro (<Preloader/>) is just the counting number over a faint haze; these
 * clouds are VISIBLE behind it the whole count, a soft full cover. The moment the
 * count lands the intro fires `preloader:done`; this layer catches that and
 * SCATTERS: the full cloud cover bursts apart — sliding left and right (the
 * centre opens first, the edges last) — and settles into the resting bank,
 * clearing the centre so the hero photo + headline read. Then it STAYS; nothing
 * unmounts. On scroll the whole bank parallaxes off, so it reads as a hero
 * feature, not a fixed overlay.
 *
 * The render window (canvas) is fixed to the viewport, but the cloud *world*
 * inside it is anchored to the document by scroll: a parallax value `p` runs 0
 * at the sky (where you land) → 1 at the work zone, negative as you rise into
 * space. The whole bank translates with `p`. Opacity rides the --sky-o envelope
 * (faint in space, gone by the ground). Reduced motion = appear instantly, no
 * shift, no idle drift.
 */

// the cloud world scrolls 1:1 with the page (same speed as the hero bg, no
// parallax lag). VIEW_WORLD_H is the world height the camera sees at the cloud
// plane (z≈0): 2 · camZ · tan(fov/2) with camZ=14, fov=56°. Dividing by the
// viewport height in px converts a scroll delta straight into a world shift.
const VIEW_WORLD_H = 2 * 14 * Math.tan((56 * Math.PI) / 180 / 2);

// Two bands. The FLOOR (top:false) sits beneath the subject and SETTLES DOWN on
// the part. The UPPER band (top:true) sits high and PARTS SIDEWAYS only (left/
// right, never down). Centre stays clear so the subject + headline read. Cool-
// grey tints; [x,y,z] world units, 0 ≈ sky altitude.
// QUANTITY trimmed for perf (was 7): volumetric clouds are fill-rate bound, so
// each overlapping translucent cloud is real overdraw cost every frame. Kept a
// left/centre/right FLOOR + the two parting side wisps — same positions, fewer
// of them. Drop more here first if it's still heavy.
const BANK = [
  // cloud FLOOR — low across the bottom (frames the subject, doesn't bury it);
  // these settle straight DOWN
  { seed: 11, pos: [-8.0, -6.9, -0.4], scale: 1.02, color: '#bccbe2', op: 0.46, top: false },
  { seed: 9, pos: [0.8, -7.7, 0.2], scale: 1.34, color: '#cdd9ea', op: 0.48, top: false },
  { seed: 6, pos: [8.6, -6.8, -1.3], scale: 0.92, color: '#b6c6de', op: 0.44, top: false },
  // UPPER band — high in the frame; these only slide LEFT/RIGHT to the edges
  { seed: 14, pos: [-8.2, 3.2, -1.2], scale: 1.18, color: '#c8d5e8', op: 0.42, top: true },
  { seed: 17, pos: [8.2, 3.0, -1.5], scale: 1.18, color: '#c8d5e8', op: 0.42, top: true },
] as const;

// Edge clouds for the PROJECTS (work) zone — a couple hugging each side, anchored
// to #zone-work so they ride into view as you scroll the case studies. They skip
// the hero curtain entirely (always at rest); their y is offset to the work zone
// at runtime. Soft + low-opacity so the case text stays readable. [x,y,z], y is
// relative to the work-zone centre.
// Pushed out to the viewport margins (|x| ~13) and shrunk so they only peek in
// at the corners — they FRAME the case rows, never cover the titles or the
// right-aligned metric readout. [x,y,z], y relative to the work-zone centre.
// QUANTITY trimmed for perf (was 4): one wisp per side, same positions.
const WORK_EDGE = [
  { seed: 31, pos: [-13.2, 3.6, -1.8], scale: 0.5, color: '#eef4fc', op: 0.4 },
  { seed: 37, pos: [13.4, 3.0, -1.9], scale: 0.5, color: '#eef4fc', op: 0.4 },
] as const;

// curtain timing/shape. The clouds START already covering the screen (bunched
// toward the centre, lifted over the subject, pulled near the camera so they're
// big); on the signal each slides OUT to its resting place — a left/right part.
const CLOUD_SCALE = 1.5; // global size multiplier on every cloud (1 = original)
const SIDE_SPREAD = 1.2; // push resting clouds outward to the sides (×rest x, 1 = none)
const SETTLE_DUR = 1.6; // seconds — one cloud's slide from cover → rest
const STAGGER_SPAN = 0.5; // seconds — centre clouds part first, the edges last
const COVER_X = 0.15; // start x = rest x × this — bunched near centre to cover
const COVER_LIFT = 7.0; // floor clouds start THIS far ABOVE rest — enough to cover
//                         the centre at the start, then settle straight DOWN to the
//                         low floor (upper clouds get no lift; see coverOffset)
const COVER_NEAR = 4.0; // start z nudge toward camera (bigger ⇒ fuller cover)

// the widest resting cloud — used to normalise the centre-out stagger.
const MAX_ABS_X = Math.max(...BANK.map((c) => Math.abs(c.pos[0])));

const clamp01 = (p: number) => (p < 0 ? 0 : p > 1 ? 1 : p);
// smooth on BOTH ends — the "amazing smooth" feel for the curtain parting
const easeInOutCubic = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

// the COVER offset for a cloud resting at x=rx: how far it sits from rest while
// covering the screen. The big horizontal term slides it left/right on the part.
// FLOOR clouds also start +COVER_LIFT above rest (so they settle straight DOWN);
// UPPER (top) clouds get NO lift — they move left/right only, never down.
const coverOffset = (rx: number, top: boolean) =>
  [rx * COVER_X - rx, top ? 0 : COVER_LIFT, COVER_NEAR] as const;

function Sky({ animate, entered }: { animate: boolean; entered: boolean }) {
  const group = useRef<THREE.Group>(null);
  // one ref per cloud — the curtain animates each cloud's local position from a
  // gathered "cover the centre" pose out to its resting place at the sides/bottom.
  const cloudRefs = useRef<(THREE.Group | null)[]>([]);
  // edge clouds for the work/projects zone live in their OWN group (own <Clouds>),
  // so the hero bank's instanced mesh stays near origin and isn't frustum-culled
  // when the whole bank scrolls up. We just translate this group to the work zone.
  const workGroup = useRef<THREE.Group>(null);
  // scroll anchors, measured from the DOM (in px). The span runs sky→WORK (not
  // sky→ground): the clouds belong to the hero, so they finish sweeping off by
  // the time the work zone is centred — work/about/footer below stay clear.
  const anchor = useRef({ skyMid: 0, workOffsetY: 0 });
  const pRef = useRef(0); // scroll-driven world-y target for the bank (1:1 with page)
  const introStart = useRef<number | null>(null);
  // fires once the canvas has actually painted its first cloud frame, so the
  // pre-paint cover (html.pl-cover) can dissolve out AS the clouds materialise —
  // gating on real paint stops the cover lifting to reveal already-formed clouds.
  const announcedReady = useRef(false);

  useEffect(() => {
    const measure = () => {
      const sky = document.getElementById('zone-sky');
      const work = document.getElementById('zone-work');
      const skyMid = sky ? sky.offsetTop + sky.offsetHeight / 2 : 0;
      anchor.current.skyMid = skyMid;
      // local-y that lands the work clouds at screen centre when #zone-work is
      // centred (cancels the group's 1:1 scroll at that moment)
      const workMid = work ? work.offsetTop + work.offsetHeight / 2 : skyMid + window.innerHeight * 2;
      anchor.current.workOffsetY = -(workMid - skyMid) * (VIEW_WORLD_H / window.innerHeight);
    };
    const onScroll = () => {
      const eye = window.scrollY + window.innerHeight / 2;
      // 1:1 with the page: px offset from the sky mid → world units (same as bg)
      pRef.current = (eye - anchor.current.skyMid) * (VIEW_WORLD_H / window.innerHeight);
    };
    const onResize = () => { measure(); onScroll(); };
    measure();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    if (!announcedReady.current) {
      announcedReady.current = true;
      window.dispatchEvent(new Event('clouds:ready'));
    }

    // The GROUP scrolls 1:1 with the page (no smoothing ⇒ no lag, locked to the
    // bg). The per-cloud CURTAIN (cover → part) layers on each cloud's local pos.
    g.position.y = pRef.current;
    g.position.x = animate ? Math.sin(state.clock.elapsedTime / 16) * 0.5 : 0;

    // curtain: until `entered` fires every cloud sits in the COVER pose (full
    // screen); once it does, each slides OUT to rest — centre clouds first, edges
    // last — so the cover parts left/right. Reduced motion / !animate skips to rest.
    const t = state.clock.getElapsedTime();
    if (entered && animate && introStart.current === null) introStart.current = t;

    for (let i = 0; i < BANK.length; i++) {
      const node = cloudRefs.current[i];
      if (!node) continue;
      const rawX = BANK[i].pos[0];
      const rx = rawX * SIDE_SPREAD; // resting x, pushed out to the sides
      const ry = BANK[i].pos[1];
      const rz = BANK[i].pos[2];

      let e = 1; // 1 = at rest
      if (!animate) {
        e = 1;
      } else if (!entered || introStart.current === null) {
        e = 0; // covering the screen
      } else {
        // centre-out: clouds nearer the middle (small |rawX|) start parting first
        const delay = STAGGER_SPAN * (Math.abs(rawX) / MAX_ABS_X);
        e = easeInOutCubic(clamp01((t - introStart.current - delay) / SETTLE_DUR));
      }

      const [ox, oy, oz] = coverOffset(rx, BANK[i].top);
      const k = 1 - e; // fraction of the cover offset still applied
      node.position.set(rx + ox * k, ry + oy * k, rz + oz * k);
    }

    // work/projects edge clouds — no curtain; translate their whole group so it
    // sits over #zone-work and scrolls 1:1 (own group ⇒ correct frustum culling).
    if (workGroup.current) workGroup.current.position.y = pRef.current + anchor.current.workOffsetY;
  });

  return (
    <>
      {/* a soft warm-white key (sunlight) lifts the crowns; a cool sky-blue
          fill shades the bellies — natural daylight cloud, no purple cast */}
      <ambientLight intensity={1.25} />
      <spotLight position={[10, 18, 14]} color="#fff4e8" decay={0} distance={120} penumbra={1} intensity={42} />
      <spotLight position={[-16, -8, 10]} color="#a9c8f0" angle={0.4} decay={0} penumbra={1} intensity={18} />

      <group ref={group}>
        {/* self-hosted texture: drei's <Clouds> defaults to a third-party CDN
            (rawcdn.githack.com); a failed fetch there throws in three.js and takes
            the whole canvas (and the page) down to black. Serve it from /public so
            the hero never depends on an external asset. */}
        <Clouds texture="/hero/cloud.png" material={THREE.MeshLambertMaterial} limit={400} range={400}>
          {BANK.map((c, i) => (
            <Cloud
              key={c.seed}
              ref={(el: THREE.Group | null) => {
                cloudRefs.current[i] = el;
              }}
              seed={c.seed}
              position={[c.pos[0] * SIDE_SPREAD, c.pos[1], c.pos[2]]}
              scale={c.scale * CLOUD_SCALE}
              /* contained clusters — translucent so the headline + subject read
                 through the bank. segments kept low: this canvas renders every
                 frame (frameloop always), so each segment is a recurring cost. */
              segments={16}
              bounds={[3.6, 1.8, 1.5]}
              volume={4}
              color={c.color}
              opacity={c.op}
              growth={4}
              speed={animate ? 0.1 : 0}
            />
          ))}
        </Clouds>
      </group>

      {/* PROJECTS/WORK edge clouds — separate group + <Clouds> so this instanced
          mesh stays near its own origin and culls correctly as it scrolls in. */}
      <group ref={workGroup}>
        <Clouds texture="/hero/cloud.png" material={THREE.MeshLambertMaterial} limit={120} range={120}>
          {WORK_EDGE.map((c) => (
            <Cloud
              key={c.seed}
              seed={c.seed}
              position={[c.pos[0], c.pos[1], c.pos[2]]}
              scale={c.scale * CLOUD_SCALE}
              segments={14}
              bounds={[3.2, 1.8, 1.5]}
              volume={4}
              color={c.color}
              opacity={c.op}
              growth={4}
              speed={animate ? 0.08 : 0}
            />
          ))}
        </Clouds>
      </group>
    </>
  );
}

export default function CloudField({ className }: { className?: string }) {
  const [animate, setAnimate] = useState(true);
  // clouds are VISIBLE during the countdown — a soft full cover behind the
  // counting number. `visible` wells them up; `entered` only fires the SCATTER:
  // the cover bursts apart and settles into the resting bank when the preloader
  // clears — or immediately on reduced motion / a remount.
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setAnimate(!reduced);

    // well the cover up into view for the count (a tick after mount so the first
    // painted frame is already in the cover pose — no reposition jitter)
    const show = window.setTimeout(() => setVisible(true), reduced ? 0 : 60);

    // if the intro is already gone (reduced motion, or a remount), scatter now
    if (reduced || !document.body.classList.contains('preloading')) {
      setVisible(true);
      setEntered(true);
      return () => clearTimeout(show);
    }

    const enter = () => setEntered(true);
    window.addEventListener('preloader:done', enter);
    // safety net — never leave the clouds covering if the event is missed
    const fallback = window.setTimeout(enter, 7000);
    return () => {
      clearTimeout(show);
      window.removeEventListener('preloader:done', enter);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className={className} aria-hidden>
      {/* The cloud layer wells up (`visible`) in its COVER pose to back the
          counting number, then SCATTERS to the resting bank on `entered`. The
          first painted frame is already the cover pose, so fading in is clean —
          no "reposition, then animate" jitter. Reduced motion: no fade, appears
          at rest. The outer .cloudfield still carries the --sky-o envelope. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: visible ? 1 : 0,
          transition: animate ? 'opacity 0.8s ease' : 'none',
        }}
      >
        <Canvas
          frameloop="always"
          /* lower DPR cap + no MSAA: soft volumetric clouds hide aliasing, so
             this roughly halves fragment work on retina with no visible loss.
             Capped at 1.25 (was 1.5) — the cloud is soft enough that the extra
             retina samples are pure cost. */
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 14], fov: 56 }}
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <Sky animate={animate} entered={entered} />
        </Canvas>
      </div>
    </div>
  );
}
