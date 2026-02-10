# Implementation Assumptions

## Directory Structure

- Created `src/` directory for source code as specified in the tasks, even though the existing project had flat structure
- Created `src/styles/` for design system CSS files
- Created `src/components/` for component JavaScript and CSS files
- Created `docs/components/` for documentation pages
- Created `tests/` directory structure for test files

## Technical Decisions

### Vanilla JavaScript Approach
- Used class-based components as specified in the task requirements
- No external dependencies for components (pure JavaScript/CSS)
- Components are self-contained with their own CSS files

### CSS Architecture
- Used CSS custom properties (CSS variables) for all design tokens
- Used BEM naming convention for CSS classes
- CSS imports use `@import url()` syntax for compatibility without build tools
- Kept CSS modular with separate files for tokens, base, utilities, and component-specific styles

### Module System
- Components use conditional exports for both CommonJS (Node.js) and browser environments
- In browser, components are attached to `window` object for global access
- Tests use CommonJS `require()` syntax for Node.js compatibility

### Testing
- Used a simple custom test runner instead of Jest/Mocha to avoid adding dependencies
- Tests require `jsdom` package for DOM simulation in Node.js
- Created manual testing checklists for accessibility testing that requires real browsers/screen readers

## Accessibility

- Implemented WCAG 2.1 AA compliance features
- Used semantic HTML elements (button, input, label)
- Added ARIA attributes for states (aria-disabled, aria-busy, aria-invalid, etc.)
- Implemented visible focus indicators
- Added aria-live regions for dynamic content announcements

## Browser Support

- Targeted modern browsers (Chrome, Firefox, Safari, Edge - latest versions)
- Used CSS features that work in modern browsers (CSS Grid, Flexbox, CSS variables)
- Added `@media (prefers-reduced-motion: reduce)` for accessibility

## What Was NOT Implemented

Due to time constraints and the scope of a vanilla JS implementation:

1. **Visual regression tests** - Would require additional tooling (Puppeteer, Percy, etc.)
2. **Actual axe-core integration** - Documented as TODO; would need npm install
3. **CI/CD configuration** - No GitHub Actions workflow created
4. **IE11 support** - Focused on modern browsers only
5. **Input masking** - Marked as future enhancement in tasks
6. **Complex icon system** - Icons are passed as HTML strings
7. **Dark mode** - Listed as future enhancement

## Notes on Demo Pages

- Demo pages include inline scripts that create component instances
- Documentation uses the components' own CSS (main.css) plus demo-specific styles
- Interactive controls update previews in real-time using JavaScript
