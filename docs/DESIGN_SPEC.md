# Design Spec — CC Forms & Apps Portal

## 1. Layout Overview (Landscape Tablet)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [CC Logo]                          Apps & Forms                     │
├─────────────────────────────────────────────────────────────────────┤
│  WHAT'S NEW                                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                 │
│  │ icon │  │ icon │  │ icon │  │ icon │  │ icon │  → (scroll)      │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘                 │
│   Label     Label     Label     Label     Label                     │
├─────────────────────────────────────────────────────────────────────┤
│  MOST POPULAR                                                        │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │ icon │  │ icon │  │ icon │  │ icon │  │ icon │  │ icon │      │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘      │
│   Label     Label     Label     Label     Label     Label           │
│                                                                      │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │ icon │  │ icon │  │ icon │  │ icon │  │ icon │  │ icon │      │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘      │
│   Label     Label     Label     Label     Label     Label           │
└─────────────────────────────────────────────────────────────────────┘
```

## 2. Grid & Spacing

| Token | Value | Notes |
|-------|-------|-------|
| Page padding | 40px | All sides |
| Section gap | 32px | Between What's New and Most Popular |
| Icon size | 120px × 120px | Scales up to 150px on larger tablets |
| Icon corner radius | 26px | Matches iOS icon shape (~21.5% of size) |
| Icon gap (grid) | 24px | Horizontal and vertical |
| Label font size | 13px | Below each icon |
| Label max width | 120px | Truncate with ellipsis if longer |

## 3. Typography

| Element | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| Section heading | System sans-serif (Inter / SF Pro fallback) | 700 | 20px | #FFFFFF |
| Icon label | Same | 400 | 13px | #E0E0E0 |
| Page title | Same | 600 | 24px | #FFFFFF |

## 4. Colors

| Role | Value |
|------|-------|
| Page background | #000000 |
| Section heading | #FFFFFF |
| Icon label | #E0E0E0 |
| Icon placeholder bg | brand color or #1C1C1E |
| Hover/focus ring | #FFFFFF 50% opacity, 3px offset |

## 5. Icon Component

```
┌────────────────────┐
│                    │  ← 120×120, border-radius: 26px
│      [image]       │  ← object-fit: cover
│                    │
└────────────────────┘
      App Name          ← centered, 13px, max 1-2 lines
```

- On hover (desktop): subtle scale(1.05) + glow ring.
- On tap (touch): quick opacity pulse.
- Entire component is an `<a>` wrapping the icon and label.

## 6. What's New Section

- Horizontal scroll row (overflow-x: auto, snap).
- Shows a "new" badge (small dot or ribbon) on each icon.
- Max 8 items; if fewer than 5, row doesn't scroll.

## 7. Responsive Behavior

| Breakpoint | Behavior |
|-----------|----------|
| ≥ 1024px (landscape tablet+) | Full grid, 6 columns |
| 768–1023px (portrait tablet) | 4–5 columns, reduced padding |
| < 768px (phone) | 3 columns, stacked layout, smaller icons (90px) |

## 8. Tech Stack (Proposed)

- **HTML/CSS/JS** — vanilla or with a minimal build step (Vite).
- **CSS**: Custom properties for theming, CSS Grid for layout.
- **Data**: `bookmarks.json` config file listing all apps.
- **Build/Deploy**: Vite static build → Vercel.

## 9. File Structure (Planned)

```
/
├── public/
│   ├── icons/          ← app icon images
│   └── logo.svg        ← CC logo
├── src/
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   ├── scripts/
│   │   └── main.js     ← reads bookmarks.json, renders grid
│   └── data/
│       └── bookmarks.json
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── REQUIREMENTS.md
│   └── DESIGN_SPEC.md
├── package.json
├── vite.config.js
└── vercel.json
```

## 10. Open Questions

1. Does CC have a brand font, or should we use system fonts?
2. Should "What's New" items auto-rotate out after a time, or be manually curated?
3. Any existing brand guidelines or color palette beyond the black background?
4. Preferred icon source — will CC supply custom PNGs, or use generic/generated icons?
