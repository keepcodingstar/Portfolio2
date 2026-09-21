// Campaign facts come from the supplied screens, résumé and author clarifications.
// Results belong to the VIRGIO campaign. 50× compares the combined three-day
// revenue with one usual day; 7× refers to Amodira orders against their baseline.
export const econicTitle = 'Helping Shoppers Navigate a Cost-to-Make Sale from Discovery to Purchase';
export const econicDescription = 'Co-designing the shopping experience for VIRGIO’s Econic Fair ’25. The three-day campaign generated 50× one usual day’s revenue and won Best Brand Campaign of the Year at the e4m RetailEX Awards 2026.';

export const story = {
  overview: {
    title: 'Overview',
    body: 'For VIRGIO’s second anniversary, we built an “anti-sale”: garments sold at their cost to make for three days. Over 3–4 weeks, I co-designed the shopping experience with the VIRGIO team, with particular focus on introducing the newly launched Amodira brand in the cart.',
    emphasis: 'cost to make',
    question: 'How might we help shoppers preview fair prices and prepare their bags while making it clear when those prices become available?',
  },
  language: {
    title: 'Make fair prices recognisable',
    body: 'The anniversary identity had a practical job: help shoppers recognise the offer wherever they encountered it. Green and outlined badges identified fair prices, while countdowns kept the opening time beside “Zero margins. Zero markup.” Expressive typography and playful shapes carried the celebration.',
    emphasis: 'Green and outlined badges',
  },
  phases: {
    title: 'The challenge: build anticipation without selling too soon',
    body: 'Showing a lower price early could make it look available immediately. We mapped three phases to keep the message, price and next action aligned: discover the fair, preview prices and prepare a bag, then purchase when it opened.',
    emphasis: 'message, price and next action',
  },
  preview: {
    title: 'Separate previewing from purchasing',
    body: 'One switch across listings, product pages and the bag let shoppers compare today’s prices with upcoming fair prices. A countdown and “End preview” action made it explicit that preview prices were not yet purchasable. On sale day, the switch disappeared and checkout became available at fair prices.',
    emphasis: '“End preview”',
  },
  pricing: {
    title: 'Explain why the price is lower',
    body: 'A lower number alone could not explain “cost to make.” The product-page breakdown highlighted fabric, trims, stitching and taxes, while subduing or crossing out removed costs. Keeping the start date beside the price connected what shoppers would pay with why it was lower and when it became available.',
    emphasis: 'start date beside the price',
  },
  amodira: {
    title: 'Introduce Amodira while shoppers build their bags',
    body: 'Amodira was a recent launch with no cart placement. I focused on introducing its fragrances through product and floral imagery, framed as the “Best deal of the sale.” The widget led into a variant sheet, where shoppers could compare formats and prices before adding one to their bag.',
    emphasis: 'compare formats and prices',
  },
  results: {
    title: 'How the fair performed',
    body: 'Campaign results from the wider VIRGIO team effort.',
    metrics: [
      { label: 'Campaign revenue', value: '50×', context: 'one usual day’s revenue, earned across three sale days' },
      { label: 'Amodira orders', value: '7×', context: 'the usual order baseline during the fair' },
    ],
    award: { label: 'e4m RetailEX Awards 2026', title: 'Best Brand Campaign of the Year' },
  },
  learnings: {
    title: 'What I learned',
    body: 'Connecting preview and purchase taught me to design price, timing and actions together. The countdown and “End preview” action made that relationship explicit. For future campaigns, I’d map those transitions first and test whether shoppers understand when each price becomes available.',
    emphasis: 'price, timing and actions together',
  },
} as const;

export const campaignPhases = [
  { phase: 'Phase 1', name: 'Curtain raiser', goal: 'Introduce the promise and dates', screens: [
    { image: 'wire-announcement', width: 786, height: 1880, label: 'Curtain raiser wireframe', alt: 'Early curtain raiser wireframe introducing the fair.' },
  ] },
  { phase: 'Phase 2', name: 'Pre-sale', goal: 'Preview prices. Build a bag. Wait.', screens: [
    { image: 'wire-presale-off', width: 750, height: 3062, label: 'Toggle off', alt: 'Pre-sale listing wireframe with the preview toggle off, current prices and a Don’t buy yet banner encouraging shoppers to build their bag.' },
    { image: 'wire-presale-on', width: 750, height: 2316, label: 'Toggle on', alt: 'Pre-sale listing wireframe with the green preview toggle on and upcoming cost-to-make prices highlighted.' },
  ] },
  { phase: 'Phase 3', name: 'Sale day', goal: 'Buy at the active fair prices', screens: [
    { image: 'wire-sale', width: 725, height: 1935, label: 'Sale day wireframe', alt: 'Early sale-day cart wireframe with active fair prices.' },
  ] },
] as const;
