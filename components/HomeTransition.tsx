'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';

let cancelPending: (() => void) | undefined;

/** A light sky veil bridges the route change while Home positions and draws.
 * Unlike a native view-transition snapshot, it leaves animation frames running
 * so the WebGL canvas can produce the frame we're waiting to reveal. */
export function transitionToHome(navigate: () => void, animate = true) {
  cancelPending?.();
  if (!animate || !Element.prototype.animate
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navigate();
    return;
  }

  const root = document.documentElement;
  const cover = document.createElement('div');
  cover.className = 'home-transition-cover';
  cover.setAttribute('aria-hidden', 'true');
  let positioned = false;
  let cloudsReady = false;
  let navigated = false;
  let cancelled = false;
  let revealing = false;
  let timeout = 0;
  let exit: Animation | undefined;
  root.dataset.homeTransition = 'preparing';
  document.body.appendChild(cover);

  const entrance = cover.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 140, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'forwards',
  });
  const cleanup = () => {
    window.clearTimeout(timeout);
    window.removeEventListener('altitude:positioned', onPositioned);
    window.removeEventListener('clouds:ready', onCloudsReady);
    entrance.cancel();
    exit?.cancel();
    cover.remove();
    if (cancelPending === cancel) {
      cancelPending = undefined;
      delete root.dataset.homeTransition;
    }
  };
  const cancel = () => { cancelled = true; cleanup(); };
  const reveal = () => {
    if (cancelled || revealing) return;
    revealing = true;
    window.clearTimeout(timeout);
    cover.style.opacity = '1';
    entrance.cancel();
    root.dataset.homeTransition = 'revealing';
    exit = cover.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 280, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'forwards',
    });
    void exit.finished.then(cleanup).catch(() => {});
  };
  const check = () => { if (positioned && cloudsReady) reveal(); };
  const onPositioned = () => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('.altitude-content img'))
      .filter((image) => {
        const bounds = image.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < window.innerHeight;
      });
    void Promise.all(images.map((image) => image.decode().catch(() => {}))).then(() => {
      positioned = true;
      check();
    });
  };
  const onCloudsReady = () => { cloudsReady = true; check(); };
  window.addEventListener('altitude:positioned', onPositioned);
  window.addEventListener('clouds:ready', onCloudsReady);
  cancelPending = cancel;
  void entrance.finished.then(() => {
    if (cancelled || navigated) return;
    navigated = true;
    navigate();
    // Missing assets must never leave the page covered indefinitely.
    timeout = window.setTimeout(reveal, 1800);
  }).catch(() => {});
}

export default function HomeLink(props: ComponentProps<typeof Link>) {
  const router = useRouter();
  function enter(event: MouseEvent<HTMLAnchorElement>) {
    props.onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.detail === 0
      || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      || event.currentTarget.target && event.currentTarget.target !== '_self') return;
    const destination = new URL(event.currentTarget.href);
    if (destination.origin !== location.origin || destination.pathname !== '/' || location.pathname === '/') return;
    event.preventDefault();
    transitionToHome(() => router.push(destination.pathname + destination.search + destination.hash, { scroll: false }));
  }
  return <Link {...props} onClick={enter} />;
}
