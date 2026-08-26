# Requirements — CC Forms & Apps Portal

## Functional Requirements

### FR-1: App Icon Bookmarks
- Each bookmark is rendered as a rounded-square icon (Apple App Store proportions: ~60px corner radius on a ~120–180px square at tablet scale).
- Tapping/clicking an icon opens the target URL (in a new tab by default).
- Each icon displays:
  - An icon image or colored placeholder with initials.
  - A label beneath the icon with the app/form name.

### FR-2: Sections
- **What's New** — a horizontally scrollable or short grid row at the top showcasing newly added bookmarks.
- **Most Popular** — a larger grid section below showing the most-used bookmarks.
- Additional sections (e.g., "All Apps", category groups) can be added later.

### FR-3: Header
- Displays the Common Collabs logo (centered or left-aligned).
- Optional tagline or page title ("Apps & Forms").

### FR-4: Navigation (minimal)
- Single page — no routing required.
- Smooth scroll or anchor links between sections if the page grows.

---

## Non-Functional Requirements

### NFR-1: Tablet-First, Landscape Layout
- Primary target: iPad in landscape (1024×768 logical px and above).
- Must remain usable on portrait tablets and desktop browsers.
- Touch-friendly tap targets (minimum 44×44 px).

### NFR-2: Visual Design
- Background: solid black (#000000 or near-black).
- Icons and text should contrast clearly (white/light text, vibrant icon colors).
- Minimal UI chrome — let the icons be the focus.

### NFR-3: Performance
- First Contentful Paint < 1.5 s on a typical WiFi connection.
- Total page weight < 500 KB (excluding external icon images if hosted elsewhere).
- No heavy JS frameworks unless justified.

### NFR-4: Deployment
- Vercel-compatible (static export or supported framework).
- Environment: Production branch auto-deploys on push.
- Custom domain support via Vercel DNS settings.

### NFR-5: Accessibility
- All icons have accessible labels (alt text / aria-label).
- Keyboard navigable.
- Sufficient color contrast (WCAG AA minimum for text).

### NFR-6: Maintainability
- Bookmark data stored in a simple JSON or JS config file so non-developers can update links easily.
- Clear folder structure and inline comments.

---

## Constraints & Assumptions

- The client will provide icon images; placeholders will be used during development.
- No authentication required — the page is accessible to anyone with the URL (or can be restricted via Vercel password protection if needed).
- No backend or database — purely static content.

---

## Out of Scope (for now)

- Search / filtering.
- User accounts or personalization.
- Analytics (can be added later via Vercel Analytics or a lightweight script).
- Dark/light mode toggle (page is always dark).
