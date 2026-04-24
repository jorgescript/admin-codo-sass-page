---
name: Administrative Dashboard
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001a42'
  on-tertiary-container: '#3980f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built to evoke a sense of security, reliability, and institutional order. The target audience—property managers and residential administrators—requires a workspace that minimizes cognitive load while handling complex data. 

The design style follows a **Corporate / Modern** aesthetic. It prioritizes clarity and functional density over decorative elements. By utilizing a structured layout and a restrained color palette, the system establishes a professional environment where residents' data and financial records are treated with the necessary gravity. The interface feels "quiet" but powerful, emphasizing utility and precision.

## Colors

The palette is centered on deep Navy and Slate tones to project authority and trust. 

- **Primary (#0F172A):** Used for navigation sidebars, primary headings, and high-emphasis interaction states.
- **Secondary (#334155):** Used for sub-headers and supporting text to maintain hierarchy without competing with primary actions.
- **Tertiary (#3B82F6):** A vibrant accent blue used for primary call-to-action buttons, links, and active selection states.
- **Neutrals:** A range of cool grays (from #F8FAFC to #94A3B8) is used for backgrounds and borders to ensure a clean, organized canvas.
- **Semantic Colors:** Status-specific colors (Emerald, Amber, and Rose) are strictly reserved for financial and operational indicators to ensure immediate recognition of "Paid," "Pending," and "Overdue" states.

## Typography

The design system utilizes **Inter** for its exceptional readability in data-dense environments. The type scale is optimized for a dashboard environment where information density is high. 

Headline levels are set with slightly tighter letter spacing to maintain a cohesive visual block. The "label-md" style is intended for table headers and small captions, utilizing an uppercase transformation and increased letter spacing to differentiate it from interactive body text. All body copy is balanced with generous line-height to ensure that long lists and tabular data remain legible during extended use.

## Layout & Spacing

This design system employs a **12-column fluid grid** for the main content area, allowing the dashboard to scale across various desktop and tablet resolutions. 

A strict 4px baseline grid ensures vertical rhythm. Elements are separated by "lg" (24px) or "xl" (32px) increments to create "breathing room" between complex data widgets. Sidebars are fixed-width (280px) to provide a stable anchor for navigation, while the main stage expands to fill the viewport. Internal padding for cards and containers should consistently use the "md" (16px) or "lg" (24px) tokens to maintain a uniform sense of density.

## Elevation & Depth

To maintain a clean and professional appearance, depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surface Layer:** The main background is the lightest neutral (#F8FAFC), providing a clean canvas.
- **Content Layer:** Cards and data containers use a pure white background with a subtle 1px border (#E2E8F0).
- **Interactive Layer:** Active components or hover states use a very soft ambient shadow (0px 4px 6px rgba(15, 23, 42, 0.05)) to signify lift without cluttering the interface.
- **Overlay Layer:** Modals and dropdown menus use a more pronounced shadow to clearly separate them from the content beneath, emphasizing their temporary nature.

## Shapes

The design system adopts a **Soft (1)** roundedness profile. This level of corner radius (4px to 8px) balances the rigid, organized nature of administrative work with a modern, approachable feel. 

- **Small elements:** Buttons, input fields, and status badges use a 4px radius.
- **Large elements:** Dashboard cards and modal containers use an 8px (rounded-lg) radius.
- **Special cases:** Fully rounded "pill" shapes are reserved exclusively for status badges and toggle switches to differentiate them from standard buttons.

## Components

### Status Badges
Badges use a "soft-fill" approach: a 10% opacity background of the semantic color with high-contrast text of the same hue. For example, "Paid" displays as an Emerald badge with dark green text. This ensures accessibility and color-coding without visual overwhelm.

### Data Tables
Tables are the core of this system. They feature a solid header row in the lightest gray with uppercase labels. Rows use a "ghost-hover" effect (background color change on hover) to assist line-tracking. Cell padding is generous (12px vertical) to ensure touch and click accuracy.

### Input Forms
Inputs are designed for high-speed data entry. They feature a 1px border that shifts to Tertiary blue on focus. Labels are positioned above the field in "body-sm" weight for clarity. Error states must include both a red border and a helper text icon for accessibility.

### Buttons
- **Primary:** Solid Tertiary blue with white text.
- **Secondary:** Transparent background with a slate border and text.
- **Ghost:** No border, slate text; used for low-priority actions in utility bars.

### Cards
All dashboard widgets must be contained within cards. Cards should always have a title area, an optional action area (e.g., "View All" link), and a consistent internal padding of 24px.