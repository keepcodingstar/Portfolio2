# Econic local case study

Implemented 20 September 2026 at `/work/econic`; narrative and ending revised 21 September 2026.

## Structure and content

- Reuses checkout's typography, page shell, hero transition and accessible image viewer. Navigation is Overview / Challenge / Design / Learnings. The four-item navigation moves to the bottom below 760px to avoid overlapping the header links.
- Keeps the exact approved title, “Helping Shoppers Navigate a Cost-to-Make Sale from Discovery to Purchase”, and the homepage cover. The opening leads with 50× revenue and the campaign award, attributed to the VIRGIO team.
- The user confirmed the revenue comparison: combined revenue across the three-day fair was 50× one usual day's revenue. This is not 50× the usual daily average on each fair day or 50× a comparable three-day period, and it does not establish isolated UX causality.
- A separate Overview explains VIRGIO's conscious-brand, cost-to-make anti-sale brief, the deliberate invitation to wait, the 3–4 week project and Sameer's contribution to the team's work.
- A standalone HMW follows the Overview, spanning the full content width before the Challenge. It asks about previewing fair prices, preparing a bag and knowing when those prices become available, using a restrained divider and the existing typography.
- Only “How might we” is bold in that question. Each narrative paragraph emphasises one short phrase identifying the business model, interface decision or UX takeaway; the wording stays unchanged.
- The narrative states the price-and-availability challenge explicitly and shows the three-phase plan in the same section, before the visual-language board. Design paragraphs connect a problem or constraint to the decision and visible behaviour, using one heading, one description and one visual composition per design section.
- The Challenge navigation item anchors the existing phase board, moved before visual language. It presents Curtain raiser, Pre-sale and Sale day wireframes; Pre-sale retains the supplied toggle-off and toggle-on screens side by side.
- The approved visual-language board is retained: campaign artwork, refined typography, countdown and campaign banners. Its copy explains how campaign identity supports price and timing communication.
- The interactive demo recreates the supplied Econic ’26 three-card explainer with ’25 branding and outlined fair-price badges. Its switch and preview button update the product price, cost breakdown and example bag together. The three cards cover price preview, making costs and building a bag before the fair.
- Fair Pricing follows the demo, using the supplied complete product-page composition and a link to the related case study.
- The “Make savings visible and conditions clear” paragraph and both supporting cards are removed at the user's request. The campaign banners remain in the visual-language board; all source assets are retained.
- Amodira is the final design section. Its concise paragraph explains the new-brand introduction and format-selection sequence. The 7× orders result now sits in the campaign-results section instead of repeating inline.
- “How the fair performed” closes the design story with a flat results layout: 50× one usual day's revenue across three sale days, 7× the usual Amodira order baseline during the fair, and the e4m RetailEX campaign award. A brief credit attributes these results to the wider VIRGIO team effort.
- “What I learned” follows with one short A-L-I-F reflection on connecting price, timing and actions, then proposes mapping transitions early and testing price-availability comprehension in future campaigns. No completed research or testing is claimed.
- The workbook frameworks shape the concise copy without appearing as published labels. The post-sale recap gallery stays removed, and the page ends with the existing adjacent-project links.
- The shared section navigation now recognises the final anchor at the bottom of the page, where a short closing section cannot reach its usual top threshold.

## Files

- `app/work/econic/econic-content.ts`: current case-study copy.
- `app/work/econic/EconicView.tsx`: section compositions.
- `app/work/econic/EconicPreview.tsx`: interactive three-card ’25 demo.
- `app/work/econic/EconicPreview.module.css`: demo styling and responsive behaviour.
- `app/work/econic/econic.module.css`: responsive visual layouts.
- `docs/econic/prepare-web-assets.py`: reproducible crops and cover composition from the supplied artwork.
- `docs/econic/references/`: original artwork, including the recent typography, countdown, pre-sale states, full Fair Pricing composition and ’26 demo reference (files 29–34).
- `public/work/econic/redesign/`: optimized WebP assets, including the recent compositions and ’25 demo logo/product crops. The hero uses `public/work/econic/thumb.jpg`.

## Verification

- `npm run typecheck` and `git diff --check` passed for the 21 September revision.
- A separate headless browser verified the running Next.js page at 1440, 900, 768, 760, 620, 390 and 320px: no horizontal page overflow, navigation clipping or overlap with header links.
- All four section links update their hash, focus and active state. The preview switch updates prices, End preview restores today's prices, and the Amodira image viewer opens and closes with Escape.
- The shared navigation fix was also checked at the bottom of Checkout, Fair Pricing and Amodira; each correctly activates its final section.
- Screenshots of the opening and ending were inspected at desktop and mobile sizes. There were no browser JavaScript errors. The main page text decreased from 712 to 678 words despite adding the HMW, results and reflection.
- Original references are retained; changes remain local with no production deployment.
