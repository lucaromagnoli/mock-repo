# Implementation Assumptions

**Story:** story-004-visual-feedback
**Date:** 2026-02-10

## Assumptions Made During Implementation

### 1. Project Structure
- **Assumption:** Components follow the existing structure with JS files in `src/components/{ComponentName}/` and CSS in the same directory or `src/styles/`
- **Rationale:** This matches the existing Button and Input component patterns

### 2. Module System
- **Assumption:** The project supports both CommonJS (`module.exports`) and browser globals (`window.X`)
- **Rationale:** Existing components export using both patterns for flexibility

### 3. CSS Design Tokens
- **Assumption:** The existing CSS custom properties in `tokens.css` can be extended with additional tokens for interactive states
- **Rationale:** This maintains consistency with the design system while adding necessary variables

### 4. Toast Positioning
- **Assumption:** Default toast position is `top-right` as this is the most common UX pattern
- **Rationale:** Task spec mentioned "top-right by default" as an architecture decision

### 5. Auto-dismiss Timing
- **Assumption:** Success toasts auto-dismiss after 4 seconds, error toasts require manual dismiss
- **Rationale:** Task spec indicated success messages should dismiss after 3-5 seconds, and errors should not auto-dismiss for safety

### 6. Loading Delay Threshold
- **Assumption:** 400ms delay before showing loading indicators (within the 300-500ms range specified)
- **Rationale:** 400ms is a good balance between preventing flicker and showing feedback quickly

### 7. Minimum Display Duration
- **Assumption:** 200ms minimum display time once a loading indicator is shown
- **Rationale:** Prevents jarring flash if operation completes immediately after indicator appears

### 8. Maximum Visible Toasts
- **Assumption:** Maximum 5 toasts visible at once, additional toasts are queued
- **Rationale:** Prevents notification spam while ensuring important messages are still shown

### 9. Duplicate Detection
- **Assumption:** 500ms debounce window for duplicate messages
- **Rationale:** Task spec mentioned debouncing duplicates within 500ms window

### 10. Accessibility Roles
- **Assumption:** Error/warning toasts use `role="alert"` and `aria-live="assertive"`, while success/info use `role="status"` and `aria-live="polite"`
- **Rationale:** Critical messages (errors) should interrupt screen readers immediately

### 11. Focus Management
- **Assumption:** Toasts do not steal focus from the current element
- **Rationale:** Task spec mentioned "Don't trap focus in notifications, maintain logical tab order"

### 12. XSS Prevention
- **Assumption:** All toast messages are escaped by default using textContent
- **Rationale:** Security consideration mentioned in task spec

### 13. Browser Support
- **Assumption:** Modern evergreen browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Rationale:** Task spec mentioned this as the target support level

### 14. No External Dependencies
- **Assumption:** Implementation uses vanilla JavaScript and CSS without external libraries
- **Rationale:** Task spec emphasized minimal dependencies and vanilla implementation

### 15. Reduced Motion Support
- **Assumption:** All animations respect `prefers-reduced-motion` media query
- **Rationale:** Accessibility requirement mentioned in task spec

## Implementation Decisions

### Toast Manager Singleton Pattern
- Used singleton pattern for ToastManager to ensure single notification queue across the app
- Provides global access via `window.ToastManager` for browser usage

### Loading Manager Class Pattern
- LoadingManager is instantiable (not singleton) to allow multiple independent loading states
- LoadingOverlay is singleton since there should only be one full-page overlay

### CSS-First Interactive States
- Used CSS pseudo-classes (`:hover`, `:active`, `:focus-visible`) for optimal performance
- JavaScript enhancement only where necessary (e.g., toast lifecycle management)

### BEM Naming Convention
- Followed existing project convention: `.component`, `.component--modifier`, `.component__element`

## Questions for Future Clarification

1. Should toast notifications support action buttons (e.g., "Undo")?
2. Should there be sound effects for critical notifications?
3. Should skeleton screens have specific patterns for different content types (e.g., table, list, grid)?
4. Should loading overlay support cancellation?
