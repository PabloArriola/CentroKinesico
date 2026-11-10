---
name: Kinetic Spine & Health System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4d6079'
  primary: '#000917'
  on-primary: '#ffffff'
  primary-container: '#0d2137'
  on-primary-container: '#7689a4'
  inverse-primary: '#b5c8e5'
  secondary: '#00658d'
  on-secondary: '#ffffff'
  secondary-container: '#41befd'
  on-secondary-container: '#004b69'
  tertiary: '#000910'
  on-tertiary: '#ffffff'
  tertiary-container: '#11222b'
  on-tertiary-container: '#798a95'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#b5c8e5'
  on-primary-fixed: '#081c32'
  on-primary-fixed-variant: '#364860'
  secondary-fixed: '#c6e7ff'
  secondary-fixed-dim: '#81cfff'
  on-secondary-fixed: '#001e2d'
  on-secondary-fixed-variant: '#004c6b'
  tertiary-fixed: '#d3e5f1'
  tertiary-fixed-dim: '#b7c9d5'
  on-tertiary-fixed: '#0c1e26'
  on-tertiary-fixed-variant: '#384953'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a clinical yet human-centered atmosphere for physical rehabilitation, spinal wellness, and kinesiology therapy. It projects clinical authority, scientific precision, and empathetic recovery care. The UI must inspire confidence, relief, and steady progress in patients navigating spinal pain, post-surgical recovery, or sports-performance rehabilitation.

The visual style blends **Corporate Modern** healthcare structure with subtle **Tactile & Glass-Tonal** polish. Deep midnight navy blue grounds the interface in medical expertise and structural stability, while vibrant electric cyan-teal brings kinetic energy, mobility, and healing optimism. Surfaces leverage crisp porcelain cards, diffused ambient elevation, translucent badge pills, and generous touch targets optimized for mobile use by patients with diverse physical agility.

## Colors

The palette balances deep authoritative darks with sterile, refreshing lights and high-visibility medical accents:

- **Primary (`#0D2137`)**: Deep clinical navy. Used for hero headers, primary navigation surfaces, key milestone cards, primary CTAs, and top-tier typography.
- **Secondary (`#00A3E0`)**: Vibrant kinetic cyan. Used for interactive highlights, active state pills, recovery progress indicators, actionable links, and primary button fills on light containers.
- **Tertiary (`#E0F2FE`)**: Soft cyan-ice tint. Deployed for subtle badge backdrops, highlighted appointment cards, and selected state chips.
- **Neutral (`#64748B`)**: Balanced medical slate. Used for secondary body text, icon outlines, de-emphasized meta details, and subtle dividing borders.
- **Backgrounds**: Canvas foundation sits on `#F8FAFC` (soft cool-slate porcelain) with card surfaces in `#FFFFFF` and grouped containers in `#F1F5F9`.
- **Semantic Signals**: `#10B981` (Completed exercises / verified therapist), `#F59E0B` (Pending session / cautionary note), and `#EF4444` (Severe pain / cancel action).

## Typography

The typography leverages **Plus Jakarta Sans** uniformly across display, body, and label roles. Its geometric clarity, wide aperture, and softened terminal curves deliver both clinical authority and friendly human accessibility.

- **Headlines**: Weighted at `600` and `700` with subtle negative tracking (`-0.01em` to `-0.02em`) to command attention without feeling harsh.
- **Body Text**: Tuned with generous line heights (`1.5` to `1.57`) to maximize legibility for reading clinical protocols, home exercise routines, and therapy instructions.
- **Labels & Micro-copy**: Employs uppercase or distinct tracking on badges, specialist license numbers (`M.P. 706`), and status tags to ensure swift scanning at a glance.

## Layout & Spacing

The layout follows a responsive mobile-first architecture structured on an 8px base rhythm (with a 4px sub-grid for icons and badges):

- **Mobile Viewports (< 640px)**: 4-column fluid grid, `1rem` (16px) outer edge margins, and `0.75rem` (12px) gutters. Cards stack vertically or scroll horizontally inside dedicated category rails. Bottom navigation bars provide 64px floating clearance above safe areas.
- **Tablet / Responsive Expand (640px - 1024px)**: 8-column layout with `1.25rem` (20px) margins and `1rem` (16px) gutters. Specialist profiles and service categories convert into balanced 2-column or 3-column modular cards.
- **Desktop Companion (> 1024px)**: 12-column max-width locked container (`1200px`) centered horizontally, reserving comfortable sidebar or header navigation channels.
- **Component Padding Scale**: Internal card paddings strictly observe `space-md` (16px) or `space-lg` (24px) to avoid claustrophobic clinical interfaces.

## Elevation & Depth

Visual hierarchy uses a refined hybrid of **tonal layered surfaces** and **soft ambient medical shadows**:

- **Level 0 (Flat / Canvas)**: `#F8FAFC` base screen background.
- **Level 1 (Card Base)**: Pure `#FFFFFF` surfaces with subtle border tracing (`1px solid #E2E8F0`) and an ultra-diffused drop shadow: `0px 4px 20px rgba(13, 33, 55, 0.04)`.
- **Level 2 (Interactive Floating / Active Cards)**: Elevated appointment cards and active therapist selection tiles: `0px 8px 30px rgba(13, 33, 55, 0.08)`.
- **Level 3 (Modal Sheets & Floating Bottom Bars)**: Bottom sheets and pill bars utilize a subtle translucent glass treatment: `background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(16px); border-top: 1px solid rgba(226, 232, 240, 0.8); shadow: 0px -4px 24px rgba(13, 33, 55, 0.06)`.
- **Hero Dark Cards**: Inverted panels use `#0D2137` background with subtle inner border glow: `border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0px 12px 32px rgba(13, 33, 55, 0.25)`.

## Shapes

The design system embraces an approachable, ergonomic shape language to soften clinical tension:

- **Standard Cards & Modals**: `1rem` (16px) border-radius (`rounded-lg`), providing smooth, comfortable geometry.
- **Micro-elements & Badges**: Fully pill-shaped (`rounded-full`, 9999px) for category tags (e.g., *Rehabilitación*, *SGA*, *Turno Mañana*) and numerical metrics.
- **Action Buttons & Input Containers**: `0.75rem` (12px) to `1rem` (16px) for an easy-to-tap, non-abrasive hand-feel.
- **Avatar & Icon Badges**: Softened squares with `0.75rem` (12px) or circular frames for specialist portrait photography.

## Components

### Buttons
- **Primary Action**: Pill or `0.875rem` radius, filled with `#00A3E0` (text: `#FFFFFF`), transitioning to `#0284C7` on press. Includes right-aligned chevron or arrow icon for booking workflows.
- **Primary Inverse**: Deep navy `#0D2137` fill with white text and a high-contrast circular arrow badge in white or cyan.
- **Secondary Outline**: `1.5px solid #CBD5E1`, transparent background, dark navy text `#0D2137`, with subtle hover fill `#F1F5F9`.
- **Tertiary / Ghost**: Soft cyan fill `#E0F2FE` with dark cyan text `#0369A1` for ancillary actions like "Ver Más" or "Reprogramar".

### Chips & Badges
- **Status & Specialty Chips**: Compact heights (28px - 32px), pill-shaped, `#F1F5F9` background with `#0F172A` text, or tinted `#E0F2FE` with `#0284C7` for active filters.
- **License / Credential Pill**: Dark navy `#0D2137` or tinted gold pill badge overlaying doctor portraits (e.g., `M.P. 706`) with crisp uppercase 10px tracking.

### Cards
- **Appointment / Feature Hero Card**: Deep navy background (`#0D2137`) with large date display, stethoscope / spine icon accent, luminous cyan typography accents, and white high-legibility subtitle text.
- **Service Specialty Cards**: Pure white card with `#F8FAFC` icon tile, title in bold `#0D2137`, description in `#64748B`, and a discrete link/arrow button `#00A3E0` anchored bottom-right.
- **Therapist Profile Card**: Top image section with 16px corner clip, doctor designation tags, phone/WhatsApp quick-launch action buttons at the bottom edge.

### Input Fields & Controls
- **Form Inputs**: Height 52px for mobile ergonomics. Background `#FFFFFF` with `1.5px solid #E2E8F0`. Focus state rings `#00A3E0` with `0 0 0 3px rgba(0, 163, 224, 0.15)`. Floating or top-aligned 12px bold labels in `#475569`.
- **Checkboxes & Radios**: Custom 20px controls with `#00A3E0` accent fills, checked state displays crisp white checkmark icons.

### Navigation
- **Floating Bottom Bar**: 64px height pill or docked bar, frosted glass backdrop (`rgba(255,255,255,0.92)`), active tab highlighted with a small cyan dot indicator and `#0D2137` filled icon; inactive tabs in `#94A3B8`.