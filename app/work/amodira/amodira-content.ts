// Keep the résumé-approved title, skills and core facts intact when refining the copy.
export const amodiraTitleAccent = 'Audio Experience';
export const amodiraTitle = `${amodiraTitleAccent} for Fragrance Discovery`;
export const amodiraSkills = 'Concept Development, Interaction Design, Usability Testing, AI audio Creation';
export const amodiraDescription = 'Eight AI-created soundtracks interpreting Amodira’s fragrances. Sound of the Scent became the second-most interacted element on perfume pages, after the Back button.';

export type Fragrance = {
  name: string;
  slug: 'adri' | 'arka' | 'himaia' | 'kala' | 'mira' | 'raya' | 'sutra' | 'vaanan';
  notes: { top: readonly string[]; middle: readonly string[]; base: readonly string[] };
};

// Transcribed from the original *_black*horizontal.png artwork in Downloads.
// Arka’s “Calabrian Bergamot” is one note, as confirmed by Notes in Vertical/Arka.ai.
export const fragrances = [
  { name: 'Adri', slug: 'adri', notes: {
    top: ['Grapefruit', 'Lemon', 'Mint', 'Pink pepper', 'Bergamot'],
    middle: ['Jasmine', 'Ginger', 'Nutmeg'],
    base: ['Amber', 'Cedar', 'Incense', 'Sandalwood'],
  } },
  { name: 'Arka', slug: 'arka', notes: {
    top: ['Calabrian bergamot', 'Sichuan pepper'],
    middle: ['Patchouli', 'Lavender', 'Vetiver'],
    base: ['Labdanum', 'Ambroxan', 'Cedar'],
  } },
  { name: 'Himaia', slug: 'himaia', notes: {
    top: ['Yuzu', 'Pomegranate', 'Iced accord'],
    middle: ['Lotus flower', 'Peony', 'Magnolia'],
    base: ['Musk', 'Acajou', 'Vegetal amber'],
  } },
  { name: 'Kala', slug: 'kala', notes: {
    top: ['Ylang-ylang essence'],
    middle: ['Jasmine sambac', 'Damask rose essence', 'Jasmine grandiflorum'],
    base: ['Sambac jasmine absolute'],
  } },
  { name: 'Mira', slug: 'mira', notes: {
    top: ['Truffle', 'Gardenia', 'Jasmine', 'Bergamot', 'Blackcurrant', 'Ylang-ylang', 'Mandarin orange'],
    middle: ['Orchid', 'Spicy notes', 'Fruity notes', 'Lotus flower'],
    base: ['Vanilla', 'White musk', 'Mexican chocolate', 'Patchouli'],
  } },
  { name: 'Raya', slug: 'raya', notes: {
    top: ['Blackcurrant', 'Lavender', 'Mandarin orange'],
    middle: ['Orange blossom', 'Jasmine'],
    base: ['Madagascar vanilla', 'Musk', 'Cedar', 'Ambergris'],
  } },
  { name: 'Sutra', slug: 'sutra', notes: {
    top: ['Nutmeg', 'Cinnamon', 'Bergamot'],
    middle: ['Tuberose', 'Mahonial', 'Dates', 'Praline'],
    base: ['Vanilla', 'Tonka bean', 'Amberwood', 'Myrrh', 'Benzoin', 'Akigalawood'],
  } },
  { name: 'Vaanan', slug: 'vaanan', notes: {
    top: ['Marine accord', 'Grapefruit', 'Mandarin orange'],
    middle: ['Bay leaf', 'Jasmine'],
    base: ['Patchouli', 'Ambergris', 'Guaiac wood', 'Oakmoss'],
  } },
] as const satisfies readonly Fragrance[];

export const soundLayers = [
  { fragrance: 'Top notes', music: 'Treble', description: 'The first impression, paired with treble’s brightness and detail.', cycles: 10 },
  { fragrance: 'Heart notes', music: 'Mids', description: 'The perfume’s character, paired with the body and tone of mids.', cycles: 5 },
  { fragrance: 'Base notes', music: 'Bass', description: 'The lasting foundation, paired with the depth and weight of bass.', cycles: 2 },
] as const;

export const story = {
  overview: {
    context: 'Online shoppers cannot smell a perfume before buying. Amodira’s royal theme and fixed collection of eight perfumes gave me a clear scope to explore scent through sound.',
    role: 'I led concept development and interaction design, creating all eight tracks using AI.',
    decision: 'I matched sound to fragrance notes and mood, then simplified the frequency chart after usability testing.',
    outcome: 'The feature became the second-most interacted element on perfume product pages, after the Back button.',
  },
  problem: {
    title: 'Eight perfumes. Eight distinct characters.',
    body: 'The challenge was to convey what made each perfume different. Each soundtrack would draw on its fragrance notes and royal story to give shoppers a sense of its character.',
  },
  concept: {
    title: 'A perfume is more than its notes',
    body: 'Pictures and video set the scene. A note list might name lavender, but knowing that smell doesn’t tell you how Raya’s blend comes together. I used sound to interpret a perfume’s notes and royal story, aiming to evoke its character and mood.',
    storytelling: {
      title: 'Royal stories, made personal',
      body: 'The story behind each perfume shaped its soundtrack, too. For Vaanan, heading into battle became a feeling of courage and resolve — something a wearer could carry into their day at work.',
      track: { name: 'Vaanan', slug: 'vaanan' },
      flow: [
        { label: 'Royal story', title: 'Heading into battle' },
        { label: 'Feeling', title: 'Courage and resolve' },
        { label: 'Everyday moment', title: 'Wearing the scent to work' },
      ],
    },
  },
  soundProfile: {
    title: 'A direction we didn’t take',
    body: 'The graph showed each musical layer’s intended emphasis. In usability sessions with women on our floor, we found that it needed explanation before people could understand it. I left it out of V1.',
  },
  soundtracks: {
    title: 'Listen to the collection',
    body: 'I created eight distinct soundtracks, each interpreting a perfume’s fragrance notes, royal character and mood.',
  },
  iteration: {
    title: 'A simpler widget to test the concept',
    body: 'The concept still needed validation through a V0 pilot. Removing the graph simplified the widget and gave three short explanations more visual prominence: how the music’s pacing, undertones and melodies connect to the perfume’s character and mood.',
  },
  impact: {
    title: 'The second-most interacted element',
    body: 'On Amodira’s perfume product pages, Sound of the Scent ranked just behind the Back button.',
  },
  reflection: {
    title: 'Test the explanation, too',
    body: 'The mapping guided my creative choices, but the graph needed too much explanation. I learned to make the emotional connection clear and test the concept before adding detail.',
  },
};
