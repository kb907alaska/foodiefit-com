# Accessibility Statement & Compliance Audit (WCAG 2.2 AA)

## Compliance Overview

Foodie Fit is built to comply with **WCAG 2.2 Level AA** guidelines, ensuring equal usability for individuals with visual, motor, cognitive, or auditory impairments.

---

## Technical Features Implemented

1. **Skip Navigation Link**: Available at top of DOM (`#main-content`) when pressing `Tab` on page load.
2. **Keyboard Navigation & Dialog Traps**:
   - AnnouncementBar, Header Navigation, Mobile Drawer, and Menu Filters are accessible via `Tab`, `Enter`, `Space`, and `Escape`.
   - Focus restoration is handled when closing mobile navigation slideout.
3. **WCAG Color Contrast**:
   - Category tags combine high-contrast text and icons (e.g. Red, Green, Yellow, Blue) to ensure category information is never conveyed by color alone.
   - Text elements maintain a minimum 4.5:1 contrast ratio against dark backgrounds (`#0F1115`, `#181B20`).
4. **Focus Rings**: Universal `:focus-visible` styling (`outline: 2px solid #22C55E; outline-offset: 3px;`).
5. **Screen Reader Support**:
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - SVG icons include `aria-hidden="true"` or `<title>` descriptions.
   - Nutrition information rendered in standard readable text tables with proper `<th scope="col">`.
