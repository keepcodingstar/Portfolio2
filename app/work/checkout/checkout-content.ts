export const checkoutTitleAccent = 'Faster Checkout';
export const checkoutTitle = `${checkoutTitleAccent} Through an In-House Redesign`;

export const checkoutOutcomes = [
  { value: '+2.68%', label: 'Checkout conversion' },
  { value: '−25.7%', label: 'Average completion time' },
] as const;

export const story = {
  context: {
    body: 'During the Econic 25 sale, our systems handled the traffic surge, but Shopify checkout became an ordering bottleneck we couldn’t directly scale. After the sale, we brought checkout in-house to control its capacity and speed.',
  },
  before: {
    title: 'Problem',
    body: 'Shopify limited our control over address entry and payment choices, and its default UI felt disconnected from the rest of VIRGIO.',
  },
  hesitation: {
    accent: 'At the final step,',
    lead: 'At the final step, a small uncertainty can interrupt a purchase.',
    body: 'Shoppers have already chosen what to buy. Checkout needs to make the remaining details clear: where the order will arrive, when to expect it and what they’ll pay.',
  },
  goals: {
    title: 'Making checkout easier to complete',
    description: 'Reduce hesitation around delivery details, available credits and the final amount, so shoppers understand how their choices affect the order before committing to payment.',
    lead: 'How Might We',
    body: 'help shoppers select an address and pay with less effort, while keeping checkout reliable during peak traffic and consistent with the rest of VIRGIO?',
  },
  concept: {
    title: 'Rejected direction: checkout on one screen',
    body: 'This concept combined the shopping bag, delivery address and payment controls on one page. It aimed to reduce navigation between reviewing items and placing an order, especially with address and payment details already available.',
  },
  final: {
    title: 'Fewer decision points for faster checkout',
    body: 'When Shiprocket address details were available, we prefilled them and selected a default for shoppers to verify. Delivery estimates, payment options and an order summary followed, reducing repeated entry and keeping decisions in sequence.',
  },
  address: {
    title: 'A new address with less typing',
    body: 'Map search and a draggable pin helped shoppers locate a new delivery point and prefill address details. They could review, edit and complete the form before saving, with less manual entry.',
  },
  results: {
    title: 'Faster checkout and higher conversion',
    body: 'Following the in-house migration and checkout redesign, conversion increased by 2.68%, while average completion time fell by 25.7%. We could now measure how shoppers used checkout, find friction and guide future improvements.',
  },
  learnings: {
    title: 'Key learnings',
    body: 'Helping deliver checkout in-house reinforced the value of reducing competing decisions and reusing customer details. Next, I’d use the new analytics to identify friction and test whether the combined checkout concept could offer returning shoppers a simpler path to purchase.',
    emphasis: 'reducing competing decisions and reusing customer details',
  },
};

// Transcribed from the supplied table; drafting prompts have been replaced with
// scope evidenced by the supplied screens and the existing project information.
export const scope = [
  ['Goals', 'Simpler address selection and payment, reliable checkout during peak traffic, and consistency with VIRGIO’s new design system.'],
  ['Design scope', 'Address selection and entry, delivery information, serviceability states, payment choices, credits and gift cards, and the final order amount.'],
  ['Success measures', 'Checkout completion time and conversion, with analytics to identify friction and evaluate future improvements.'],
  ['Boundaries and constraints', 'Mobile and desktop checkout within VIRGIO’s design system, supporting saved and new addresses, delivery serviceability and payment eligibility. Payment required a valid address.'],
] as const;

export type ScreenAnnotation = {
  number: number;
  x: number;
  y: number;
  title: string;
  body: string;
};

export const finalAnnotations: ScreenAnnotation[] = [
  { number: 1, x: 98, y: 49, title: 'Use credits before choosing how to pay', body: 'Shoppers can apply store credit and gift card balances before paying the remainder.' },
  { number: 2, x: 98, y: 78, title: 'See the amount before committing', body: 'The order breakdown explains the total. The payment button repeats it before shoppers commit.' },
  { number: 3, x: 98, y: 34, title: 'Review where and when', body: 'Delivery estimates sit below the selected address, keeping the destination and arrival dates together.' },
];

export type StudyScreen = {
  file: string;
  label: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  annotations?: ScreenAnnotation[];
};

export const combinedScreens: StudyScreen[] = [
  { file: 'combined-bag-card', label: 'Combined checkout with a saved card', alt: 'Unshipped shopping bag concept with a saved address at the top and a saved-card payment action at the bottom.', width: 720, height: 1708, caption: 'Review the bag and pay with a saved card.' },
  { file: 'combined-bag-upi', label: 'Combined checkout with CRED UPI', alt: 'Unshipped shopping bag concept showing CRED UPI as the selected payment method.', width: 720, height: 1708, caption: 'The same bag with CRED UPI selected.' },
  { file: 'combined-payment-options', label: 'Payment method selection concept', alt: 'Payment concept showing a preferred Google Pay option, an expanded UPI list and net-banking options.', width: 804, height: 1722, caption: 'Choose or change a payment method.' },
  { file: 'combined-address-sheet', label: 'Delivery address sheet concept', alt: 'Address-selection bottom sheet with saved addresses, editing controls and an add-address action.', width: 720, height: 1688, caption: 'Switch delivery addresses in a sheet.' },
];

export const finalScreens: StudyScreen[] = [
  { file: 'final-cash-on-delivery', label: 'Final checkout with cash on delivery', alt: 'Final checkout with a default address, delivery estimates, store credits, gift cards, cash on delivery and a swipe-to-confirm action.', width: 804, height: 2276, caption: 'A saved address, delivery details and payment in one sequence.', annotations: finalAnnotations },
  { file: 'final-no-address', label: 'Final checkout without a saved address', alt: 'Final checkout empty-address state with an add-address action and a disabled payment button.', width: 804, height: 1880, caption: 'Payment stays unavailable until a delivery address is added.' },
  { file: 'final-edit-address', label: 'Final saved-address actions', alt: 'Final checkout detail showing Edit Address and Delete Address in a menu on the saved-address card.', width: 804, height: 994, caption: 'Saved details remain easy to edit or remove.' },
];

export const explorations: (StudyScreen & { title: string; observation: string; consideration: string; noteLabel?: string })[] = [
  { file: 'exploration-saved-cards', label: 'Saved-card payment exploration', alt: 'Unshipped payment direction with saved cards nested within payment methods, followed by store credits and an order breakdown.', width: 804, height: 2280, caption: 'Saved cards within the payment list.', title: 'Payment choices up front', observation: 'This direction brought saved cards and individual payment methods into our checkout.', noteLabel: 'Constraint', consideration: 'This required licensing and registration. We moved payment collection to the next step, using a third-party payment gateway.' },
  { file: 'exploration-payment-toggle', label: 'Pay now and cash-on-delivery toggle exploration', alt: 'Unshipped checkout direction with a Pay now and Pay COD toggle above payment methods and redemptions.', width: 804, height: 1939, caption: 'A separate choice between prepaid and COD.', title: 'A payment-mode toggle', observation: 'A “Pay now / Pay COD” switch separates payment modes before the individual methods.', consideration: 'This introduces another decision before choosing a payment method.' },
  { file: 'exploration-summary-first', label: 'Order-summary-first exploration', alt: 'Unshipped checkout direction that places the order breakdown before payment, with redemption variants shown below.', width: 804, height: 2058, caption: 'Order details before the payment options.', title: 'Summary before payment', observation: 'The order breakdown moves above payment, while redemption treatments sit farther down.', consideration: 'Credits could change an amount the shopper has already reviewed.' },
];
