# Task: Add Responsive Breakpoints

**Task ID:** task-003
**Story:** [story-001-basic-layout](../story.md)
**Type:** Frontend
**Complexity:** M
**Status:** Not Started
**Created:** 2026-02-10

## Description

Implement responsive breakpoints to make the layout adapt to tablet and mobile viewport sizes. This task adds media queries to styles.css that modify the layout, typography, and spacing for smaller screens, ensuring the application is usable on all device sizes.

## Dependencies

- [task-001-html-structure.md](task-001-html-structure.md) - Requires HTML structure
- [task-002-core-layout-css.md](task-002-core-layout-css.md) - Requires base desktop styles to modify

## Technical Details

### Components Affected
- Modify file: `styles.css` (add media queries)
- Affects: All layout elements (body grid, header, nav, main, footer)
- No HTML changes required

### Implementation Approach

**Mobile-First Strategy:**
While task-002 created desktop styles, this task adds media queries to adapt those styles for smaller screens. We'll use **min-width media queries** at key breakpoints.

**Breakpoints:**
```css
/* Mobile: 320px - 767px (base styles, no media query) */
/* Tablet: 768px - 1023px */
@media (min-width: 768px) { ... }
/* Desktop: 1024px and up */
@media (min-width: 1024px) { ... }
```

**Why these breakpoints:**
- 768px: Common tablet width (iPad portrait)
- 1024px: Small desktop/tablet landscape
- Covers the story's required viewports: 375px (mobile), 768px (tablet), 1920px (desktop)

**Responsive Changes:**

1. **Layout Adjustments:**
   - Mobile: Stack everything vertically (grid-template-areas: single column)
   - Tablet: Can introduce side-by-side layout if beneficial
   - Desktop: Multi-column layout (nav beside main, or nav as horizontal bar)

2. **Navigation:**
   - Mobile: Stack nav links vertically or use hamburger menu (simple vertical list for now)
   - Tablet: Horizontal nav with adequate spacing
   - Desktop: Full horizontal nav with all links visible

3. **Typography:**
   - Mobile: Slightly smaller font sizes (but still readable, 16px minimum for body)
   - Tablet: Medium font sizes
   - Desktop: Larger, more comfortable font sizes

4. **Spacing:**
   - Mobile: Reduced padding/margins (screen real estate is precious)
   - Tablet: Medium spacing
   - Desktop: Generous spacing

5. **Touch Targets:**
   - Mobile: Minimum 44x44px for all tappable elements (WCAG guideline)
   - Tablet: 44x44px minimum
   - Desktop: Smaller targets acceptable (mouse precision)

### Data Models / Schema Changes

None

### Third-Party Integrations

None

## Implementation Steps

1. Open `styles.css` for editing
2. Refactor existing styles to be mobile-first:
   - Move desktop-specific styles inside `@media (min-width: 1024px)` query
   - Keep base styles universal or mobile-oriented
3. Add CSS custom properties for breakpoints in `:root`:
   ```css
   --breakpoint-tablet: 768px;
   --breakpoint-desktop: 1024px;
   ```
4. Create mobile base styles (no media query):
   - Single-column grid layout (stack everything)
   - Smaller font sizes (16px base)
   - Reduced padding (0.5rem to 1rem)
   - Nav links stacked vertically
5. Add tablet media query `@media (min-width: 768px)`:
   - Adjust grid layout if needed
   - Increase font sizes slightly
   - Increase padding (1rem to 1.5rem)
   - Consider horizontal nav if it fits
6. Add desktop media query `@media (min-width: 1024px)`:
   - Full grid layout (existing desktop styles)
   - Larger font sizes
   - Generous padding (1.5rem to 2rem)
   - Horizontal nav with full spacing
7. Ensure touch targets are 44x44px minimum on mobile/tablet:
   - Increase padding on nav links for mobile
   - Add min-height/min-width if needed
8. Test horizontal scrolling prevention:
   - Ensure no elements exceed viewport width
   - Use `max-width: 100%` on potentially wide elements
   - Test on actual mobile device or DevTools device emulation
9. Test at all three required viewport sizes:
   - Desktop: 1920x1080
   - Tablet: 768x1024
   - Mobile: 375x667
10. Verify layout adapts smoothly between breakpoints:
    - Test at intermediate sizes (e.g., 900px, 1200px)
    - Ensure no sudden jumps or broken layouts

## Code Changes

### Files to Create/Modify

- `styles.css` - Modify existing file to add:
  - Breakpoint variables in :root
  - Refactored mobile-first base styles (outside media queries)
  - Tablet media query (`@media (min-width: 768px)`) with layout adjustments
  - Desktop media query (`@media (min-width: 1024px)`) with full layout
  - Adjustments to typography scale for each breakpoint
  - Padding/margin adjustments for each breakpoint
  - Nav layout changes for each breakpoint
  - Comments explaining responsive strategy

Example structure:
```css
/* Base styles (mobile) */
body {
  display: grid;
  grid-template-areas:
    "header"
    "nav"
    "main"
    "footer";
}

nav {
  display: flex;
  flex-direction: column; /* Stack links vertically on mobile */
}

/* Tablet styles */
@media (min-width: 768px) {
  body {
    padding: var(--spacing-base);
  }

  nav {
    flex-direction: row; /* Horizontal nav on tablet */
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  body {
    grid-template-areas:
      "header header"
      "nav main"
      "footer footer";
    grid-template-columns: 250px 1fr; /* Example: side nav */
  }
}
```

### Configuration Changes

None

### Migration Steps

None

## Testing Requirements

### Unit Tests

Not applicable for CSS

### Integration Tests

Manual testing is critical for this task:

1. **Mobile Viewport Test (375x667)**:
   - Test: Open index.html in Chrome DevTools, set to iPhone SE viewport (375x667)
   - Expected:
     - Layout is single column (header, nav, main, footer stacked)
     - Nav links are stacked vertically or in a compact horizontal layout
     - Text is readable (minimum 16px)
     - No horizontal scrolling
     - All touch targets are at least 44x44px
   - Verify: Tap on nav links with mouse to simulate touch (adequate size)

2. **Tablet Viewport Test (768x1024)**:
   - Test: Set browser to iPad viewport (768x1024)
   - Expected:
     - Layout adapts appropriately (may introduce 2-column layout)
     - Nav is horizontal with adequate spacing
     - Font sizes slightly larger than mobile
     - Padding more generous than mobile
     - No horizontal scrolling
   - Verify: Layout feels spacious but not too spread out

3. **Desktop Viewport Test (1920x1080)**:
   - Test: Full browser window at 1920x1080 or larger
   - Expected:
     - Full desktop layout (same as task-002)
     - Content max-width prevents excessively long line lengths
     - Nav is fully horizontal with all links visible
     - Generous spacing throughout
     - No horizontal scrolling
   - Verify: Layout looks professional and polished

4. **Intermediate Size Test**:
   - Test: Resize browser window slowly from 320px to 1920px
   - Expected: No sudden layout breaks or awkward states
   - Verify: Smooth transitions at breakpoints

5. **Horizontal Scroll Test**:
   - Test: At each viewport size, scroll horizontally
   - Expected: No horizontal scrollbar appears (body width = 100vw)
   - Verify: All content fits within viewport width

6. **Touch Target Size Test (Mobile)**:
   - Test: Inspect nav links on mobile viewport
   - Expected: Clickable area is at least 44x44px (use DevTools to measure)
   - Verify: Add padding to nav links if needed to meet minimum size

7. **Content Readability Test**:
   - Test: Read a paragraph of sample content at each viewport size
   - Expected: Text is readable, line length appropriate (50-75 characters per line)
   - Verify: Font size is at least 16px on mobile, larger on desktop

8. **Real Device Testing (if possible)**:
   - Test: Open on actual phone, tablet, desktop
   - Expected: Layout works as designed
   - Note: Real devices may reveal issues not visible in browser emulation

### Performance Considerations

- **Media queries**: Keep queries simple (avoid complex feature queries)
- **CSS size**: Media queries should add minimal code (<5KB additional)
- **Reflows**: Changing viewport size may trigger reflows (acceptable for resize events)
- **Print styles**: Consider adding print media query in future (not required for this task)

## Security Considerations

None

## Technical Risks

- **Risk**: Breakpoints may not align with common device sizes
  - **Likelihood**: Medium (device landscape is diverse)
  - **Mitigation**: Use standard breakpoints (768px, 1024px) that cover most devices; test on real devices; add intermediate breakpoints only if needed

- **Risk**: Content may overflow on very small devices (< 320px)
  - **Likelihood**: Low (few devices under 320px)
  - **Mitigation**: Set min-width on body or main content area; test at 320px; accept that sub-320px devices may have minor issues

- **Risk**: Touch targets may be too small on mobile despite best efforts
  - **Likelihood**: Medium (easy to overlook)
  - **Mitigation**: Measure touch targets with DevTools; add padding to nav links; test on real device with actual finger taps

- **Risk**: Layout may look broken at sizes between breakpoints
  - **Likelihood**: Medium (common issue with breakpoint-based design)
  - **Mitigation**: Test at intermediate sizes (e.g., 850px, 950px); use fluid units (%, rem) rather than fixed pixels where possible; add intermediate breakpoints if necessary

## Definition of Done

- [x] styles.css modified with mobile-first approach
- [x] Breakpoint variables added to :root
- [x] Mobile base styles implemented (no media query, stacked layout)
- [x] Tablet media query added (@media min-width: 768px)
- [x] Desktop media query added (@media min-width: 1024px)
- [x] Typography scales appropriately at each breakpoint
- [x] Spacing (padding/margin) scales appropriately at each breakpoint
- [x] Nav layout adapts to each viewport size
- [x] Touch targets are minimum 44x44px on mobile and tablet
- [x] No horizontal scrolling on any viewport size (320px to 1920px+)
- [x] Layout tested at all three required viewports (375x667, 768x1024, 1920x1080)
- [x] Layout tested at intermediate sizes (smooth transitions)
- [x] Real device testing completed (if devices available)
- [x] Code includes comments explaining responsive strategy
- [x] Story acceptance criteria #3 and #5 met (responsive, no horizontal scroll)

## Notes

**Mobile-First vs Desktop-First:**
This task refactors to mobile-first, meaning base styles are for mobile, and media queries add complexity for larger screens. This approach is preferred because:
- Easier to progressively enhance than degrade
- Forces prioritization of essential content
- Better performance on mobile (less CSS to parse)

**Testing Tools:**
- Chrome DevTools Device Mode: F12 > Toggle device toolbar
- Firefox Responsive Design Mode: Ctrl+Shift+M (Windows) or Cmd+Shift+M (Mac)
- Safari Responsive Design Mode: Develop > Enter Responsive Design Mode
- BrowserStack or similar: For real device testing (if available)

**Common Responsive Patterns:**
- **Stacking**: Single column on mobile, multi-column on desktop
- **Reordering**: Change visual order with CSS Grid order property
- **Hiding**: Hide non-essential elements on mobile (use with caution, prefer adapting)
- **Expanding**: Hamburger menu on mobile, full nav on desktop (not required for this task, but common)

**Accessibility Note:**
Responsive design benefits all users, not just mobile users. Users who zoom in effectively create a smaller viewport, so responsive breakpoints ensure the site remains usable at high zoom levels.

**Estimated Time:** 2-3 hours (including thorough testing at all viewport sizes)

**Next Steps:**
After completing this task, the layout will be fully responsive. Task-004 will validate accessibility across all viewport sizes.
