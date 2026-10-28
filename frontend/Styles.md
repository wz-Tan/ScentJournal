# ScentJournal: Design README (colours and fonts)

Paste this file at the start of a new conversation so Claude can follow the same visual rules.

## Project context

- **ScentJournal**: a perfume lookup site, similar to Fragrantica. The first page is a browsable list of all scents.
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS v4.
- **Backend:** Go (chi router) at `http://localhost:8080`, Postgres via pgx.
- **Tailwind v4 syntax is in use:** `font-(family-name:--font-josefin-sans)`, `aspect-3/4`, `min-h-13`.

## Core rule

**Black and white are the base and text colours. The four browns are accents only.**

Never use a brown as a large page background or as the main text colour. Do not introduce new colours without asking.

## Colour palette

### Neutrals (base and text)

| Role | Hex / class | Use |
| --- | --- | --- |
| White | `#FFFFFF` (`bg-white`) | Page, header, cards, search bar, dropdown |
| Black | `#111111` | Headings, names, input text, logo |
| Secondary text | `text-neutral-600` | Gender line, counts, labels |
| Placeholder text | `text-neutral-500` | Input placeholder |

### Browns (accents)

| Name | Hex | Use |
| --- | --- | --- |
| Peach | `#FFDBBB` | Placeholder image background, search focus ring, loading skeleton (`bg-[#FFDBBB]/50`) |
| Taupe | `#CCBEB1` | All borders: header bottom line, cards, search bar, sort dropdown, dashed empty states |
| Mid brown | `#997E67` | Hover states (links, card border), search icon, focus border |
| Dark brown | `#664930` | House name on cards, bottle icon, error text. The accent for small text |

### Contrast notes (approximate, on white)

- `#111111`: very high (about 18:1). Good for any text.
- `#664930`: about 8:1. Fine for small text.
- `#997E67`: about 3.8:1. **Only for hover states, icons, borders and large text.** Do not use it for small body text.
- `#664930` on `#FFDBBB`: about 6:1. Fine.

### Optional Tailwind v4 theme tokens (`globals.css`)

```css
@theme inline {
  --color-peach: #FFDBBB;
  --color-taupe: #CCBEB1;
  --color-mocha: #997E67;
  --color-espresso: #664930;
}
```

This allows `border-taupe`, `hover:text-mocha`, `bg-peach`, and so on, instead of hex values.

## Fonts

All fonts are loaded with `next/font/google` in `app/layout.tsx`. Each font's CSS variable is added to the `<html>` className.

| Font | Variable | Weights | Where it is used |
| --- | --- | --- | --- |
| **Fleur De Leah** (script) | `--font-fleur-de-leah` | 400 only | Logo / header wordmark |
| **Josefin Sans** | `--font-josefin-sans` | 300 to 700 (variable font) | Tagline, perfume cards, search and sort UI |
| Geist Sans / Geist Mono | `--font-geist-sans`, `--font-geist-mono` | n/a | Defaults from the Next.js template |

Notes:

- **Fleur De Leah** only comes in weight 400, so never add `font-semibold` or `font-bold` (the browser would fake a bold). It is a script font with a small x-height, so it needs a larger size (about `text-[36px]`) than normal text.
- **Josefin Sans** is a variable font. Declare it once without a `weight` and use Tailwind's `font-light` and `font-bold`.
- On the card: house name is `font-light` (uppercase, wide tracking), scent name is `font-bold`, gender line is `font-light`.
- Usage in Tailwind v4: `font-(family-name:--font-josefin-sans)`.

## Layout

- Page content margins: `mx-6 md:mx-24` (matches the header's `mx-24` on desktop).
- Page order: header, tagline, search bar, results section.
- Tagline: "Your One-Stop Fragrance Platform", Josefin Sans `font-light`, `text-4xl md:text-6xl`, centred, `#111111`.
- Search bar: pill shape (`rounded-full`), `border-[#CCBEB1]`, focus border `#997E67` plus ring `#FFDBBB`, `max-w-xl`, centred.
- Results header: scent count on the left, "Sort by" dropdown on the right. Sort options: Name (A-Z), Name (Z-A), House (A-Z), Newest first.
- Results grid: auto-fill so card size stays consistent, for example `grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4` (tune the `160px` to change card size).
- Loading state: pulsing peach skeleton cards. Error and empty states: dashed taupe border box.

## Scent card (thumbnail only)

Shows only: **image, house, name, gender.** No accords, year or collection on the card.

- Container: `rounded-xl` or `rounded-2xl`, `border-[#CCBEB1]`, white background, hover: border `#997E67` plus `hover:shadow-md`.
- Image: portrait `aspect-3/4` (source photos are 375x500), white background, `object-contain` with padding so bottles are never cropped.
- No photo: peach (`#FFDBBB`) background with a stroked bottle icon in `#664930`.
- Text: house in `#664930`, name in `#111111`, gender in `text-neutral-600` with `capitalize`. Use `truncate` so cards stay an even height.

## Header

- White background, bottom border `#CCBEB1`, content `mx-24`.
- Left: bottle icon (stroke `#664930`) plus "ScentJournal" in Fleur De Leah, black, hover `#997E67`.
- Nothing on the right for now.

## Data (Go `Scent` struct, sent to the frontend as camelCase JSON)

`scentId`, `name`, `year`, `gender`, `photoUrl`, `house`, `collection`, `accords` (map of accord name to number).

The list page only uses `scentId`, `name`, `house`, `gender` and `photoUrl`.

## Images

- All photos currently come from `fimgs.net`, allowed in `next.config` via `images.remotePatterns` (`pathname: "/mdimg/**"`).
- The sample data comes from Fragrantica. This is fine for local development, but plan to use your own or licensed images and data before launching publicly.

## Open decisions

- Final card size (adjust the `minmax(160px, 1fr)` value).
- Whether the image area should stay pure white or use a very light peach (for example `#FFF8F1`).
- Whether gender labels should read "Female / Male / Unisex" or "Women / Men / Unisex".
- Whether the logo stays in Fleur De Leah (script) or changes to a clean uppercase sans.

## Rules for Claude when working on this project

1. Follow the core rule: black and white for base and text, browns for accents only.
2. Reuse the exact hex values above. Ask before adding a colour.
3. Use Tailwind v4 syntax and the existing font variables.
4. Keep the card minimal: image, house, name, gender.
5. Give copy-paste code (React/Next.js + Tailwind), not downloadable files.
