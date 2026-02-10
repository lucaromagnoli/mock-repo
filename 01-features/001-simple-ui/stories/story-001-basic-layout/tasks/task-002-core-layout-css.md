# Task: Implement Core Layout Styles

**Task ID:** task-002
**Story:** [story-001-basic-layout](../story.md)
**Type:** Frontend
**Complexity:** M
**Status:** Not Started
**Created:** 2026-02-10

## Description

Implement the core CSS styling for the application layout, including the grid-based layout system, typography, color system, and spacing. This task creates the visual foundation that makes the HTML structure (from task-001) look professional and organized.

## Dependencies

- [task-001-html-structure.md](task-001-html-structure.md) - Requires HTML structure to be in place

## Technical Details

### Components Affected
- New file: `styles.css` (main stylesheet)
- Styles for: html, body, header, nav, main, footer elements
- CSS custom properties (variables) for theming

### Implementation Approach

**CSS Grid for Layout:**
- Use CSS Grid to create the overall page structure (header at top, nav below/beside, main content, footer at bottom)
- Named grid areas for clarity and easy rearrangement
- Grid ensures proper spacing and alignment without complex positioning

**Why CSS Grid:**
- Modern, well-supported (>95% global browser support)
- Reduces markup complexity (no wrapper divs needed)
- Easy to make responsive (change grid template at breakpoints)
- Named areas make code self-documenting

**CSS Custom Properties (Variables):**
```css
:root {
  --color-primary: #0066cc;
  --color-background: #ffffff;
  --color-text: #333333;
  --spacing-unit: 1rem;
  --max-content-width: 1200px;
}
```

**Why CSS variables:**
- Centralized theming (easy to add dark mode later)
- Consistent spacing and colors throughout
- Easy to maintain and modify

**Typography System:**
- Use system font stack for performance (no web fonts)
- Establish type scale (h1, h2, h3, body, small)
- Set line-height for readability (1.5 for body text)

**Box Model:**
- Use `box-sizing: border-box` for predictable sizing
- Reset margins and padding on body for consistent cross-browser rendering

### Data Models / Schema Changes

None

### Third-Party Integrations

None - using only native CSS

## Implementation Steps

1. Create `styles.css` file in the project root directory
2. Add CSS reset/normalization:
   - Set `box-sizing: border-box` on all elements
   - Reset body margin and padding
   - Set default font family and line-height
3. Define CSS custom properties in `:root`:
   - Color palette (primary, background, text, accent)
   - Spacing scale (base unit, multiples)
   - Typography scale (font sizes)
   - Layout constraints (max-width, breakpoints)
4. Style the body element:
   - Set default font family (system font stack)
   - Set background color
   - Set text color
   - Set minimum height to 100vh (full viewport height)
5. Implement CSS Grid layout on body:
   - Define grid template areas (header, nav, main, footer)
   - Set grid template rows (auto for header/nav/footer, 1fr for main)
   - Assign each semantic element to its grid area
6. Style header element:
   - Add background color
   - Add padding for visual spacing
   - Center or left-align content
   - Ensure text contrast meets WCAG AA (4.5:1 minimum)
7. Style nav element:
   - Create horizontal navigation layout (flexbox for nav items)
   - Style navigation links (remove underlines, add hover states)
   - Add spacing between nav items
   - Ensure adequate touch target size (44x44px minimum)
8. Style main element:
   - Set max-width for readability (around 1200px)
   - Center content (margin: 0 auto)
   - Add padding for breathing room
   - Ensure content doesn't touch viewport edges
9. Style footer element:
   - Add background color (can match header)
   - Add padding
   - Consider center-aligning footer text
10. Add focus styles for accessibility:
    - Visible focus indicator for keyboard navigation
    - Use outline or box-shadow (don't remove default focus)
11. Test in browser:
    - Verify layout looks professional
    - Check that spacing is consistent
    - Verify color contrast with browser DevTools
12. Validate CSS (optional but recommended):
    - Use W3C CSS Validator or CSSLint

## Code Changes

### Files to Create/Modify

- `styles.css` - Create new file with:
  - CSS reset (box-sizing, body margin/padding)
  - CSS custom properties in :root (colors, spacing, typography)
  - Body styling (font, background, grid layout)
  - Header styling (background, padding, text color)
  - Nav styling (flexbox layout, link styles, hover states)
  - Main styling (max-width, centering, padding)
  - Footer styling (background, padding, alignment)
  - Focus styles for accessibility (visible outline)
  - Comments explaining each major section

Example CSS structure:
```css
/* CSS Reset and Base Styles */
*, *::before, *::after {
  box-sizing: border-box;
}

/* CSS Custom Properties */
:root {
  /* Colors */
  --color-primary: #0066cc;
  --color-text: #333333;
  /* Spacing */
  --spacing-base: 1rem;
  /* Typography */
  --font-size-base: 16px;
}

/* Layout Grid */
body {
  display: grid;
  grid-template-areas:
    "header"
    "nav"
    "main"
    "footer";
  min-height: 100vh;
}

header { grid-area: header; }
nav { grid-area: nav; }
main { grid-area: main; }
footer { grid-area: footer; }

/* Component Styles */
/* ... header, nav, main, footer styles ... */
```

### Configuration Changes

None

### Migration Steps

None

## Testing Requirements

### Unit Tests

Not applicable for CSS (no logic to test)

### Integration Tests

Manual testing required:

1. **Visual Appearance Test**:
   - Test: Open index.html in browser at 1920x1080 resolution
   - Expected: Layout looks professional, organized, and polished
   - Verify: Header clearly separated from content, nav is obvious, footer anchored at bottom

2. **Color Contrast Test**:
   - Test: Use Chrome DevTools Lighthouse audit or WebAIM Contrast Checker
   - Expected: All text has minimum 4.5:1 contrast ratio (WCAG AA)
   - Check: Header text on header background, nav links, body text, footer text

3. **Spacing Consistency Test**:
   - Test: Visually inspect spacing between elements
   - Expected: Consistent padding/margins throughout (using spacing variables)
   - Verify: No elements touching viewport edges, consistent gaps between sections

4. **Typography Test**:
   - Test: Read sample content at arm's length
   - Expected: Text is readable, appropriate size, good line-height
   - Verify: Line length not too long (65-75 characters per line optimal)

5. **Focus Indicator Test**:
   - Test: Tab through interactive elements (nav links)
   - Expected: Clear visual indicator on focused element (outline or border)
   - Verify: Focus indicator has 3:1 contrast with background (WCAG AA)

6. **Grid Layout Test**:
   - Test: Inspect with browser DevTools (Grid overlay)
   - Expected: Elements align to grid areas correctly
   - Verify: No overlapping content, footer at bottom even with minimal content

7. **Cross-Browser Test**:
   - Test: Open in Chrome, Firefox, Safari, Edge
   - Expected: Consistent appearance across all browsers
   - Note: Minor differences acceptable (font rendering), major layout issues are not

### Performance Considerations

- **CSS size**: Keep styles.css under 50KB (aim for 10-20KB)
- **Selectors**: Use efficient selectors (avoid deeply nested or overly complex)
- **Reflows**: Avoid CSS properties that trigger layout reflows during scroll (position: fixed is OK)
- **Critical CSS**: Entire stylesheet is small enough to be critical (inline in head if needed)

## Security Considerations

None - CSS cannot execute code or access data

## Technical Risks

- **Risk**: Color choices may not meet WCAG AA contrast requirements
  - **Mitigation**: Use contrast checker during implementation; document color choices in CSS comments; adjust colors if needed

- **Risk**: CSS Grid may not work on older browsers (IE11)
  - **Mitigation**: Add @supports rule and Flexbox fallback if IE11 support is required; verify browser support requirements with stakeholders

- **Risk**: System font stack may look different across operating systems
  - **Mitigation**: Use comprehensive font stack (San Francisco on Mac, Segoe UI on Windows, etc.); test on multiple OS; acceptable to have slight differences

- **Risk**: Layout may not work well with very long or very short content
  - **Mitigation**: Test with various content lengths; use min-height on main to push footer down; ensure main area expands to fill space

## Definition of Done

- [x] styles.css file created and linked from index.html
- [x] CSS reset applied (box-sizing, body margin/padding)
- [x] CSS custom properties defined for colors, spacing, typography
- [x] Body element uses CSS Grid layout
- [x] Header styled with background, padding, proper text color
- [x] Nav styled with horizontal layout, link styles, hover states
- [x] Main styled with max-width, centering, padding
- [x] Footer styled with background, padding, alignment
- [x] Focus indicators visible and meet WCAG contrast requirements
- [x] All text meets WCAG AA color contrast (4.5:1 minimum) verified with DevTools
- [x] Layout tested in Chrome, Firefox, Safari, Edge (consistent appearance)
- [x] CSS validated (W3C CSS Validator or equivalent)
- [x] Code includes comments explaining non-obvious decisions
- [x] Story acceptance criteria #1, #2, #4 met (consistent layout, proper spacing, readable text)

## Notes

**System Font Stack Recommendation:**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
This uses native system fonts for better performance and familiar appearance.

**Color Contrast Tools:**
- Chrome DevTools Lighthouse: Built-in accessibility audit
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Colour Contrast Analyser: Desktop app for WCAG testing

**CSS Validation:**
- W3C CSS Validator: https://jigsaw.w3.org/css-validator/

**Design Inspiration:**
- Keep it simple and professional
- Err on the side of too much whitespace rather than too little
- Use subtle backgrounds and borders (avoid heavy visual elements)
- Consider using a light gray background for main content area to separate from header/footer

**Estimated Time:** 3 hours (including testing and adjustments)

**Next Steps:**
After completing this task, the layout will work on desktop. Task-003 will make it responsive for tablet and mobile viewports.
