'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, type ComponentProps, type MouseEvent } from 'react';

type Arrival = { pathname: string; finish: () => void; cancel: () => void; cancelled: boolean };
let pendingArrival: Arrival | null = null;

export function CaseStudyArrival() {
  useLayoutEffect(() => {
    const arrival = pendingArrival;
    if (!arrival || arrival.pathname !== window.location.pathname) return;
    let mounted = true;
    const cover = document.querySelector<HTMLImageElement>('[data-case-study-hero], [data-checkout-hero]');
    const ready = cover ? cover.decode().catch(() => {}) : Promise.resolve();
    void ready.then(() => { if (mounted && !arrival.cancelled) arrival.finish(); });
    // React replays layout effects in development. Cleanup only invalidates
    // this decode callback; cancelling here skips the shared-image transition.
    return () => { mounted = false; };
  }, []);
  return null;
}

export const CheckoutArrival = CaseStudyArrival;

/** Native links handle keyboard activation, modified clicks, reduced motion,
 * and browsers without View Transitions. */
export function CaseStudyProjectLink(props: ComponentProps<typeof Link>) {
  const router = useRouter();

  function enter(event: MouseEvent<HTMLAnchorElement>) {
    props.onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      || event.currentTarget.target && event.currentTarget.target !== '_self') return;

    // A second click must never inherit a previous transition's delayed scroll.
    pendingArrival?.cancel();
    if (event.detail === 0 || !document.startViewTransition
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const destination = new URL(event.currentTarget.href);
    if (destination.origin !== window.location.origin
      || !['/work/checkout', '/work/amodira', '/work/econic'].includes(destination.pathname)) return;
    const source = event.currentTarget.closest('[data-case-study-card], [data-checkout-card]')
      ?.querySelector<HTMLElement>('[data-case-study-cover], [data-checkout-cover]');
    if (!source) return;
    event.preventDefault();

    source.style.viewTransitionName = 'checkout-cover';
    document.documentElement.dataset.checkoutTransition = 'true';
    let resolveArrival: () => void = () => {};
    const arrived = new Promise<void>((resolve) => { resolveArrival = resolve; });
    const arrival: Arrival = {
      pathname: destination.pathname,
      finish: resolveArrival,
      cancelled: false,
      cancel: () => {
        arrival.cancelled = true;
        transition.skipTransition();
        resolveArrival();
        cleanup();
      },
    };
    pendingArrival = arrival;
    let navigated = false;
    const navigate = () => {
      if (navigated) return;
      navigated = true;
      router.push(destination.pathname + destination.search + destination.hash, { scroll: true });
    };
    const transition = document.startViewTransition(async () => {
      if (arrival.cancelled) return;
      navigate();
      await arrived;
      // The watchdog covers loading, not the visible image animation.
      window.clearTimeout(timer);
      if (!arrival.cancelled && window.location.pathname === arrival.pathname && !destination.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
    const timer = window.setTimeout(() => {
      navigate();
      arrival.cancel();
    }, 1800);
    let cleaned = false;
    function cleanup() {
      if (cleaned) return;
      cleaned = true;
      window.clearTimeout(timer);
      source!.style.viewTransitionName = '';
      if (pendingArrival === arrival) {
        delete document.documentElement.dataset.checkoutTransition;
        pendingArrival = null;
      }
    }
    // Skipping deliberately rejects ready, even when finished resolves.
    void transition.ready.catch(() => {});
    void transition.finished.catch(() => {}).finally(cleanup);
  }

  return <Link {...props} onClick={enter} />;
}

export const CheckoutProjectLink = CaseStudyProjectLink;
