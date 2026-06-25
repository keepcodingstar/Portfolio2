'use client';

import { useRef } from 'react';

/**
 * A glass card with a directional ion-teal edge glow that tracks the pointer:
 * the closer the cursor is to an edge, the brighter the glow, and a conic mask
 * (driven by --angle) reveals it only along the arc nearest the cursor. All
 * continuous values go straight to CSS custom properties — no React re-renders.
 */
export default function GlowCard({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = e.clientX - (r.left + r.width / 2);
    const cy = e.clientY - (r.top + r.height / 2);
    const dx = r.width / 2;
    const dy = r.height / 2;
    // edge proximity in [0,1]: 1 right at a border, ~0 dead centre
    const kx = dx === 0 ? 0 : Math.abs(cx) / dx;
    const ky = dy === 0 ? 0 : Math.abs(cy) / dy;
    const edge = Math.max(0, Math.min(1, Math.max(kx, ky)));
    let deg = (Math.atan2(cy, cx) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    el.style.setProperty('--edge', String(edge * 100));
    el.style.setProperty('--angle', `${deg}deg`);
  };

  const onLeave = () => {
    ref.current?.style.setProperty('--edge', '0');
  };

  return (
    <div
      ref={ref}
      className={`glow-card glass ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="glow-ring" aria-hidden />
      {children}
    </div>
  );
}
