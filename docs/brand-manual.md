# NekoJobs - Brand Design System

## 1. Brand Philosophy
NekoJobs is not just another job application tracker; it is a **personal career companion**. The goal is to help developers organize, improve, and reflect on their job search process in an environment that feels:
- **Calm & Focused:** Reducing the anxiety of the job hunt.
- **Friendly but Professional:** The Neko mascot provides warmth without making the product feel childish.
- **Premium & Modern:** Providing a tool that developers *want* to use every day, stepping away from the cold, corporate HR aesthetic.
- **Motivating & Empowering:** Celebrating progress and encouraging consistency.

## 2. Design Principles
- **Clarity Over Density:** Interfaces should breathe. Prioritize readability over cramming information.
- **Subtle Depth:** Rely on borders, typography, and spacing rather than heavy, dramatic drop-shadows.
- **Intentional Color:** Color is used to draw attention (Primary) or provide feedback (Status). The rest of the app should remain neutral and elegant.
- **Motion with Purpose:** Animations should be fast, snappy, and exist to provide feedback, never to distract.

## 3. Theme Architecture
The application is built around semantic design tokens. 
- Components **never** know whether they are running in Light or Dark mode.
- Every component consumes semantic tokens.
- Themes only redefine token values.
- This guarantees that adding a new theme never requires changing React components.

## 4. Design Tokens Naming Convention
To maintain consistency and avoid names like `--purple` or `--gray-light`, all tokens must follow this structure:
- **Colors:** `color.background`, `color.surface`, `color.surface.elevated`, `color.text.primary`, `color.border.default`, `color.feedback.success`
- **Radius:** `radius.sm`, `radius.md`
- **Spacing:** `spacing.sm`, `spacing.lg`
- **Shadow:** `shadow.sm`, `shadow.md`
- **Motion:** `motion.fast`, `motion.slow`

---

## 5. Visual Inspiration
The visual language draws heavy inspiration from top-tier developer and productivity tools:
- **Linear:** For its mastery of borders, subtle surfaces, and dark mode execution.
- **Vercel / Geist:** For its impeccable typography scale and minimalist monochrome base.
- **Raycast / Arc Browser:** For the snappy, keyboard-first feel and premium translucent layers.
- **Notion Calendar:** For the balanced, friendly, yet highly organized layout.

---

## 6. Logo
The NekoJobs logo is the primary identifier of the brand.

**Versions:**
- **Light version:** For use on white or light gray backgrounds.
- **Dark version:** For use on dark or black backgrounds.
- **Monochrome version:** For use when color printing or strict contrast constraints apply.

**Usage Rules:**
- **Spacing:** Always maintain a clear space around the logo equal to the width of the "N" character in the logomark to ensure it remains visually distinct.
- **Minimum size:** Never render the logo smaller than 24px in height to preserve legibility.

**Do Not:**
- ❌ Rotate the logo.
- ❌ Stretch or distort the proportions.
- ❌ Change the official brand colors.
- ❌ Add drop shadows, gradients, or 3D effects.
- ❌ Modify the typography or relationship between the icon and the text.

---

## 7. Color Palette
*Note: The following HEX values represent the base (Light Mode) intention. Dark mode will adapt these tokens to maintain the same contrast and semantic meaning.*

### Brand Colors
- **Primary:** `#7C3AED` *(Premium Violet - Instantly recognizable as NekoJobs)*
- **Primary Hover:** `#6D28D9`
- **Primary Active:** `#5B21B6`
- **Primary Soft:** `#F3E8FF` *(Used for subtle active states or tinted backgrounds)*
- **Secondary:** `#18181B` *(Almost black, used for high-contrast secondary elements)*
- **Accent:** `#38BDF8` *(Sky blue, used sparingly for charts, highlights, special badges, and onboarding)*

### Neutral (Backgrounds & Surfaces)
- **Background:** `#FAFAFB` *(Off-white to avoid harsh contrast)*
- **Surface:** `#FFFFFF` *(Pure white for standard cards to stand out from background)*
- **Surface Elevated:** `#FFFFFF` *(With a subtle shadow/border for dropdowns/modals)*
- **Sidebar:** `#F6F6F7` *(Slightly deeper than background to separate navigation)*
- **Muted:** `#F3F4F6` *(For empty states, disabled zones, or secondary panels)*

### Text
- **Text Primary:** `#09090B` *(Deep near-black for headings and main body)*
- **Text Secondary:** `#52525B` *(Subtle gray for descriptions and metadata)*
- **Text Muted:** `#A1A1AA` *(For placeholders or disabled text)*
- **Text Inverse:** `#FFFFFF` *(Text on primary buttons)*

### Borders
- **Border Default:** `#E4E4E7` *(Soft structure)*
- **Border Hover:** `#D4D4D8` *(Interactive borders)*
- **Border Strong:** `#A1A1AA` *(High contrast dividers)*
- **Border Focus:** `#7C3AED` *(Brand focus ring)*

### Feedback
- **Success:** `#10B981` (Emerald)
- **Warning:** `#F59E0B` (Amber)
- **Danger:** `#EF4444` (Red)
- **Info:** `#3B82F6` (Blue)

### Application Status Colors
A dedicated semantic palette to instantly recognize the state of an application at a glance. We maintain a harmonious color scale avoiding jarring colors like fuchsia.
- **Guardada (Saved):** `#9CA3AF` (Neutral Gray)
- **Aplicada (Applied):** `#3B82F6` (Calm Blue)
- **Entrevista RRHH (HR Interview):** `#6366F1` (Indigo)
- **Entrevista técnica (Technical Interview):** `#7C3AED` (Primary Violet)
- **Prueba técnica (Technical Test):** `#F59E0B` (Amber/Warning)
- **Entrevista Final (Final Interview):** `#4C1D95` (Deep Violet)
- **Oferta (Offer):** `#10B981` (Success Emerald)
- **Contratado (Hired):** `#059669` (Deep Emerald)
- **Rechazada (Rejected):** `#EF4444` (Danger Red)
- **Ghosting (Ghosted):** `#6B7280` (Gray - fading out)

---

## 8. Typography
**Primary Font:** `Geist Sans`
**Monospace Font:** `Geist Mono`

*Why Geist?* Designed by Vercel specifically for interfaces and code, Geist offers excellent legibility at small sizes, beautiful geometric precision, and a highly professional, modern look that fits a developer-centric tool perfectly.

**Typography Scale:**
- **Display:** 48px, bold, tight tracking (`-0.02em`)
- **Heading XL:** 36px, semibold
- **Heading LG:** 24px, semibold
- **Heading MD:** 20px, medium
- **Heading SM:** 16px, medium
- **Body LG:** 16px, regular
- **Body MD:** 14px, regular *(Default UI text size)*
- **Body SM:** 12px, regular
- **Caption:** 10px, medium, uppercase tracking
- **Mono:** 13px, `Geist Mono` *(For code, IDs, or technical data)*

*Rule:* No component should manually define font sizes (e.g., `text-[13px]`). They must use the designated typography token.

---

## 9. Visual Density & Layout
### Visual Density
The interface should always feel breathable.
- Cards should never feel crowded.
- Prefer whitespace over separators.
- Avoid unnecessary borders.
- Limit the number of simultaneously visible actions.
- **Hierarchy must be established through spacing first, typography second, and color last.**

### Layout Principles
- **Desktop:** 12-column grid.
- **Tablet:** 8-column grid.
- **Mobile:** 4-column grid.
- **Maximum content width:** `1440px`.

### Responsive Philosophy
- **Desktop is the primary experience.**
- **Tablet** should preserve hierarchy.
- **Mobile** should simplify, never shrink. Complex tables become cards. Secondary actions move into menus.
- Avoid horizontal scrolling whenever possible.

---

## 10. Border Radius
The interface should feel modern and soft, avoiding overly sharp corners but maintaining structural integrity.
- **Radius XS:** `4px` *(Tags, small badges)*
- **Radius SM:** `6px` *(Inputs, standard buttons)*
- **Radius MD:** `8px` *(Dropdowns, small cards)*
- **Radius LG:** `12px` *(Main application cards, widgets)*
- **Radius XL:** `16px` *(Modals, large surface areas)*
- **Radius Pill:** `9999px` *(Rounded status indicators, avatars)*

---

## 11. Shadows & Elevation
The design relies heavily on **subtle borders (`#E4E4E7`)** rather than heavy drop shadows to create depth.
- **Shadow XS:** Very subtle, used for small buttons or inputs.
- **Shadow SM:** Standard cards or widgets.
- **Shadow MD:** Dropdowns, popovers, and tooltips.
- **Shadow LG:** Floating action buttons, persistent navigation.
- **Shadow XL:** Modal dialogs (combined with a backdrop blur).

---

## 12. Spacing
A strict spacing scale based on a `4px` grid to ensure the application feels spacious and breathable.
- **xs:** `4px`
- **sm:** `8px`
- **md:** `16px` *(Standard padding for inputs/small components)*
- **lg:** `24px` *(Card padding, section gaps)*
- **xl:** `32px` *(Page margins, major layout sections)*
- **2xl:** `48px`
- **3xl:** `64px`

---

## 13. Component States
Every interactive component must define and respect a consistent lifecycle of states to ensure predictability:
- **Default:** The base resting state.
- **Hover:** Slight background tint or border darkening. Fast transition.
- **Pressed:** Slight visual compression or darkened background.
- **Focused:** Clear focus ring (`Border Focus`) for accessibility.
- **Disabled:** Muted opacity (usually `50%`), unclickable, removing hover effects.
- **Loading:** Display a spinner or skeleton, preserving dimensions to prevent layout shifts.

---

## 14. Empty States
NekoJobs relies on many lists (applications, interviews, learnings). Every empty state must feel intentional and encouraging.
**Every empty state must contain:**
1. **Illustration:** A clean, minimal graphic (or Neko variation).
2. **Short explanation:** A friendly sentence explaining why it's empty.
3. **Primary CTA:** A clear button guiding the user to create the first item.
4. **Optional secondary action:** A link to learn more or load demo data.

---

## 15. Data Visualization
NekoJobs relies on clean and informative analytics.
- **Never rely only on color.** Always use labels or patterns.
- Keep grid lines extremely subtle or omit them.
- Limit colors strictly to the semantic palette.
- **Highlight only one important dataset** at a time to guide focus.

---

## 16. AI Guidelines (Neko)
Neko is an assistant, never a mere decoration.
- **Data-Driven:** Insights must always be based on actual user data.
- **No Fluff:** Avoid generic motivational messages. 
- **Actionable:** Recommendations should be actionable and practical.
- **Contextual:** Explain *why* a recommendation exists whenever possible.
- **Visual Restraint:** Do not place Neko in purely decorative contexts. This ensures the character's presence holds value.

---

## 17. Motion Guidelines
Animations should make the app feel alive and responsive, but never slow the user down.
- **Hover/Active:** `150ms ease-in-out` *(Buttons, links, list items)*
- **Focus Rings:** `100ms ease-out`
- **Dialogs/Modals:** `200ms cubic-bezier(0.16, 1, 0.3, 1)` *(Spring-like, fast entrance, soft settle)*
- **Dropdowns:** `150ms` with a slight vertical slide (`translate-y-1`).
- **Page Transitions:** Subtle fade-in (`150ms`).

---

## 18. Iconography
**Library:** `Lucide Icons`
- Consistent stroke width (usually `2px`).
- Used primarily at `16x16` (sm) or `20x20` (md).
- Icons should always be accompanied by labels for accessibility, unless their meaning is universally absolute.

---

## 19. Accessibility (A11y)
- **Contrast:** All text must meet WCAG 2.1 AA standards. Muted text must still be legible against its background.
- **Focus States:** EVERY interactive element must have a visible focus ring. No exceptions.
- **Keyboard Navigation:** The app must be fully navigable via `Tab`.
- **Reduced Motion:** Respect `prefers-reduced-motion` media queries by disabling non-essential transitions.
- **ARIA:** Use proper semantic HTML and ARIA labels for icon-only buttons.

---

## 20. Component Philosophy
- **Token-Driven:** Components consume variables, never hardcoded colors.
- **Composition over Configuration:** Build small, specific components (`Card`, `CardHeader`, `CardContent`) rather than massive monolithic components with 50 props.
- **Stateful but Dumb:** UI components should not fetch their own data; they receive it via props.

---

## 21. Do's and Don'ts
### DO ✅
- **DO** establish hierarchy through spacing first, typography second, and color last.
- **DO** use the premium violet (`#7C3AED`) to highlight the primary action on a screen.
- **DO** use generous whitespace (`lg` or `xl`) between distinct sections.
- **DO** implement Dark Mode by simply re-mapping the CSS tokens.

### DON'T ❌
- **DON'T** use generic Tailwind colors (e.g., `bg-blue-500`) inside feature components. Always use semantic variables.
- **DON'T** rely on heavy shadows for standard cards. Use a `Border Default` instead.
- **DON'T** cram information. If a card has too much data, create a detail view.
