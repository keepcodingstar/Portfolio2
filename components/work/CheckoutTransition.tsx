'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, type ComponentProps, type MouseEvent } from 'react';

let finishArrival: (() => void) | null = null;

export function CheckoutArrival() {
  useLayoutEffect(() => {
    const finish = finishArrival;
    if (!finish) return;
    const cover = document.querySelector<HTMLImageElement>('[data-checkout-hero]');
    const ready = cover ? cover.decode().catch(() => {}) : Promise.resolve();
    void ready.then(finish);
    return () => { finish(); };
  }, []);
  return null;
}

/** A progressive enhancement for checkout entry. Native links still handle
 * modified clicks, reduced motion, and browsers without View Transitions. */
export function CheckoutProjectLink(props: ComponentProps<typeof Link>) {
  const router = useRouter();

  function enter(event: MouseEvent<HTMLAnchorElement>) {
    props.onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      || !document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (finishArrival) return;
    event.preventDefault();

    const source = event.currentTarget.closest('[data-checkout-card]')?.querySelector<HTMLElement>('[data-checkout-cover]');
    if (source) source.style.viewTransitionName = 'checkout-cover';
    document.documentElement.dataset.checkoutTransition = 'true';
    let timer: ReturnType<typeof setTimeout>;
    const arrived = new Promise<void>((resolve) => { finishArrival = resolve; });
    const transition = document.startViewTransition(async () => {
      router.push('/work/checkout', { scroll: true });
      await arrived;
      window.scrollTo(0, 0);
    });
    // Never leave navigation frozen when a route loads slowly or fails.
    timer = setTimeout(() => { transition.skipTransition(); finishArrival?.(); finishArrival = null; }, 1800);
    void transition.finished.catch(() => {}).finally(() => {
      clearTimeout(timer);
      if (source) source.style.viewTransitionName = '';
      delete document.documentElement.dataset.checkoutTransition;
      finishArrival = null;
    });
  }

  return <Link {...props} onClick={enter} />;
}
