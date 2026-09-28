# Case study motion

Research and implementation: 27 September 2026.

## Sources and findings

- [Nielsen Norman Group — The Role of Animation and Motion in UX](https://www.nngroup.com/articles/animation-purpose-ux/), Page Laubheimer, 12 January 2020. Motion attracts attention and can distract from reading. Keep it brief, restrained, and related to a useful purpose. Zoom is particularly useful for conveying movement through a hierarchy; ordinary case-study paragraphs do not need that metaphor.
- [IBM Carbon — Motion overview](https://carbondesignsystem.com/elements/motion/overview/). Distinguish subtle, task-supporting motion from expressive moments. Use an entrance ease that slows to a stop; avoid bounce and stretch. Duration should reflect the size and purpose of a movement. Provide a static alternative and simplify motion on small screens.
- [IBM Carbon — Choreography](https://carbondesignsystem.com/elements/motion/choreography/). Related elements should form a coherent experience. Preserve semantic consistency; use short, bounded staggers rather than unrelated simultaneous effects. Keep stable navigation and content available first.
- [web.dev — How to create high-performance CSS animations](https://web.dev/articles/animations-guide), Kayce Basques and Rachel Andrew. Prefer opacity and transforms, avoid layout/paint-heavy animation, and use `will-change` sparingly.

These are general interface guidelines, not a claim that one exact timing has been proven ideal for this portfolio. The settings below are design choices informed by them and by local browser checks.

## Application to this portfolio

The earlier effect treated headings, screenshots, and metrics alike. Headings moved independently of their introductory paragraphs; triggers at 96% of the viewport often ran before enough content was visible to appreciate the entrance. Scaling text from 90% changed its apparent size and alignment during reading.

The revised treatment keeps text at its natural size and reveals related content together:

| Content | Entrance | Duration | Sequencing |
| --- | --- | --- | --- |
| Section heading and consecutive introductory paragraphs | Fade with 6px upward settling | 450ms | All together |
| Selected visual or screenshot group | Fade with 12px upward settling | 600ms | One visual group at a time |
| Outcome metrics | Fade with 8px upward settling | 400ms | 50ms stagger; current groups finish within 500ms |
| Hero, overview labels, navigation, unrelated body copy | Immediately available | None | None |

- Entrances start when their top reaches 86% of the viewport and play once. This creates a visible but brief transition before the content reaches the main reading area.
- Mobile travel is halved; text remains unscaled at every screen size.
- Use `power2.out` to settle without bounce or overshoot. No blur, character splitting, or continuously moving reading text.
- Existing content above the trigger line is left visible on hydration/history arrival. Hidden layout elements are excluded.
- A focused section or control completes the relevant entrance immediately. Browser Back, in-page links, image dialogs, and interactive examples remain usable.
- Reduced-motion preferences disable reveals. Without JavaScript, server-rendered content remains visible.
- Completed animations release inline transforms. Font/image/content-size changes refresh trigger positions; unmount cleans up animations and observers.

The homepage scroll controller, sticky card animation, and extra padding above “Case studies” are separate and unchanged by this revision.
