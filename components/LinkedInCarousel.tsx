'use client';

/**
 * LinkedInCarousel — a horizontal, drag-to-scroll rail of embedded LinkedIn
 * posts. Local post previews stay visible until the official embed loads.
 *
 *  - Pointer drag scrolls the rail; the click-vs-drag threshold lets links
 *    inside the embeds still work on a clean click.
 *  - Wheel and keyboard (←/→) nudge the rail without hijacking the page's
 *    vertical scroll journey.
 *  - Mount embeds explicitly as the rail approaches the viewport, independently
 *    of the browser's native iframe lazy-loading schedule.
 */

import { useEffect, useRef, useState } from 'react';

import './LinkedInCarousel.css';

/** LinkedIn's embeds ship at a native width of 504px. We render each iframe at
 *  its native size (so the post never reflows / shows an inner scroll), then
 *  CSS-scale the whole thing down to a uniform card height. */
const EMBED_WIDTH = 504;
const CARD_HEIGHT = 480;
const LOAD_TIMEOUT = 12_000;

export type LinkedInPost = {
  src: string;
  height: number;
  url: string;
  preview: string;
  description: string;
};

type LinkedInCarouselProps = {
  posts: LinkedInPost[];
};

function LinkedInCard({ post, index, active }: { post: LinkedInPost; index: number; active: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'unavailable'>('loading');
  const frame = useRef<HTMLIFrameElement>(null);
  const scale = CARD_HEIGHT / post.height;

  useEffect(() => {
    if (!active || status !== 'loading') return;
    const timeout = window.setTimeout(() => {
      // Retry a stalled request once, then leave an actionable fallback.
      if (attempt === 0) setAttempt(1);
      else setStatus('unavailable');
    }, LOAD_TIMEOUT);
    return () => window.clearTimeout(timeout);
  }, [active, attempt, status]);

  const retry = () => {
    setStatus('loading');
    setAttempt((value) => value + 1);
  };

  const onLoad = () => {
    // An iframe's initial about:blank document can also fire load. It does not
    // mean LinkedIn has responded. The loaded post itself is cross-origin.
    try {
      const doc = frame.current?.contentDocument;
      if (doc && (doc.URL === 'about:blank' || !doc.body?.childElementCount)) return;
    } catch {
      // Cross-origin access is expected after navigating to LinkedIn.
    }
    setStatus('loaded');
  };

  return (
    <article className="li-card" style={{ width: EMBED_WIDTH * scale }}>
      <div className="li-embed" style={{ height: CARD_HEIGHT }}>
        {status !== 'loaded' && (
          <a className="li-preview" href={post.url} target="_blank" rel="noopener noreferrer"
            aria-label={`${post.description}. Open post on LinkedIn in a new tab`}>
            {/* Local images deliberately load independently of the third-party iframe. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.preview} alt={`Preview: ${post.description}`} width={EMBED_WIDTH} height={post.height} />
          </a>
        )}
        {active && status !== 'unavailable' && (
          <iframe
            key={attempt}
            ref={frame}
            src={post.src}
            title={`Embedded LinkedIn post ${index + 1}`}
            loading="eager"
            allowFullScreen
            onLoad={onLoad}
            onError={() => setStatus('unavailable')}
            className={status === 'loaded' ? 'li-frame is-loaded' : 'li-frame'}
            tabIndex={status === 'loaded' ? 0 : -1}
            aria-hidden={status !== 'loaded'}
            style={{
              width: EMBED_WIDTH,
              height: post.height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        )}
      </div>
      <div className="li-post-actions">
        <a href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`Open LinkedIn post ${index + 1} in a new tab`}>
          Open on LinkedIn <span aria-hidden="true">↗</span>
        </a>
        <button type="button" onClick={retry} aria-label={`Reload LinkedIn post ${index + 1}`}>
          {status === 'unavailable' ? 'Load live post' : 'Reload'}
        </button>
      </div>
    </article>
  );
}

export default function LinkedInCarousel({ posts }: LinkedInCarouselProps) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setActive(true);
      observer.disconnect();
    }, { rootMargin: '800px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = rail.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = rail.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.down = false;
  };

  // While dragging, swallow the click so iframe links don't fire on a drag-release.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.li-card');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nudge(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nudge(-1);
    }
  };

  return (
    <div
      className="li-carousel"
      role="region"
      aria-label="LinkedIn posts. Use left and right arrow keys to navigate."
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className="li-rail"
        ref={rail}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {posts.map((post, i) => (
          <LinkedInCard key={post.src} post={post} index={i} active={active} />
        ))}
      </div>

      <button type="button" className="li-nav li-prev" aria-label="Previous post" onClick={() => nudge(-1)}>
        <span aria-hidden>&#8592;</span>
      </button>
      <button type="button" className="li-nav li-next" aria-label="Next post" onClick={() => nudge(1)}>
        <span aria-hidden>&#8594;</span>
      </button>
    </div>
  );
}
