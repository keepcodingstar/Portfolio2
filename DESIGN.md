---
name: Sameer Kapil — The Altitude Journey
description: A cinematic product-design portfolio read through frosted cockpit glass — one continuous atmosphere, instrument-grade precision.
colors:
  airglow-cyan: "#2bb6d6"
  horizon-teal: "#0f6e8e"
  ion-halo: "#5ad1ee"
  aurora: "#1fc6a6"
  midnight-slate: "#122031"
  ink-soft: "#38485b"
  ink-dim: "#5f7184"
  ink-light: "#f4f7ff"
  space-base: "#000004"
  field-emerald: "#1a5e51"
typography:
  display:
    fontFamily: "Awesome Serif, 'Times New Roman', Georgia, serif"
    fontSize: "clamp(2.4rem, 7vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Awesome Serif, 'Times New Roman', Georgia, serif"
    fontSize: "clamp(1.6rem, 3vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, 'SF Mono', 'JetBrains Mono', 'Cascadia Code', monospace"
    fontSize: "0.66rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.22em"
rounded:
  sm: "2px"
  md: "11px"
  lg: "18px"
  xl: "20px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 5rem)"
components:
  glass-panel:
    backgroundColor: "#ffffff8c"
    rounded: "{rounded.lg}"
  eyebrow-label:
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
  link-connect:
    textColor: "{colors.midnight-slate}"
    typography: "{typography.body}"
  link-connect-hover:
    textColor: "{colors.horizon-teal}"
  metric-readout:
    textColor: "{colors.airglow-cyan}"
    typography: "{typography.display}"
---

# Design System: Sameer Kapil — The Altitude Journey

## 1. Overview

**Creative North Star: "The Atmosphere"**

One continuous sky. The whole site is a single descent through altitude — you rise into **space** (the creative, off-grid, 0→1 side), land on the **sky** (who Sameer is now), and descend through the **work** (the shipped, measured proof) to the **ground** (a grassland footer, roots and contact). Nothing changes between zones except the *light*: the same air, recoloured. The page is read through frosted cockpit-canopy glass, and a single cool ion/aurora accent carries both the structure and the numbers — serif numerals glow like an altimeter readout.

The system holds two registers in deliberate tension, never averaged into a safe middle: **cinematic atmosphere** (the immersive sky, the WebGL cloud curtain, the black-hole apex) and **instrument-grade precision** (HUD mono labels, tabular-numeral readouts, ruled work rows). Atmosphere sets the mood; the instrumentation makes it credible. The expressive space floats off-grid and weightless; the work below is ruled, right-aligned, and measured. The contrast itself is the argument.

This system explicitly rejects: the **templated portfolio** (Framer/Webflow template look, dribbble-clone card grids, "available for work" badge clichés), the **corporate SaaS dashboard** (cold, gridded, enterprise), **sparse say-nothing minimalism** (whitespace as a substitute for a point of view), and the **loud over-animated agency site** (motion that performs instead of revealing). Immersion exists only to pull a reader deeper into the work — the moment it slows reading, it has failed.

**Key Characteristics:**
- One cool ion/aurora accent for both structure and data — no second hue competing.
- Ink *inverts* by altitude: dark on the bright sky/ground, light in the black space band.
- Frosted "cockpit-canopy" glass as the recurring surface material.
- A mono face used strictly as instrument labelling, never as body or display.
- Custom serif display + system Helvetica Neue body; warmth is banished from the neutrals.
- Every animation has a `prefers-reduced-motion` resolve.

## 2. Colors

A single cool ion/aurora family carries the entire system; the only true neutrals are a deep-sea ink ramp and the black of space, with one emerald reserved for the literal ground.

### Primary
- **Airglow Cyan** (#2bb6d6): the live accent — the italic emphasis word, the metric numerals, focus rings, selection. The voice of the brand. Reserved; never a fill for large areas.
- **Horizon Teal** (#0f6e8e): the deep, AA-safe ion-teal. Used for accent text and link-hover **on the bright sky/ground**, where Airglow Cyan would be too light to pass contrast.
- **Ion Halo** (#5ad1ee): the bright cyan reserved for the **dark space band** and for glows/halos (the altimeter-glow on the space headline, the grassline airglow in the footer).
- **Aurora** (#1fc6a6): the teal-green pole of the accent, used at the start of the `--auroral` gradient (`Aurora → Airglow Cyan → #2f86d6`).

### Tertiary
- **Field Emerald** (#1a5e51): the cool grassland of the ground/footer — a cold, ion-aligned green (never a warm spring green), with deeper steps (#134f47, #103f3a) for the near blades.

### Neutral
- **Midnight Slate** (#122031): default ink across the bright bands (sky, work, ground). Soft (#38485b) and dim (#5f7184) steps carry secondary and label text.
- **Sky Ink Light** (#f4f7ff): ink in the **space band**, where the page goes black and the ramp flips light (soft #c9d2e8, dim #98a4c4).
- **Space Base** (#000004): the body backdrop — near-black space the atmosphere layers sit on top of.

### Named Rules
**The One Voice Rule.** A single ion/aurora family carries *both* structure and the numbers. There is no second accent hue. Its consistency is what makes the readouts read as instrumentation rather than decoration.

**The Light-Flips Rule.** Ink is dark by default (most of the journey is bright). The space band re-declares the ink ramp light. Never hardcode a text colour; always use `--ink` / `--ink-soft` / `--ink-dim` so a section inherits the right polarity for its altitude.

**The AA-By-Altitude Rule.** On bright bands, accent text uses **Horizon Teal (#0f6e8e)**, never Airglow Cyan — the bright cyan only clears contrast against the dark space band. Large metric numerals on bright backgrounds must be verified to ≥3:1.

## 3. Typography

**Display Font:** Awesome Serif (with Times New Roman / Georgia fallback)
**Body Font:** Helvetica Neue (with Helvetica / Arial)
**Label/Mono Font:** `ui-monospace` stack (SF Mono / JetBrains Mono / Cascadia Code)

**Character:** A refined, high-contrast serif for everything expressive (headlines, case titles, the glowing metric numerals), set against a plain, honest Helvetica Neue for reading — the pairing is contrast-axis (serif + grotesque), not two similar sans. The mono is a third, functional voice: cockpit instrumentation.

### Hierarchy
- **Display** (400, `clamp(2.4rem, 7vw, 5.4rem)`, line-height 1.0, -0.02em): zone headlines — "Made for the *feel* of them.", "Let's make the numbers *move*." Italic accent word in Airglow/Ion for emphasis.
- **Title** (400, `clamp(1.6rem, 3vw, 2.6rem)`, line-height 1.1): case-study titles and orbit-experiment names in the serif.
- **Body** (400, 18px, line-height 1.6): all reading copy in Helvetica Neue. Cap measure at 65–75ch.
- **Label** (500, 0.66rem, letter-spacing 0.22em, UPPERCASE, mono): eyebrows, designations, altimeter/HUD labels, colophon, side-nav.

### Named Rules
**The Instrument-Label Rule.** The mono face is for readouts and labels *only* — eyebrows, designations, nav, metadata. It is **never** body copy and never a display headline. Mono-as-body would read as costume.

**The Glowing-Numeral Rule.** Metrics are set in the serif display with `tabular-nums`, right-aligned, and lit in the ion accent — a gauge reading, not a hero-metric SaaS card.

## 4. Elevation

Depth is **atmospheric, not stacked.** There is no conventional drop-shadow card-elevation system. Surfaces are sheets of frosted cockpit-canopy glass sitting over a live, moving sky; separation comes from blur, translucency, a long soft contact shadow, and ion glow — not from hard shadows on opaque cards. The black-hole halo, the altimeter-glow on the space headline, and the grassline airglow are all the same idea: light bleeding through atmosphere.

### Shadow Vocabulary
- **Canopy lift** (`box-shadow: 0 18px 48px -22px rgba(14,29,49,0.45), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 0 0 1px rgba(43,182,214,0.06)`): the glass-panel shadow — a long diffuse drop plus an inner top highlight and a barely-there ion inner edge. The single elevation primitive.
- **Glow halo** (radial ion/aurora gradients, blurred): atmospheric light (black-hole ring, headline glow, footer grassline). Decorative-structural, not a shadow.

### Named Rules
**The Canopy Rule.** If a surface needs separation, it gets frost (blur + translucency + the Canopy-lift shadow) over the live atmosphere — never an opaque card with a hard shadow. A 2014-style dark drop-shadow on a solid card is forbidden here.

## 5. Components

Components are **instrument-grade**: precise, frosted, luminous. They read like aircraft instrumentation laid over a sky.

### Glass Panel (signature surface)
- **Corner Style:** 18px (`{rounded.lg}`); the ground contact block uses 20px.
- **Background:** `rgba(255,255,255,0.55)` frosted (`backdrop-filter: blur(16px) saturate(1.5)`); opaque `rgba(243,249,254,0.92)` fallback where backdrop-filter is unsupported.
- **Elevation:** the Canopy-lift shadow (see Elevation).
- **Space-band variant:** background drops to `rgba(255,255,255,0.05)` with a light hairline border when the ink flips light.

### Links / CTAs
- **Style:** text links, no button chrome. Default Midnight Slate; hover transitions to Horizon Teal with a small arrow (`↗`) that nudges on hover.
- **Emphasis CTA:** an italic serif word underlined in Airglow Cyan (`text-decoration-color: var(--ion)`, 2px, offset) — e.g. "numbers that *move*." Emphasis via the serif + accent underline, **not** a filled button.

### Work Case Rows (signature)
- **Style:** full-width ruled rows (hairline `--rule`), serif title left, mono kicker, and a right-aligned tabular-numeral metric in the ion accent that counts up (odometer).
- **Hover:** a fine progress bar / stretch transition on `cubic-bezier(0.22, 1, 0.36, 1)`; the whole row is the link to the case study.

### Navigation (glass side-rail)
- **Style:** a fixed left glass rail with a brand mark and mono HUD labels (SPACE / SKY / WORK / GROUND), 11px-radius marks, ion active dot. Jumps to any zone via centre-anchored scroll.
- **States:** active zone gets the ion dot + brighter label; hover lifts the label opacity.

### Eyebrow / Designation Labels
- **Style:** mono, 0.66rem, 0.22em tracking, uppercase, `--ink-dim`. Altitude-themed copy ("OUT PAST THE FUNNEL", "ON THE GROUND · ROOTS & CONTACT"), not generic kickers.

### Grassland Footer (signature)
- **Style:** a cool emerald field rising from the bottom (`{colors.field-emerald}` + deeper steps), a layered SVG blade silhouette with four foreground blades that sway (CSS, reduced-motion-stilled), and an Ion-Halo airglow on the grassline. Colophon text relit light to read on the dark grass.

## 6. Do's and Don'ts

### Do:
- **Do** carry both structure and data on the single ion/aurora family. One voice.
- **Do** drive all text colour through `--ink` / `--ink-soft` / `--ink-dim` so each band inherits the correct light/dark polarity.
- **Do** use **Horizon Teal (#0f6e8e)** for accent text on bright bands and reserve **Airglow Cyan / Ion Halo** for the dark space band and glows.
- **Do** set metrics in the serif with `tabular-nums`, right-aligned, lit in ion — an altimeter readout.
- **Do** keep the mono face to instrument labels only.
- **Do** give every animation a `prefers-reduced-motion` resolve (static, readable end-state).
- **Do** let immersion serve reading: atmosphere and motion must pull the eye *toward* the work, never cover it.

### Don't:
- **Don't** ship the **templated portfolio** look — Framer/Webflow template grids, dribbble-clone card walls, "available for work" badge clichés.
- **Don't** drift toward a **corporate SaaS dashboard** — cold gridded enterprise surfaces.
- **Don't** mistake **sparse minimalism** for restraint; whitespace is not a point of view.
- **Don't** let motion become a **loud over-animated agency** reel; no scroll-jacking, no effect that obstructs the work.
- **Don't** use `border-left` / `border-right` greater than 1px as a colored accent stripe (the AI "side-tab" tell — currently present at `app/work/work.css:492`, to be rewritten).
- **Don't** introduce warm-default neutrals (cream/sand/paper); this system's neutrals are cool deep-sea ink and the black of space. Warmth is forbidden.
- **Don't** put mono on body copy, or set a display headline in mono.
- **Don't** place an opaque card with a hard 2014-style drop shadow; surfaces are frosted glass over live atmosphere.
- **Don't** repeat the uppercase mono eyebrow as reflexive per-section scaffolding; it earns its place only as altitude-narrative HUD labelling.
