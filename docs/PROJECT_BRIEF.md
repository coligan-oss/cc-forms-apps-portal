# Common Collabs — Forms & Apps Portal

## Overview

A single-page, tablet-optimized web portal for Common Collabs (CC) that presents bookmarks to the company's various forms and applications as Apple App Store–style icons on a black background. The page is designed primarily for horizontal (landscape) iPad/tablet use and will be deployed to Vercel, eventually mapped to CC's custom domain.

## Goals

1. Give CC staff a single launch-pad to access all company forms and apps.
2. Present links as familiar, rounded-square app icons (Apple App Store style).
3. Optimise the layout for landscape tablets (iPad 10.9″ and similar).
4. Keep the experience fast, simple, and visually clean on a black background.
5. Deploy to Vercel with zero-config builds.

## Key Sections (top → bottom / left → right)

| Section | Purpose |
|---------|---------|
| Header | CC logo, page title |
| What's New | Highlighted new or recently added apps/forms |
| Most Popular | Frequently used apps/forms |
| All Apps | Full grid of bookmarks (future expansion) |

## Hosting & Deployment

- Platform: **Vercel**
- Framework: Static HTML/CSS/JS (or lightweight framework TBD)
- Custom domain: To be configured once DNS is ready

## Inputs Needed from Client

- [ ] CC logo file (SVG or high-res PNG preferred)
- [ ] List of bookmark links with:
  - App/form name
  - URL
  - Icon image (or description for placeholder)
  - Category: What's New / Most Popular / Both
- [ ] Brand color palette (if any beyond black background)
- [ ] Custom domain name

## Status

| Phase | Status |
|-------|--------|
| Requirements | In Progress |
| Design | Not Started |
| Implementation | Not Started |
| Deployment | Not Started |
