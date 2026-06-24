'use client';

import { useEffect } from 'react';

/**
 * The root layout's <body> starts at `opacity: 0` (globals.css) and is only
 * revealed when `altitude-ready` is added — a class the homepage's
 * AltitudeProvider sets after it anchors the scroll. Standalone routes that
 * don't mount that provider would otherwise stay invisible, so they render
 * this to reveal the body on their own.
 */
export default function RevealBody() {
  useEffect(() => {
    document.body.classList.add('altitude-ready');
  }, []);
  return null;
}
