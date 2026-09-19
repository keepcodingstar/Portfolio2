export const checkoutTitleAccent = 'Faster Checkout';
export const checkoutTitle = `${checkoutTitleAccent} Through an In-House Redesign`;

export const checkoutOutcomes = [
  { value: '+2.68%', label: 'Checkout conversion' },
  { value: '−25.7%', label: 'Average completion time' },
] as const;

export const story = {
  context: {
    body: 'During the Econic 25 sale, our systems handled the surge in traffic, but our Shopify checkout became a bottleneck for placing orders. We couldn’t directly scale its capacity. After the sale, we decided to bring checkout in-house to gain control over capacity and speed.',
  },
  before: {
    title: 'Problem',
    body: 'The Shopify checkout limited how we could improve address entry and payment choices, and its default UI felt disconnected from the rest of VIRGIO. These were the UX issues we wanted to address. The capacity bottleneck during Econic 25 triggered the move in-house.',
  },
  hesitation: {
    accent: 'At the final step,',
    lead: 'At the final step, a small uncertainty can interrupt a purchase.',
    body: 'Shoppers have already chosen what to buy. Checkout needs to make the remaining details clear: where the order will arrive, when to expect it and what they’ll pay.',
  },
  goals: {
    title: 'Making checkout easier to complete',
    description: 'The aim was to reduce hesitation around delivery details, available credits and the final payable amount. Shoppers should be able to understand what their choices change before committing to payment.',
    lead: 'How Might We',
    body: 'help shoppers select an address and pay with less effort, while keeping checkout reliable during peak traffic and consistent with the rest of VIRGIO?',
  },
  concept: {
    title: 'Rejected direction: checkout on one screen',
    body: 'This direction combined the shopping bag, delivery address and payment controls on one page. The aim was to reduce navigation and let shoppers review their items and place an order in the same place, particularly when their address and payment details were already available.',
  },
  final: {
    title: 'Fewer decision points for faster checkout',
    body: 'When address details were available through Shiprocket, we prefilled them and selected a default for shoppers to verify. Delivery estimates and payment options followed, with an order summary available for review. This reduced repeated entry and organised checkout around a clear sequence of decisions.',
  },
  address: {
    title: 'A new address with less typing',
    body: 'For shoppers adding a new address, map search and a draggable pin helped locate the delivery point and prefill address details. Shoppers could then review and complete the form before saving, reducing manual entry while keeping the details editable.',
  },
  measurement: {
    title: 'A checkout we could measure and improve',
    body: 'Bringing checkout in-house gave us visibility into how shoppers interacted with the page. We could use that data to investigate friction and guide future iterations, making the redesign a foundation for ongoing improvement.',
  },
  results: {
    title: 'Faster checkout and higher conversion',
    body: 'Following the in-house migration and checkout redesign, conversion increased by 2.68%, while average completion time fell by 25.7%.',
  },
  reflection: {
    title: 'Designing around the decisions shoppers make',
    body: 'Helping deliver the in-house checkout reinforced the value of reducing competing decisions and making existing customer details useful. Next, I would use the new analytics to identify friction and test whether the combined checkout concept could offer returning shoppers a simpler path to purchase.',
  },
};

// Transcribed from the supplied table; drafting prompts have been replaced with
// scope evidenced by the supplied screens and the existing project information.
export const scope = [
  ['Goals', 'Make address selection and payment easier, support reliable checkout during peak traffic, and create consistency with the new design system.'],
  ['Design scope', 'Address selection and entry, delivery information, serviceability states, payment choices, credits and gift cards, and the final order amount.'],
  ['Success measures', 'Checkout completion time and conversion. The new analytics also enable the team to identify friction and evaluate subsequent improvements.'],
  ['Boundaries and constraints', 'Mobile and desktop checkout within VIRGIO’s design system. The experience needed to handle saved and new addresses, delivery serviceability, and payment eligibility, including requiring a valid address before payment.'],
] as const;

export type ScreenAnnotation = {
  number: number;
  x: number;
  y: number;
  title: string;
  body: string;
};

export const desktopAnnotations: ScreenAnnotation[] = [
  { number: 1, x: 10, y: 55.5, title: 'Use credits before choosing how to pay', body: 'Available store credit and gift card balances come before payment, so shoppers can apply them before paying the remainder.' },
  { number: 2, x: 91, y: 67, title: 'See the amount before committing', body: 'The order breakdown explains the total, and the payment button repeats the amount shoppers are about to pay.' },
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
  { file: 'final-cash-on-delivery', label: 'Final checkout with cash on delivery', alt: 'Final checkout with a default address, delivery estimates, store credits, gift cards, cash on delivery and a swipe-to-confirm action.', width: 804, height: 2276, caption: 'A saved address, delivery details and payment in one sequence.', annotations: [
    { number: 3, x: 98, y: 34, title: 'Review where and when', body: 'Delivery estimates sit just below the selected address, helping shoppers check the destination and arrival dates together.' },
  ] },
  { file: 'final-no-address', label: 'Final checkout without a saved address', alt: 'Final checkout empty-address state with an add-address action and a disabled payment button.', width: 804, height: 1880, caption: 'Payment stays unavailable until a delivery address is added.' },
  { file: 'final-edit-address', label: 'Final saved-address actions', alt: 'Final checkout detail showing Edit Address and Delete Address in a menu on the saved-address card.', width: 804, height: 994, caption: 'Saved details remain easy to edit or remove.' },
];

export const explorations: (StudyScreen & { title: string; observation: string; consideration: string; noteLabel?: string })[] = [
  { file: 'exploration-saved-cards', label: 'Saved-card payment exploration', alt: 'Unshipped payment direction with saved cards nested within payment methods, followed by store credits and an order breakdown.', width: 804, height: 2280, caption: 'Saved cards within the payment list.', title: 'Payment choices up front', observation: 'This direction brought saved cards and individual payment methods into our checkout.', noteLabel: 'Constraint', consideration: 'Handling payments this way required licensing and registration. We instead moved payment collection to the next step, handled by a third-party payment gateway.' },
  { file: 'exploration-payment-toggle', label: 'Pay now and cash-on-delivery toggle exploration', alt: 'Unshipped checkout direction with a Pay now and Pay COD toggle above payment methods and redemptions.', width: 804, height: 1939, caption: 'A separate choice between prepaid and COD.', title: 'A payment-mode toggle', observation: 'A “Pay now / Pay COD” switch separates payment modes before the individual methods.', consideration: 'This introduces another decision before choosing a payment method.' },
  { file: 'exploration-summary-first', label: 'Order-summary-first exploration', alt: 'Unshipped checkout direction that places the order breakdown before payment, with redemption variants shown below.', width: 804, height: 2058, caption: 'Order details before the payment options.', title: 'Summary before payment', observation: 'The order breakdown moves above payment, while redemption treatments sit farther down.', consideration: 'Credits could change an amount the shopper has already reviewed.' },
];
