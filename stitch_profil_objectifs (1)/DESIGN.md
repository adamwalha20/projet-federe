# Design System Strategy: The Kinetic Vitality Framework

## 1. Overview & Creative North Star
The "WakeUp" experience is guided by the Creative North Star of **"Energetic Precision."** Unlike generic fitness apps that rely on heavy dark modes or aggressive neon, this system treats the UI as a high-end editorial piece—think of a premium wellness magazine fused with a precision medical instrument. 

We break the "template" look by favoring **intentional asymmetry** and **tonal layering**. The goal is to move away from rigid, boxed grids. Instead, we use expansive white space and overlapping elements to create a sense of forward motion. Elements should feel like they are floating in a bright, airy studio, organized by light and shadow rather than lines and boxes.

## 2. Colors & Surface Architecture
The palette transitions from the crispness of a new morning to the focused energy of a midday workout.

### The "No-Line" Rule
**Prohibition of 1px solid borders:** To maintain a premium, seamless feel, designers are strictly forbidden from using solid borders to define sections. Layout boundaries must be achieved through:
- **Tonal Shifts:** Placing a `surface_container_low` section against a `surface` background.
- **Negative Space:** Using the `12` (3rem) or `16` (4rem) spacing tokens to create mental boundaries.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent layers. 
- **Base Layer:** `surface` (#f8f9fa) for the overall background.
- **Sectional Layer:** `surface_container` (#edeeef) for large grouped content areas.
- **Interactive Layer:** `surface_container_lowest` (#ffffff) for primary cards to give them a "lifted" appearance.
- **The "Glass & Gradient" Rule:** Use `surface_tint` at 8-12% opacity with a `20px` backdrop blur for floating navigation bars or sticky headers. For high-impact CTAs, use a subtle linear gradient from `primary` (#9f4200) to `primary_container` (#ff6d00) at a 135-degree angle to add "soul" and depth.

## 3. Typography: Editorial Authority
We utilize a dual-font system to balance motivation with professional data clarity.

*   **Display & Headlines (Plus Jakarta Sans):** Used for big motivational moments and data summaries. Its wider stance feels modern and high-end. 
    *   *Role:* Inspiration and "At-a-glance" metrics.
*   **Body & Titles (Inter):** Used for all functional reading and UI labels. Inter’s tall x-height ensures readability during high-movement activities.
    *   *Role:* Instruction, data labels, and deep reading.

**Hierarchy Strategy:** Use a high-contrast scale. Pair a `display-lg` metric with a `label-md` uppercase caption to create a sophisticated, "magazine-style" layout that feels intentional rather than auto-generated.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often messy. In this system, we use **Ambient Depth**.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_lowest` card placed on a `surface_container_high` background provides a clean, natural lift without a single pixel of shadow.
*   **Ambient Shadows:** If a card *must* float (e.g., a workout-in-progress modal), use a shadow with a `24px` blur, `0px` spread, and 6% opacity using the `on_surface` color.
*   **The Ghost Border Fallback:** For accessibility in high-glare environments (outdoor running), use the `outline_variant` at **15% opacity**. This creates a "Ghost Border" that defines the shape without interrupting the visual flow.

## 5. Components & Interface Elements

### Cards & Lists
*   **Minimalist Cards:** Forbid divider lines. Separate list items using `surface_container_low` backgrounds with `md` (0.75rem) rounded corners. Use `py-4` (1rem) internal padding to let the content breathe.
*   **Data Visualization:** Use `secondary` (Teal) for "Progress Made" and `primary` (Orange) for "Target/Goal" to create clear energetic contrast.

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. Shape: `full` (9999px) for a modern, athletic feel.
*   **Secondary:** `surface_container_highest` background with `on_surface` text. No border.
*   **Tertiary:** Ghost style; `on_secondary_container` text with no background, used for low-emphasis actions like "Cancel" or "Skip."

### Specialized "WakeUp" Components
*   **The Vitality Ring:** A custom data component using `secondary_fixed` as the track and a `secondary` to `tertiary` gradient for the progress fill.
*   **Glass Progress Overlays:** Semi-transparent `surface_container_lowest` panels that blur the workout background image, providing a focus area for mid-set stats.

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. Place a large `display-md` heading on the left and a small `label-md` description offset to the right.
*   **Do** use `xl` (1.5rem) rounded corners for large hero cards to emphasize the "Soft Minimalism" feel.
*   **Do** allow the `primary` orange to be a "spark" color—use it sparingly for high-value actions or critical alerts.

### Don’t:
*   **Don’t** use pure black (#000000) for text. Always use `on_surface` (#191c1d) to maintain the premium, softer feel.
*   **Don’t** use 1px dividers to separate list items. Use a `1px` height `surface_variant` line at 30% opacity if absolutely necessary, but prioritize vertical spacing first.
*   **Don’t** cram data. If a screen feels full, move secondary metrics to a secondary "Details" layer using the nesting principles.