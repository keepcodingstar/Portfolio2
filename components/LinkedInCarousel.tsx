'use client';

/**
 * LinkedInCarousel — a horizontal, drag-to-scroll rail of embedded LinkedIn
 * posts. Each card is the official LinkedIn embed <iframe>. Unlike the WebGL
 * CircularGallery, this is plain DOM so it can host live iframes.
 *
 *  - Pointer drag scrolls the rail; the click-vs-drag threshold lets links
 *    inside the embeds still work on a clean click.
 *  - Wheel and keyboard (←/→) nudge the rail without hijacking the page's
 *    vertical scroll journey.
 *  - Iframes are lazy-loaded so off-screen posts cost nothing until scrolled to.
 */

import { useRef } from 'react';

import './LinkedInCarousel.css';

/** LinkedIn's embeds ship at a native width of 504px. We render each iframe at
 *  its native size (so the post never reflows / shows an inner scroll), then
 *  CSS-scale the whole thing down to a uniform card height. */
const EMBED_WIDTH = 504;
const CARD_HEIGHT = 480;

type LinkedInPost = { src: string; height: number };

type LinkedInCarouselProps = {
  posts: LinkedInPost[];
};

export default function LinkedInCarousel({ posts }: LinkedInCarouselProps) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

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
        {posts.map((post, i) => {
          const scale = CARD_HEIGHT / post.height;
          return (
            <article
              className="li-card"
              key={`${post.src}-${i}`}
              style={{ width: EMBED_WIDTH * scale, height: CARD_HEIGHT }}
            >
              <iframe
                src={post.src}
                title={`Embedded LinkedIn post ${i + 1}`}
                loading="lazy"
                allowFullScreen
                frameBorder={0}
                style={{
                  width: EMBED_WIDTH,
                  height: post.height,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              />
            </article>
          );
        })}
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
