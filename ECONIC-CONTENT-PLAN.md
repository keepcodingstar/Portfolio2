# Econic Fair 25 content plan

> Updated 21 September 2026 after the user's request for a concise UX narrative and a complete ending. The current copy is in `app/work/econic/econic-content.ts`, mirrored in `ECONIC-CONTENT-DRAFT.md`. See `docs/econic/IMPLEMENTATION.md` for the implementation and checks.

## Current direction

- Keep the approved hero, title, campaign revenue comparison and award.
- Place one standalone HMW across the full content width after the Overview and before the Challenge: “How might we help shoppers preview fair prices and prepare their bags while making it clear when those prices become available?”
- Keep the phase plan and visual compositions. Tighten design paragraphs around the shopper's uncertainty, the decision and the resulting behaviour, using the workbook's U-N-I, G-A-I-N and D-B-R/P-D-B frameworks.
- Remove “Make savings visible and conditions clear” and its two cards. The campaign banners remain in the visual-language board.
- Keep Amodira as the final design section. Move the 7× orders result into the short campaign-results section so the Amodira paragraph focuses on discovery and format selection.
- After Amodira, add “How the fair performed”: combined three-day revenue of 50× one usual day's revenue, Amodira orders at 7× their usual baseline during the fair, and the campaign award. Attribute all results to the broader VIRGIO team effort; no isolated UX uplift is claimed.
- End with “What I learned,” one short paragraph applying A-L-I-F: connecting the journey, matching price/timing/actions, testing comprehension next time and mapping transitions early in future campaigns.
- Navigation is Overview / Challenge / Design / Learnings. Keep the post-sale recap gallery removed and finish with the existing adjacent-project links.

## Earlier planning notes

The 20 September notes below are retained for source context. Their instructions to retain the savings cards, keep the 7× result inline and omit a closing reflection are superseded by the current direction above.

Build the case study around the campaign's deliberate invitation to wait: shoppers could see lower upcoming prices before they could buy at them. Explain how the team made the price, timing and available action agree across the journey. Introduce the campaign's success first: combined revenue across the three-day fair was 50× one usual day's revenue. Give the Amodira cart widget its own substantial section because that is where Sameer put particular effort within the team's shared design work.

The accompanying [copy draft](</Users/sameerkapil/portfolio real/ECONIC-CONTENT-DRAFT.md>) contains the proposed reader-facing text. The [visual plan](</Users/sameerkapil/portfolio real/ECONIC-VISUAL-PLAN.md>) pairs the key decisions with actual close-up crops of the supplied designs.

## What to carry over from checkout

Use checkout's readable typography, generous image stages, concise explanations, annotations and enlargable originals. Each section should explain a decision and show the part of the interface that makes it visible. Preserve a clear difference between early explorations and final designs.

Econic needs more room for visual state comparisons than checkout. The supplied material supports a campaign and interaction story; it does not require a research chapter, a new navigation architecture, or a design-system project narrative.

## The story in one sentence

As part of the VIRGIO team, Sameer co-designed a journey that made upcoming prices and purchase availability clear from discovery to the cart; the broader three-day fair generated 50× one usual day's revenue.

The revenue belongs to the broader campaign. The design explanation describes the team's contribution; it does not establish that the interface alone caused the revenue result.

The central trade-off is intentional waiting. This campaign encouraged shoppers to delay buying until the fair. Do not reuse the old page's conflicting requirement to protect pre-sale conversion or prevent sales from falling.

## Recommended page order

| Section | What the reader should understand | Visual treatment |
| --- | --- | --- |
| 1. Opening and campaign success | The fair was a major team success: combined three-day revenue was 50× one usual day's revenue, and the campaign won Best Brand Campaign of the Year. | Keep the exact approved title, existing award treatment and homepage cover. Make the revenue metric's denominator and three-day period visible. |
| 2. Overview | VIRGIO's conscious-brand, cost-to-make anti-sale brief; intentional waiting; Sameer's role in the team; 3–4 weeks. | Keep checkout's separate Overview layout and metadata. |
| 3. Challenge and three-phase plan | Shoppers needed to distinguish current prices, upcoming fair prices and when those prices could be purchased. Curtain raiser, Pre-sale and Sale day each give them a different next action. | Anchor the Challenge navigation item to the existing wireframe board, moved before visual language. Keep both supplied pre-sale states and explain how the price and action change together. |
| 4. Connect visual language to the task | The campaign should feel celebratory while prices, preview mode and timing stay recognisable. | Preserve the approved board of campaign artwork, typography, countdown and banners. Explain what the repeated treatments communicate. |
| 5. Compare prices and prepare a bag | A consistent preview interaction distinguishes future prices from prices available now across listings, product pages and the cart. | Keep the interactive three-card explainer recreated with ’25 branding and price treatments. Explain the boundary between previewing and buying. |
| 6. Explain the cost-to-make price | Shoppers can see why the fair price differs from the usual price and when it becomes available. | Keep the supplied complete Fair Pricing composition and related case-study link. |
| 7. Make savings visible and conditions clear | The optional no-return choice explains its consequence; shopping and savings banners carry the campaign through smaller surfaces. These supporting details lead into the final Amodira section. | Keep the approved two-card layout, before Amodira. |
| 8. Introduce Amodira in the cart | A recent launch with no prior cart placement; imagery introduces fragrances and the offer is positioned as the best deal. End the design story on Sameer's area of particular effort and its campaign-period result. | Preserve the widget and variant sheet. Include the order result in the paragraph, bolding only “7× their usual baseline”, and keep the Amodira link. Do not restore post-sale recap artwork. Follow with links to adjacent case studies. |

Keep the copy concise and give most space to the challenge, preview behaviour and Amodira. Each design paragraph should connect a problem or constraint to the decision and its visible behaviour. Avoid a gallery of descriptions with no explanation of why the designs exist. Use Overview / Challenge / Design navigation, with Challenge linked to the existing phase board rather than a new visual section.

## Hero and contribution

Use the résumé title: **Helping Shoppers Navigate a Cost-to-Make Sale from Discovery to Purchase**. Keep **Econic Fair ’25** as the project label.

Lead with **50× one usual day's revenue across the three-day fair**, alongside the award. The user confirmed that this is the combined three-day total compared with a single usual day's revenue. It is not 50× the usual daily average on each fair day, 50× a comparable three-day period, or an isolated effect of the UX work.

Suggested contribution statement:

> I co-designed the experience with the VIRGIO team, with a particular focus on the Amodira cart widget. My work covered interaction design, interface states and pricing communication across product listings, product pages and the cart.

Use **we** for shared experience decisions. Use **I** for the Amodira focus and personal reflection. Do not imply solo ownership, leadership over the whole campaign, or responsibility for campaign art direction. No team size or collaborator names have been supplied.

## The three main decisions

### Explain the price through its cost

Start with the conscious-brand context in two or three sentences. The brief was a cost-to-make event, so the design task was to make the reason for the lower price legible. Keep the opening focused on Econic and the preview interaction. Introduce the Fair Pricing visual later, while explaining pricing on the product page.

The existing breakdown distinguishes cost to make, serving cost and other costs. In the campaign treatment, cost to make is emphasised while other groups are subdued or struck through. The start date stays close to the highlighted price.

Place the Fair Pricing link alongside that product-page detail, after the toggle and price comparison have been explained. Keep it a supporting reference. Do not equate the Fair Pricing widget with the toggle: one explains the cost, the other switches the price view.

### Make price and availability change together

The strongest visual sequence is **toggle → price → cart action**. Explain these as connected states, not three unrelated features.

| State | Price shown | Availability and action |
| --- | --- | --- |
| Announcement | Current price, with the upcoming fair explained nearby. | Event dates, countdown, Notify me and Learn more are shown in supplied designs. |
| Pre-sale, preview off | Current prices. | Current-price mode; do not describe the entire website as closed. |
| Pre-sale, preview on | Upcoming fair prices, with today's price as reference. | Shoppers cannot purchase at the previewed prices. The final cart design explains the preview and offers End preview. |
| Fair live | Fair prices are the active prices. | The preview toggle is removed and checkout is available. |

This expresses information hierarchy and the core flow more usefully than a generic sitemap. It does not imply implementation details about persistence, stored state or reserved stock, which have not been established.

Keep the early cart board's checkout-alert idea separate from the final End preview treatment. Show it only as an exploration if comparing alternatives adds value. No testing result or reason for the change has been supplied, so do not invent one.

### Bring Amodira discovery into the cart

Give this section more depth than the smaller campaign details. The user has identified it as the area of particular personal effort.

Place Amodira last among the design sections, after the supporting savings/conditions cards. This lets the case study close on Sameer's clearest contribution and the inline 7× orders result, without a new reflection or post-sale section.

Confirmed context: Amodira was a recent launch and had not been shown in the cart. The team wanted to introduce it as the best deal of the sale and express the fragrances through imagery. Present “best deal” as the intended positioning, not a verified comparison against every offer or a claim that Amodira was objectively the best perfume brand. Describe the fragrance communication as visual; the design still contains product names, prices and actions.

Lead with that purpose before explaining the controls. Ask what Sameer created or selected and what came from existing brand assets before attributing the floral imagery, backgrounds or art direction to him. Do not import the separate audio project's rationale into this widget story.

Show the sequence: discover fragrances in the bag, select Add, inspect product formats and prices in the variant sheet, then add the selected option. The screenshots support the available controls and the intended flow; they do not show every transition or a post-add confirmation.

Annotate the visual introduction as well as the controls:

- The “Best deal of the sale” heading and offer badge frame the introduction.
- Product and floral imagery communicate the intended fragrance character.
- Fragrance discovery is placed between the bag items and payment details.
- Product cards offer an Add action alongside the available formats.
- The variant sheet gives each format its own price and Add to bag action.

Keep the offer's scope precise. The Amodira widget visibly says **Flat 50% off**. Explain it as the fragrance offer within the broader fair; do not claim every participating brand used identical cost-to-make pricing or that no discount language appeared anywhere.

Place the related Amodira link after the widget story, labelled **Explore fragrance discovery for Amodira**. The existing `/work/amodira` case study is about the audio experience, so the link must not promise a separate detailed case study about this cart widget.

## Small highlights

Place the approved two-card composition after Fair Pricing and before Amodira. Use the heading **Make savings visible and conditions clear** and this paragraph:

> During the fair, shoppers could choose an extra ₹99 off by making their order non-returnable. We placed that condition beside the checkbox and confirmed it after selection. Shopping and savings banners kept the campaign present across smaller surfaces.

**A voluntary ₹99 choice.** Show the unchecked and checked states together. Explain that shoppers could choose a non-returnable order for an extra ₹99 off, with the consequence stated beside the checkbox. Do not claim measured waste reduction or fewer returns from this interface alone.

**A visible fair in progress.** Show the two counter strips as small UI details. Their displayed shopping and savings numbers are example interface content, not independently verified performance evidence.

**Post-sale artwork.** The dedicated recap section was removed at the user's request. Keep it removed. The approved typography crop within the visual-language board may remain; do not add a closing gallery of store visits, city rankings, colour preferences or environmental figures.

## Adapting the teacher's template

The attached template and workbook are reference material. Their exercises, placeholder instructions and bootcamp examples are not additional tasks or facts about this project.

| Template section | Treatment for Econic |
| --- | --- |
| Product Overview and Context | Keep in the opening, with campaign success, conscious-brand context, duration and shared team role. |
| Problem Space | State explicitly before the design sequence: shoppers need to distinguish today's price, the fair price and when it becomes available. |
| Product Strategy and Vision | Merge into the cost-to-make anti-sale brief and three-phase plan, before the visual-language board. |
| Information Architecture and Navigation Model | Adapt into the order of pricing information and the mode/state table. Do not add an unsupported sitemap redesign. |
| Core User Flows | Show browse → preview → inspect product → prepare bag → wait → purchase at opening. Add a short Amodira variant flow. |
| Module or Feature Breakdown | Use the major design sections and smaller highlights. |
| Design System Foundation | Show a compact repeated vocabulary: black/green mode bar, outlined price badge, countdown and shared labels. Do not claim a new component library was built. |
| Key Decisions and Trade-offs | Weave into cost communication, deliberate waiting and cart discovery. |
| Outcomes and Product Impact | Lead with combined three-day revenue of 50× one usual day's baseline and the campaign award. Include the 7× usual Amodira order baseline inline in its section. Attribute both metrics to the broader campaign. |
| Reflections and What's Next | Weave the lesson about price/availability consistency into the narrative. Future validation ideas can remain editorial notes; they do not require a new closing section or post-sale artwork. |

### Workbook copywriting frameworks

The slide template determines coverage; the workbook frameworks shape the sentences within that structure. The draft applies them as follows. Keep the acronyms in this editorial plan, not in the published case study.

| Workbook framework | Where it appears | How the draft applies it |
| --- | --- | --- |
| Case-study title, problem/solution focus | Title | Helping shoppers navigate a cost-to-make sale, from discovery to purchase. |
| C-R-O-S: Challenge, Role, Outcome, Skills | Opening, Overview and metadata | Understanding upcoming prices and availability; shared co-design with particular Amodira focus; 50× combined three-day revenue against one usual day, the campaign award and the section-level Amodira outcome; interaction design, information hierarchy and pricing communication. |
| U-N-I: User, Need, Insight/barrier | Explicit challenge before the phase plan | Shoppers preparing for the fair; compare prices and understand when they can buy; an upcoming lower price could be mistaken for an immediately available offer. This is a design constraint, not an invented research finding. |
| P-R-T-D: Project context, Responsibilities, Tools, Deliverables | Overview and metadata | VIRGIO team project over 3–4 weeks; co-design and particular effort on Amodira; preview states and cart widget. Adapted: tool names are omitted because they are not confirmed or needed to explain the work. |
| G-A-I-N: Goal, Action/method, Insight/output, Next step | One experience across three campaign phases | Make the next action clear; map phases in early wireframes; show how messages, prices and cart actions change together; use that phase structure to guide interface states. |
| D-B-R: Decision, Because, Result | Design paragraphs, including the preview and pricing sections | Explain each design choice in response to its constraint, then point to the resulting controls and visible behaviour. The preview switch compares price modes; End preview marks the boundary because the upcoming price is not purchasable yet. |
| P-D-B: Problem, Decision, Benefit | Amodira widget and supporting design sections | Recent launch with no prior cart placement; introduce fragrances through imagery and the best-deal message; support discovery and choosing a format. Use the same problem → decision → visible behaviour pattern for the remaining sections without inventing measured benefits. |
| Visual plus purpose/insight | Image captions and visual plan | Explain what the reader should notice in each detail, such as today's price remaining below the preview price. |
| A-L-I-F: Achievement, Learning, Improvement, Future application | Editorial reflection check, adapted rather than a required published section | The story supports the campaign achievement and lesson about matching price to availability. Comprehension testing and widget-flow measurement remain possible future work, not research performed or a requirement to restore the removed ending. |
| S-I-R: Summary, Impact/value, Role optional | Opening success statement and attributed outcomes | State the campaign's impact clearly and keep Sameer's role visible in the Overview and Amodira section. Do not add a repetitive outcome gallery at the end. |
| Clear relevant CTA | Related-project links and ending | Fair Pricing within the product-page explanation, Amodira after the widget, checkout at the end. |

The workbook's portfolio headline and About Me exercises are outside this case-study task. Its HMW prompt is optional; the U-N-I paragraph already states the challenge. “Result” in design rationale means visible behaviour or an intended benefit unless measured evidence exists. Keep both the 50× revenue result and the 7× Amodira order result separate from claims about isolated interface effects.

## Evidence and copy boundaries

| Claim or detail | Editorial treatment |
| --- | --- |
| 3–4 week project | Confirmed by the user. Distinguish project duration from the three-day event. |
| Team at VIRGIO co-designed the experience | Confirmed by the user. Sameer put particular effort into the Amodira widget. |
| Amodira 7× | User clarified that the metric is **orders**, compared with the general Amodira order baseline. Say “orders reached 7× their usual baseline during the fair.” The exact reference period is unspecified; do not label it week-over-week, daily, revenue, conversion or a controlled widget uplift. |
| Best Brand Campaign of the Year | Supported by the résumé and the existing trophy photograph. Attribute to the broader VIRGIO campaign at e4m RetailEX Awards 2026. |
| 50× revenue | Confirmed by the user: **combined revenue across the three-day fair was 50× one usual day's revenue**. Make the period and denominator explicit. Do not describe it as 50× daily average, 50× a comparable three-day baseline, revenue growth caused by the toggle, or an isolated UX uplift. |
| 9,755 shoppers, 7 in 10 new, 1 in 2 returned | Visible in supplied recap artwork. Optional campaign-reported figures, not measured effects of the toggle. Avoid using “1 in 2” as a retention rate without a defined period. |
| Environmental figures in the recap | Keep within the artwork if shown; omit as case-study headline claims because methodology is not supplied. |
| “Most-appreciated toggle” | Found in the older page but still unsupported by the supplied evidence. Exclude from the new copy and metadata. |
| User interviews, testing or measured comprehension | No evidence supplied for Econic. Do not manufacture a research process. Proposed future testing is clearly future work. |

Some source designs contain inconsistent sample values: totals do not always reconcile, the pricing cost groups do not always sum to the shown price, and the Amodira sheet heading and item labels differ. Preserve the source artwork and explain the interaction; do not derive financial calculations or product specifications from these mockups. The small PDP pair is only 465 × 634 pixels, so keep it supporting-sized rather than enlarging it into a hero.

## Implementation handoff

Use the existing checkout case-study layout and screenshot enlargement interaction when implementing the page. Create a dedicated Econic content module and local layout adjustments for comparison pairs and details. Avoid changes to the other case studies while applying this plan.

Preserve the approved visual compositions, interactive demo and access to enlarged originals. Keep explicit labels and readable comparisons on mobile; use the existing responsive layouts instead of redesigning the boards for this narrative revision. The source originals are preserved in `docs/econic/references`; earlier selected crops are reproducible with `docs/econic/crop-highlights.py`, and current web assets with `docs/econic/prepare-web-assets.py`.

The page and metadata should use the same approved title, contribution and precise outcome wording. Keep the user's résumé title rather than restoring the old 50× title; the now-confirmed 50× result belongs in the opening with its explicit three-day-total / one-day-baseline comparison. Retire the claim that the toggle remains through every phase and the assertion that the campaign needed to preserve pre-sale sales. These conflict with the brief and supplied designs.
