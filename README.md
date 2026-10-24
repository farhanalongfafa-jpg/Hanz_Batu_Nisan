# HANZ Batu Nisan

Malay-first cinematic product website built with Next.js, React, TypeScript and GSAP ScrollTrigger. English is fully translated and persists in local storage. Source repository: https://github.com/farhanalongfafa-jpg/Hanz_Batu_Nisan

## Run

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

Production is a static export in `out/`. Node 22+ recommended. Development uses `.next-dev` so production builds do not corrupt the preview cache. `scripts/dev.mjs` accepts managed preview port arguments.

## Deploy

Cloudflare Pages: connect this GitHub repository, use build command `npm run build`, output directory `out`, Node 22+. No server functions or secrets are required. A Sites deployment is also configured in `.openai/hosting.json`. Do not change its project ID for updates.

## Content and contact

Edit `lib/content.ts` for all Malay/English copy, model names and the confirmed WhatsApp destination **601170171942**. No environment variables needed. The three collections and four finish preferences are concepts, not verified stock. Confirm dimensions, stone supply, commercial terms and installation coverage before making specific availability claims. No invented pricing, turnaround promises or testimonials.

## Enquiries

Model, finish, script, text alignment, ornament, single/pair quantity, inscription and dates feed a local summary. The form validates name, phone and consent. Review opens a summary; **it does not submit a request**. A separate WhatsApp link opens a prefilled message to the confirmed business number. The visitor must press Send in WhatsApp. A UTF-8 text download provides a fallback. Nothing is sent to a server by the form. Do not replace this with a fake success toast. An optional future CRM integration should add server-side validation, consent records, spam protection and true delivery status.

## Visual assets

All product imagery was generated from scratch with ChatGPT image generation; supplied reference photos are not published. Optimised WebP files are in `public/images/`; `og.jpg` is a resized derivative of the generated macro image. Original generation prompts and provenance: `docs/ASSETS.md`. Blank stone faces intentionally avoid fabricated Arabic or religious text; the preview overlays the visitor's own text as HTML. The preview represents layout, not a fabrication proof or a physical finish simulation.

Fonts: Panchang Bold and Switzer Regular from Indian Type Foundry / Fontshare, self-hosted. See `docs/FONTS.md`.

## Motion and accessibility

Six compositions share one native-scroll pinned stage: arrival, form, macro, three-model reveal, name and action. Transforms occur only on child layers. Mobile has independent positions and shorter pacing. GSAP matchMedia reverts on changes. Reduced-motion preference and the footer control remove pinning and show the full narrative in reading order. Semantic controls, input labels, keyboard focus, a skip link and a persistent mobile enquiry action are included. Form choices stay intact when switching language; personal data is not persisted across reloads.

## Validation

See `docs/QA.md` for executed checks and remaining real-device validation. The project does not use WebGL, GLB, external video or tracking scripts.
