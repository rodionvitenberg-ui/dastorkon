---
version: alpha
name: Dishoom
description: Dark, editorial restaurant brand system for dishoom.com, combining high-contrast serif typography, restrained outlines, and minimal elevation.
colors:
  primary: "#fffdf9"
  secondary: "#ffefcb"
  accent: "#951401"
  tertiary: "#cba921"
  neutral: "#121212"
  surface: "#1a1a1a"
  on-surface: "#fffdf9"
  error: "#ef4444"
rounded:
  none: "0px"
  sm: "8px"
  md: "8px"
  lg: "9999px"
  xl: "9999px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "48px"
  xl: "100px"
components:
  button:
    primary:
      backgroundColor: "transparent"
      color: "#fffdf9"
      borderColor: "#fffdf9"
      borderRadius: "9999px"
      borderWidth: "1px"
      borderStyle: "solid"
      padding: "6px 10px"
      fontSize: "13px"
      fontWeight: 700
      minWidth: "108px"
      minHeight: "44px"
      textDecoration: "none"
      boxShadow: "none"
      fontFamily: "gill-sans-nova"
    secondary:
      backgroundColor: "transparent"
      color: "#d0d0d0"
      borderColor: "#d0d0d0"
      borderRadius: "9999px"
      borderWidth: "2px"
      borderStyle: "solid"
      padding: "6px 10px"
      fontSize: "13px"
      fontWeight: 700
      minWidth: "108px"
      minHeight: "44px"
      textDecoration: "none"
      boxShadow: "none"
      fontFamily: "cheltenhamBT"
    link:
      backgroundColor: "transparent"
      color: "#fffdf9"
      borderColor: "transparent"
      borderRadius: "0px"
      borderWidth: "0px"
      borderStyle: "none"
      padding: "0px"
      fontSize: "13px"
      fontWeight: 400
      minWidth: "0px"
      minHeight: "0px"
      textDecoration: "none"
      boxShadow: "none"
      fontFamily: "cheltenhamBT"
  card:
    backgroundColor: "#121212"
    borderColor: "#374151"
    borderRadius: "8px"
    borderWidth: "1px"
    borderStyle: "solid"
    padding: "16px"
    boxShadow: "none"
    textColor: "#fffdf9"
---

# Overview

Dishoom.com is a dark, editorial hospitality site with a refined Bombay-inspired tone. The visual language is quiet, cinematic, and text-led: large serif headlines, compact uppercase navigation, thin outlined controls, and very little elevation. Use restrained spacing, high contrast, and warm off-white text on near-black surfaces.

The screenshot confirms a hero-first layout with a centered brand mark, top navigation, a large immersive media panel, and persistent utility actions. Cookie consent appears as a grounded, low-chroma panel with simple outlined actions.

# Colors

Use a near-black background with warm white text as the core contrast pair.

- **Primary / on-surface:** `#fffdf9`
- **Secondary:** `#d0d0d0`
- **Tertiary / border:** `#374151`
- **Neutral / background:** `#121212`
- **Surface:** `#1a1a1a` for raised panels only when needed
- **Error:** `#ef4444` for exceptional destructive states

Guidance:
- Prefer off-white over pure white for typography and strokes.
- Keep chroma low; accent color should not compete with photography.
- Borders are important for buttons, panels, and utility chips.

# Typography

Two type voices are in use:

1. **Cheltenham BT** for editorial content and most on-page text.
2. **Gill Sans Nova** for compact utility labels and primary button emphasis.

Recommended hierarchy:
- **headline-display**: 30px / 30px, weight 400, letter-spacing 2.4px
- **headline-lg**: 26px / 30px, weight 400, letter-spacing 5.4px
- **headline-md**: 23px / 27.93px, weight 400, letter-spacing 4.2px
- **body-lg** and **body-md**: 18px / 27px, weight 400, letter-spacing 0.36px
- **body-sm**: 13px, compact support text
- **label-lg / label-md**: 13px, weight 700, uppercase utility style
- **label-sm**: 13px, lighter utility or metadata use

Rules:
- Headlines should feel spacious and literary, not bold.
- Labels are often uppercase or small-caps-like in appearance, with pronounced tracking.
- Keep body copy line length comfortable; long paragraphs should remain airy.
- Preserve serif fallback behavior if Cheltenham is unavailable.

# Layout

The homepage uses a centered, editorial grid with wide outer margins and a dominant media block.

Recommended layout behavior:
- Use a full-width dark canvas with content centered in a constrained column.
- Keep the masthead/nav fixed in visual priority and aligned horizontally across the top.
- The hero media region should occupy most of the viewport width but not touch edges.
- Primary calls to action appear beneath the hero, centered, and spaced apart.
- Floating overlays such as cookie consent should dock to the lower right with clear padding from edges.

Spacing tokens:
- **xs:** 8px
- **sm:** 16px
- **md:** 32px
- **lg:** 48px
- **xl:** 100px

Use generous vertical spacing between sections; this brand relies on breathing room more than dense stacking.

# Elevation & Depth

Elevation is intentionally minimal.

- Default: no shadows.
- Cards and overlays rely on background contrast and borders, not blur or shadow.
- Cookie and utility panels should feel placed on top through position and tonal separation only.
- If a shadow is required for a new component, keep it effectively imperceptible; the source styleguide specifies `none` across shadow tiers.

# Shapes

Shape language is mostly rectilinear with selective rounding.

- **none:** `0px`
- **sm / md:** `8px`
- **lg / xl / full:** `9999px`

Usage:
- Pills and primary buttons use fully rounded ends.
- Cards use subtle 8px corners.
- Avoid decorative organic shapes; the site is structured and restrained.

# Components

## Button
Buttons are thin-outlined, text-first, and compact.

### Primary button
- Transparent background
- Off-white border and text
- Fully rounded pill shape
- 1px border
- Min size: 108px × 44px
- Used for high-priority actions such as “Book a table”

### Secondary button
- Transparent background
- Light gray border and text
- 2px border
- Fully rounded pill shape
- Slightly more subdued than primary
- Used for supportive actions such as consent controls

### Link button
- No border, no background
- Inline text treatment
- Used for nav or tertiary actions

## Card
Cards are dark, bordered containers with no shadow.

- Background: `#121212`
- Border: `1px solid #374151`
- Radius: `8px`
- Padding: `16px`
- Text color: `#fffdf9`

Use cards for cookie prompts, info panels, or small utility overlays.

# Do's and Don'ts

## Do
- Do keep the page dark, quiet, and editorial.
- Do use Cheltenham BT for major content and Gill Sans Nova for utility labels or compact CTA emphasis.
- Do preserve the thin outlined button style and pill shape.
- Do center primary hero content and give it substantial breathing room.
- Do keep text color warm white rather than pure white when matching the source.
- Do use borders instead of shadows to define surfaces.
- Do keep captions, nav labels, and metadata compact and well-tracked.

## Don't
- Don't introduce bright accent colors or high-saturation gradients.
- Don't use heavy drop shadows, glows, or soft neumorphic effects.
- Don't convert buttons into filled blocks unless the source explicitly does so.
- Don't use large corner radii on cards; reserve full rounding for pills only.
- Don't pack the layout tightly; density breaks the brand feel.
- Don't replace serif editorial text with a generic sans-serif system stack.
- Don't over-animate or add playful motion that competes with the immersive imagery.