'use client';

import { useReveal } from '@/components/work/useReveal';

/**
 * Mounts the shared [data-reveal] IntersectionObserver for the home page's
 * server-rendered zones (galleries, about). Renders nothing. The hidden
 * pre-reveal state is gated on `body.altitude-ready` in CSS, so without JS the
 * content is fully visible — the reveal only ever enhances an already-visible
 * default, and reduced motion reveals everything immediately (handled in useReveal).
 */
export default function Reveals() {
  useReveal();
  return null;
}
