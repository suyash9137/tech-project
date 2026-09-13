# Master Prompt — Futuristic Redesign of Polaris Technologies

**How to use this:** paste this whole prompt into an agentic coding session (e.g. Claude Code) that has the **Figma MCP server** and **Playwright MCP server** connected, pointed at the Polaris Technologies repo/site (`polaristechnologies.vercel.app`). It's written as a single brief the agent can execute end-to-end, phase by phase, checking in with you at the marked checkpoints.

> Note on current-state analysis: the live site is a client-rendered app, so a plain fetch only surfaces the `<title>` ("POLARIS TECHNOLOGIES — AI, SaaS & Digital Engineering") and meta description ("intelligent digital products, AI automation systems, SaaS platforms, and high-performance web experiences"). Everything else — actual layout, copy, current palette, component structure — needs to come from Phase 0 below, run live in the agent's own environment.

---

## Role

You are the design lead and frontend engineer for Polaris Technologies, a two-person IT studio (AI integration, SaaS products, web development) targeting both Indian and international (US) clients. You're redesigning their own marketing site to look and feel like the most technically credible, forward-looking studio in the room — not a generic "AI startup" template. Treat this as a paying client brief you've been hired to make distinctive: no cliché AI-site defaults (see Phase 2 "anti-patterns" — avoid them explicitly).

---

## Phase 0 — Audit the live site (Playwright MCP)

Before designing anything, use Playwright to actually see what exists:

1. Navigate to `https://polaristechnologies.vercel.app/` at three viewports: 1440×900 (desktop), 834×1194 (tablet), 390×844 (mobile).
2. Screenshot every section, full-page, at each viewport.
3. Extract the DOM structure and computed styles for: color palette in use, font families/sizes, spacing scale, breakpoints, existing components (nav, hero, cards, footer, CTAs).
4. Pull the accessibility tree — note heading hierarchy, missing alt text, focus order, contrast issues.
5. Record actual copy: hero headline, subhead, section titles, service descriptions, CTA labels, footer content. Don't invent placeholder copy where real copy exists — reuse and sharpen it.
6. Run a quick performance pass (Playwright's tracing or a Lighthouse run if available): note bundle weight, largest contentful paint, any obviously unoptimized assets (unminified images, blocking fonts).
7. Summarize findings in a short audit note (palette hex values found, type stack, layout grid, load-time baseline, biggest structural weaknesses) before moving on.

**Checkpoint:** show me the audit summary and screenshots before proposing a design direction.

---

## Phase 1 — Design direction (token system)

Using the audit and the brand facts (AI + SaaS + digital engineering, dual India/US audience, small high-craft team, not a large agency), produce a compact design plan — don't skip to code:

- **Color:** 4–6 named hex values forming the core palette. This is a "futuristic" brief, but futuristic should come from *this* subject (precision engineering, orbital/navigation naming, signal/telemetry, circuitry) rather than a generic look. Consider what "futuristic" means for a technical B2B studio vs. a consumer sci-fi product — likely closer to precision instrumentation and structured data display than neon cyberpunk.
- **Type:** one or two typefaces and their roles (display/headline vs. body vs. any data/label face). Pick something with a technical, engineered character given the founder's engineering-drawing/CAD background — this is a legitimate, specific source of visual language (drafting lines, dimension marks, orthographic grids) rather than a cliché.
- **Layout:** a layout concept in prose + ASCII wireframe for the homepage. Decide alignment (left/center/justified) deliberately and say why. Note where structural devices (rules, grids, coordinate-style labels) are used because they encode real information (e.g. a services grid, a process sequence) — not decoration.
- **Motion:** one deliberate signature moment (e.g. a single orchestrated hero load-in, or a live data/telemetry visualization) rather than fade-up-on-every-section. Motion should answer interaction where possible.
- **Principles:** 3–5 sentences on what makes this specific page unique, not interchangeable with any other AI/SaaS studio site.

### Anti-patterns to explicitly avoid
- Warm cream background + high-contrast serif + terracotta accent (~#D97757).
- Near-black background with a single neon-green or vermilion accent as the entire "futuristic" idea.
- Identical rounded SaaS cards with the same soft grey drop-shadow and gradient-wash decoration.
- Tracked-out ALL-CAPS eyebrow labels above every heading, meta strings joined with middot (`A · B · C`), em-dash titles (`WORD — fragment`), a monospace face slapped on for "tech" flavor, arrows (`→`) appended to every link.
- Numbered markers (01/02/03) unless the content is genuinely a sequence.

**Checkpoint:** present the token system (palette swatches, type samples, wireframe) and get sign-off before building. If Figma is where you want to review this visually, do Phase 1.5 first.

---

## Phase 1.5 — Visualize the direction in Figma (Figma MCP)

1. Create a new Figma file (or a page inside the existing Polaris file, if one exists) for "Futuristic Redesign — [date]".
2. Build a token/style page: color swatches with hex + names, type scale samples, spacing scale, and 2–3 hero-section concept frames at desktop width reflecting the Phase 1 plan.
3. If Figma component libraries or existing brand assets already exist in the file, pull and reuse them via the MCP rather than redrawing from scratch.
4. Export the chosen hero concept frame as an image and share it back before implementation, so the direction is approved visually, not just described.

**Checkpoint:** get explicit approval on one hero concept frame before writing code.

---

## Phase 2 — Build

1. Implement in the existing stack (Next.js on Vercel — confirm framework/version from the repo; match it rather than introducing a new one unless there's a good reason).
2. Follow the approved token system exactly: CSS variables/theme config for color, type, spacing — no ad hoc one-off values.
3. Rebuild section by section: nav → hero → services → process/proof (case studies, stack, whatever real content exists) → CTA → footer. Reuse real copy from the Phase 0 audit; only write new copy where a section genuinely needs it, in the site's voice (plain, active, specific — see writing guidance below).
4. Copywriting rules: active voice, name things the way a visiting client would understand them (not internal jargon), no filler adjectives, CTAs say exactly what happens ("See our work," not "Learn More").
5. Respect: responsive down to 360px, visible keyboard focus states, `prefers-reduced-motion` respected, color contrast passes WCAG AA, semantic heading order.
6. Watch CSS specificity conflicts between section-level and element-level selectors, especially around section spacing/padding.

---

## Phase 3 — QA loop (Playwright MCP)

1. Screenshot the new build at the same three viewports used in Phase 0, section by section.
2. Diff mentally (or via Playwright visual comparison if configured) against the Phase 1 approved Figma frames — flag any drift.
3. Re-run the accessibility tree check; confirm the Phase 0 issues are fixed and no new ones introduced.
4. Re-run a performance pass; confirm load time/bundle weight improved or held steady versus the Phase 0 baseline.
5. Click through all interactive elements (nav, CTAs, forms, any motion triggers) headlessly to confirm nothing is broken.
6. Self-critique against the Phase 1 principles: is there one memorable, deliberate moment, with everything else quiet and disciplined? Cut anything that doesn't serve the brief — "remove one accessory" before calling it done.

**Checkpoint:** present before/after screenshots at all three viewports plus the audit-vs-final comparison (performance, accessibility, palette/type) as the final deliverable.

---

## Deliverables checklist
- [ ] Phase 0 audit note + screenshots (current state, 3 viewports)
- [ ] Phase 1 token system (palette, type, layout wireframe, motion, principles)
- [ ] Figma file/page with approved hero concept
- [ ] Rebuilt site matching the approved direction, real copy preserved/sharpened
- [ ] Phase 3 QA report: before/after screenshots, accessibility diff, performance diff
