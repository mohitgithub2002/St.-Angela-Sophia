# St. Angela Sophia Sr. Sec. School, Jaipur: website

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4.
The layout follows a classic Indian school-site pattern: a dark green toolbar with
contact details and an "Admission Open" button, a white menu bar with dropdowns,
a news ticker, a full-width photo slider, a counter band, and a dark green
footer with a map.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Colour palette and type

Five greens plus white, defined once in `app/globals.css` and available as
Tailwind classes (`bg-moss`, `text-forest`, `border-lichen` …). Headings use
Roboto Slab and body text uses Roboto. The `btn` and `title` utilities in
`globals.css` style every button and section title.

| Token  | Hex     | Used for                                           |
|--------|---------|----------------------------------------------------|
| forest | #0F2A1D | Headings, toolbar, footer, dark bands, hovers      |
| moss   | #375534 | Body text, buttons, icons                          |
| sage   | #6B9071 | Accent words in titles, ticker dots, photo fallback |
| lichen | #AEC3B0 | Borders, accents on dark backgrounds               |
| pista  | #E3EED4 | "Admission Open" badge, chips, soft fills          |
| mint   | #F3F8EC | Light section backgrounds (a lighter pista tint)   |

Only form error messages use red, so they stand out.

## Photos

Every photo slot loads from `public/images/`. Until a file is there, a green
gradient shows instead, so the site never looks broken. Add these files
(landscape JPGs around 1600px wide are best; portraits for `principal.jpg`):

| File | Where it shows |
|------|----------------|
| `slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg` | Hero slider |
| `about.jpg` | About Us |
| `highlight-1.jpg`, `highlight-2.jpg` | Middle column under About |
| `counters-bg.jpg` | Background of the numbers band |
| `facility-library.jpg`, `facility-smart.jpg`, `facility-labs.jpg`, `facility-sports.jpg`, `facility-music.jpg`, `facility-solar.jpg` | Campus cards |
| `principal.jpg` | Principal's message (portrait) |
| `alumni.jpg` | Alumni banner background |

File names and captions are set in `lib/data.ts` and the section components.

## Where to edit content

All text (menu, slides, announcements, counters, timeline, stages, streams, events, news,
contact details) is in `lib/data.ts`. Each section is its own component in
`components/`.

## Before going live

- Add the photos listed above.
- Have the Principal approve or replace the quote in `Principal.tsx`.
- Update the 2027–28 registration dates in `lib/data.ts` and `AgeChecker.tsx`
  once the school announces them.
- The enquiry form opens the parent's email app. To store enquiries on the
  server, add an API route (e.g. `app/api/enquiry/route.ts`) and post to it.
