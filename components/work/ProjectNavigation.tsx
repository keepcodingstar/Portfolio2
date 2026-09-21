'use client';

import { createContext, useContext, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { captureHomeHistoryEntry } from '@/components/AltitudeProvider';
import { transitionToHome } from '@/components/HomeTransition';

type ProjectOrigin = '/' | '/work';
const HISTORY_KEY = 'portfolioProjectOrigin';
const TRAIL_KEY = 'portfolioProjectTrail';
const WORK_POSITION_KEY = 'portfolioWorkPosition';
type ProjectTrail = { session: string; origin: ProjectOrigin; pathname: string; depth: number };
type WorkPosition = { session: string; x: number; y: number };
type ProjectNavigationValue = {
  href: ProjectOrigin;
  onBack: (event: MouseEvent<HTMLAnchorElement>) => void;
};
const ProjectOriginContext = createContext<ProjectNavigationValue>({ href: '/work', onBack: () => {} });

function isProjectOrigin(value: unknown): value is ProjectOrigin {
  return value === '/' || value === '/work';
}

function referrerOrigin(): ProjectOrigin {
  if (document.referrer) {
    const referrer = new URL(document.referrer);
    if (referrer.origin === window.location.origin && isProjectOrigin(referrer.pathname)) {
      return referrer.pathname;
    }
  }
  return '/work';
}

function readTrail(value: unknown, session: string | null, pathname: string): ProjectTrail | null {
  if (!value || typeof value !== 'object') return null;
  const trail = value as Partial<ProjectTrail>;
  return trail.session === session && trail.pathname === pathname && isProjectOrigin(trail.origin)
    && typeof trail.depth === 'number' && Number.isInteger(trail.depth) && trail.depth > 0
    ? trail as ProjectTrail : null;
}

function readWorkPosition(value: unknown): WorkPosition | null {
  if (!value || typeof value !== 'object') return null;
  const position = value as Partial<WorkPosition>;
  return typeof position.x === 'number' && Number.isFinite(position.x)
    && typeof position.y === 'number' && Number.isFinite(position.y)
    ? position as WorkPosition : null;
}

/** Keep the entry page across case studies, with a separate origin per history
 * entry so reloads and browser back/forward retain the correct destination. */
export default function ProjectNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);
  const origin = useRef<ProjectOrigin>('/work');
  const session = useRef<string | null>(null);
  const trail = useRef<ProjectTrail | null>(null);
  const pendingPop = useRef<{ pathname: string; trail: ProjectTrail | null; workPosition: WorkPosition | null } | null>(null);
  const [backHref, setBackHref] = useState<ProjectOrigin>('/work');

  function rememberEntry() {
    const currentPath = window.location.pathname;
    if (currentPath === '/work' && session.current) {
      window.history.replaceState({
        ...window.history.state,
        [WORK_POSITION_KEY]: { session: session.current, x: window.scrollX, y: window.scrollY },
      }, '');
    } else if (currentPath.startsWith('/work/') && previousPath.current === currentPath) {
      // Next can refresh its history fields after our mount. Repair them on
      // departure so Back/Forward retains this specific project's chain depth.
      window.history.replaceState({
        ...window.history.state,
        [HISTORY_KEY]: origin.current,
        [TRAIL_KEY]: trail.current,
      }, '');
    }
  }

  useLayoutEffect(() => {
    // A document token proves that this tab observed the listing entry. A
    // referrer, copied tab, or old history state alone cannot prove a safe jump.
    session.current ??= window.crypto.randomUUID();
    const onPopState = (event: PopStateEvent) => {
      const nextPath = window.location.pathname;
      captureHomeHistoryEntry(nextPath === '/' ? event.state?.portfolioHomeEntry : undefined);
      const savedTrail = readTrail(event.state?.[TRAIL_KEY], session.current, nextPath);
      pendingPop.current = {
        pathname: nextPath,
        trail: savedTrail,
        workPosition: nextPath === '/work' ? readWorkPosition(event.state?.[WORK_POSITION_KEY]) : null,
      };
      trail.current = savedTrail;
    };
    window.addEventListener('click', rememberEntry, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('click', rememberEntry, true);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useLayoutEffect(() => {
    if (pathname !== '/') captureHomeHistoryEntry(undefined);
    const traversal = pendingPop.current;
    pendingPop.current = null;
    let restoreFrame = 0;
    if (pathname.startsWith('/work/')) {
      const savedOrigin: unknown = window.history.state?.[HISTORY_KEY];
      if (isProjectOrigin(savedOrigin)) {
        origin.current = savedOrigin;
      } else if (isProjectOrigin(previousPath.current)) {
        origin.current = previousPath.current;
      } else if (!previousPath.current?.startsWith('/work/')) {
        // Also support links opened in another tab; direct visits use Work.
        origin.current = referrerOrigin();
      }

      if (traversal?.pathname === pathname) {
        // Back/Forward selects an existing entry, not another step in a chain.
        trail.current = traversal.trail;
      } else if (previousPath.current !== pathname) {
        if (isProjectOrigin(previousPath.current) && session.current) {
          trail.current = { session: session.current, origin: previousPath.current, pathname, depth: 1 };
        } else if (previousPath.current?.startsWith('/work/') && trail.current) {
          trail.current = { ...trail.current, pathname, depth: trail.current.depth + 1 };
        } else {
          trail.current = null;
        }
      }

      window.history.replaceState({
        ...window.history.state,
        [HISTORY_KEY]: origin.current,
        [TRAIL_KEY]: trail.current,
      }, '');
      setBackHref(origin.current);
    } else {
      trail.current = null;
      if (pathname === '/work' && traversal?.pathname === pathname && traversal.workPosition) {
        const position = traversal.workPosition;
        const restore = () => window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' });
        restore();
        restoreFrame = window.requestAnimationFrame(restore);
      }
    }
    previousPath.current = pathname;
    return () => window.cancelAnimationFrame(restoreFrame);
  }, [pathname]);

  function onBack(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      || event.currentTarget.target && event.currentTarget.target !== '_self') return;
    const currentTrail = trail.current;
    if (!currentTrail || currentTrail.pathname !== window.location.pathname
      || new URL(event.currentTarget.href).pathname !== currentTrail.origin) return;
    event.preventDefault();
    rememberEntry();
    const goBack = () => window.history.go(-currentTrail.depth);
    if (currentTrail.origin === '/') transitionToHome(goBack, event.detail !== 0);
    else goBack();
  }

  return <ProjectOriginContext.Provider value={{ href: backHref, onBack }}>{children}</ProjectOriginContext.Provider>;
}

export function useProjectOrigin() {
  return useContext(ProjectOriginContext).href;
}

export function useProjectBack() {
  return useContext(ProjectOriginContext).onBack;
}
