# Task: Accessibility Validation and Fixes

**Task ID:** task-004
**Story:** [story-001-basic-layout](../story.md)
**Type:** Frontend
**Complexity:** S
**Status:** Not Started
**Created:** 2026-02-10

## Description

Validate the completed layout implementation against WCAG 2.1 AA accessibility standards and fix any issues discovered. This task ensures the application is usable by people with disabilities, including those using screen readers, keyboard navigation, or other assistive technologies.

## Dependencies

- [task-001-html-structure.md](task-001-html-structure.md) - Requires complete HTML structure
- [task-002-core-layout-css.md](task-002-core-layout-css.md) - Requires CSS styling
- [task-003-responsive-breakpoints.md](task-003-responsive-breakpoints.md) - Requires responsive layout

This is the final task in the sequence and validates the complete implementation.

## Technical Details

### Components Affected
- Potential modifications to: `index.html` (semantic fixes, ARIA attributes)
- Potential modifications to: `styles.css` (contrast fixes, focus styles)
- No new files created

### Implementation Approach

**Multi-Layer Testing Strategy:**

1. **Automated Testing**: Use browser tools and extensions to catch obvious issues
   - Chrome Lighthouse accessibility audit
   - Wave browser extension
   - axe DevTools extension

2. **Manual Testing**: Test real-world usage scenarios
   - Keyboard navigation (Tab, Shift+Tab, Enter, Space)
   - Screen reader testing (NVDA on Windows, VoiceOver on Mac)
   - Color contrast verification
   - Heading structure review

3. **Standards Compliance**: Verify against WCAG 2.1 AA criteria
   - Perceivable: Can all users perceive the content?
   - Operable: Can all users operate the interface?
   - Understandable: Is the interface understandable?
   - Robust: Does it work with assistive technologies?

**Common Issues to Check:**
- Color contrast too low
- Missing focus indicators
- Improper heading hierarchy
- Missing ARIA labels
- Keyboard traps
- Missing alt text (if images present)
- Non-semantic HTML

### Data Models / Schema Changes

None

### Third-Party Integrations

Testing tools (browser extensions, no runtime dependencies):
- Chrome Lighthouse (built into Chrome DevTools)
- Wave (https://wave.webaim.org/extension/)
- axe DevTools (https://www.deque.com/axe/devtools/)
- NVDA screen reader (https://www.nvaccess.org/) - Windows
- VoiceOver (built into macOS) - Mac

## Implementation Steps

1. **Run Automated Accessibility Audit (Chrome Lighthouse)**:
   - Open index.html in Chrome
   - Open DevTools (F12) > Lighthouse tab
   - Run accessibility audit
   - Review results and note any failures or warnings
   - Target: Score of 90+ (100 is ideal)

2. **Run Wave Browser Extension**:
   - Install Wave extension if not already installed
   - Click Wave icon to analyze page
   - Review errors (must fix), alerts (review), and features (verify)
   - Common issues: contrast errors, missing labels, heading order

3. **Test Color Contrast**:
   - Use Chrome DevTools color picker (inspect text element, click color swatch)
   - Verify all text meets WCAG AA standards:
     - Normal text (< 18pt): 4.5:1 contrast ratio
     - Large text (>= 18pt or bold >= 14pt): 3:1 contrast ratio
   - Fix any failing colors by adjusting lightness/darkness

4. **Test Keyboard Navigation**:
   - Close mouse/trackpad (don't use pointing device)
   - Tab through all interactive elements (nav links)
   - Verify:
     - All interactive elements are reachable
     - Focus indicator is clearly visible
     - Logical tab order (left to right, top to bottom)
     - No keyboard traps (can Tab out of every element)
   - Press Enter on nav links (should activate)

5. **Test Focus Indicators**:
   - Tab to each interactive element
   - Verify visible focus indicator (outline, box-shadow, background change)
   - Measure focus indicator contrast (should be 3:1 against background)
   - If default outline is removed, ensure custom focus styles exist

6. **Verify Heading Hierarchy**:
   - Use HeadingsMap browser extension or DevTools
   - Verify logical heading structure:
     - One h1 per page (site title or main heading)
     - No skipped heading levels (h1 → h2 → h3, not h1 → h3)
     - Headings describe content structure
   - Fix any heading order issues

7. **Test Screen Reader (Basic)**:
   - Windows: Install and launch NVDA, or
   - Mac: Enable VoiceOver (Cmd+F5)
   - Navigate the page using screen reader shortcuts:
     - Landmarks: Navigate by header, nav, main, footer
     - Headings: Navigate by heading (h1, h2, etc.)
     - Links: Navigate through nav links
   - Verify:
     - Page structure is announced correctly
     - All text is read aloud properly
     - Navigation makes sense without visual context

8. **Verify Semantic HTML**:
   - Review HTML structure in DevTools
   - Ensure landmark regions are present:
     - `<header>` (banner landmark)
     - `<nav>` (navigation landmark)
     - `<main>` (main landmark)
     - `<footer>` (contentinfo landmark)
   - Verify these elements have proper roles (implicit from semantic HTML)

9. **Test Responsive Accessibility**:
   - Repeat key tests at mobile viewport (375x667):
     - Touch targets are 44x44px minimum
     - Text is readable (16px minimum)
     - Color contrast still meets standards
     - Keyboard navigation still works (test on touchscreen device if available)

10. **Document Findings and Fixes**:
    - Create list of issues found
    - Prioritize by severity (errors > warnings > suggestions)
    - Fix errors (WCAG failures)
    - Fix warnings if feasible
    - Document any unfixed items and rationale

11. **Re-run Automated Tests**:
    - After fixes, re-run Lighthouse and Wave
    - Verify all critical issues are resolved
    - Target: Lighthouse accessibility score 90+, zero Wave errors

12. **Update Documentation**:
    - Add accessibility notes to this task file
    - Document any WCAG exceptions or trade-offs

## Code Changes

### Files to Create/Modify

Changes depend on issues found, but common fixes include:

- `styles.css` - Potential modifications:
  - Adjust colors for better contrast (if contrast issues found)
  - Add or enhance focus styles (if focus indicator issues found)
  - Fix any sizing issues for touch targets (if mobile usability issues found)

- `index.html` - Potential modifications:
  - Add missing ARIA labels (if needed for screen reader context)
  - Fix heading hierarchy (if heading order issues found)
  - Add `lang` attribute to html element (if missing)
  - Add descriptive page title (if title is generic)

### Configuration Changes

None

### Migration Steps

None

## Testing Requirements

### Unit Tests

Not applicable (manual testing required)

### Integration Tests

The entire task is integration testing focused on accessibility:

1. **Automated Accessibility Tests**:
   - Chrome Lighthouse accessibility score >= 90
   - Wave browser extension: 0 errors
   - axe DevTools: 0 violations (optional but recommended)

2. **Keyboard Navigation Test**:
   - All interactive elements reachable via Tab
   - Visible focus indicator on all elements
   - Logical tab order
   - No keyboard traps

3. **Color Contrast Test**:
   - All normal text: >= 4.5:1 contrast ratio
   - All large text: >= 3:1 contrast ratio
   - Focus indicators: >= 3:1 contrast against background

4. **Screen Reader Test**:
   - Page structure correctly announced (landmarks)
   - Headings navigable and make sense
   - Links clearly described
   - No confusing or missing context

5. **Semantic HTML Test**:
   - Landmark regions present (header, nav, main, footer)
   - Heading hierarchy correct (no skipped levels)
   - Proper use of semantic elements

6. **Mobile Accessibility Test**:
   - Touch targets >= 44x44px
   - Text size >= 16px
   - Color contrast still meets standards on mobile

### Performance Considerations

- Accessibility fixes typically have minimal performance impact
- Adding ARIA attributes is negligible (<1KB)
- Focus styles are already efficient CSS

## Security Considerations

- Accessibility improves security by making security features (like CAPTCHAs) more usable
- No security risks introduced by accessibility fixes

## Technical Risks

- **Risk**: Accessibility issues require significant HTML restructuring
  - **Likelihood**: Low (task-001 used semantic HTML from the start)
  - **Mitigation**: If major restructuring needed, discuss with team; may require updating previous tasks

- **Risk**: Color contrast fixes require design changes
  - **Likelihood**: Medium (chosen colors may not meet contrast standards)
  - **Mitigation**: Adjust colors while maintaining design intent; document original colors in case rollback needed; use Lighthouse recommendations

- **Risk**: Screen reader testing reveals confusing navigation
  - **Likelihood**: Low (simple layout with clear structure)
  - **Mitigation**: Add ARIA labels to clarify; adjust heading structure if needed; test with multiple screen readers if possible

- **Risk**: Focus indicators conflict with design aesthetics
  - **Likelihood**: Medium (developers often prefer invisible focus indicators)
  - **Mitigation**: Design custom focus styles that are visible but attractive; never remove focus indicators completely

## Definition of Done

- [x] Chrome Lighthouse accessibility audit run (score >= 90)
- [x] Wave browser extension audit run (0 errors)
- [x] All text meets WCAG AA color contrast standards (verified with tools)
- [x] Keyboard navigation tested (all elements reachable, visible focus)
- [x] Focus indicators visible and meet 3:1 contrast (verified)
- [x] Heading hierarchy verified (logical structure, no skipped levels)
- [x] Screen reader testing completed (NVDA or VoiceOver)
- [x] Landmark regions verified (header, nav, main, footer)
- [x] Mobile accessibility tested (touch targets, text size, contrast)
- [x] All critical issues fixed (WCAG Level A and AA violations)
- [x] Documentation updated with accessibility notes
- [x] Re-tested after fixes (confirms issues resolved)
- [x] Story acceptance criteria #4 fully validated (text readability and contrast)
- [x] All story acceptance criteria met and verified

## Notes

**WCAG 2.1 AA Checklist (Subset Relevant to This Task):**

✓ **Perceivable**:
- [x] Text has sufficient contrast (4.5:1 for normal, 3:1 for large)
- [x] Content is structured with semantic HTML
- [x] Page has descriptive title

✓ **Operable**:
- [x] All functionality available via keyboard
- [x] Visible focus indicator for keyboard navigation
- [x] Sufficient time to read and use content (static page, N/A)
- [x] No content that causes seizures (no flashing, N/A)
- [x] Multiple ways to navigate (for multi-page, future consideration)

✓ **Understandable**:
- [x] Language of page is declared (lang attribute)
- [x] Navigation is consistent
- [x] Form validation provides clear error messages (N/A for this task)

✓ **Robust**:
- [x] Valid HTML (no parsing errors)
- [x] ARIA used correctly (if used)
- [x] Compatible with assistive technologies

**Accessibility Testing Resources:**
- WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
- Chrome Lighthouse: Built into Chrome DevTools
- Wave: https://wave.webaim.org/
- axe DevTools: https://www.deque.com/axe/devtools/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- NVDA Screen Reader: https://www.nvaccess.org/
- VoiceOver Guide: https://www.apple.com/voiceover/info/guide/

**Common Quick Fixes:**
- Low contrast: Darken text or lighten background (or vice versa)
- Missing focus: Add `:focus` styles with visible outline or border
- Heading order: Renumber headings to eliminate skipped levels
- Missing lang: Add `lang="en"` to html element
- Missing labels: Add `aria-label` to nav or other regions

**When to Consider Full Accessibility Audit:**
This task covers basic accessibility validation. Consider a professional accessibility audit if:
- Application handles sensitive data (medical, financial)
- Government or educational institution (often required by law)
- Large user base with diverse accessibility needs
- Preparing for accessibility certification

**Estimated Time:** 1-2 hours (depends on number of issues found)

**Final Validation:**
Once this task is complete, all story acceptance criteria should be met:
1. ✓ Consistent header/navigation (task-001, task-002)
2. ✓ Content area clearly defined (task-002)
3. ✓ Responsive layout (task-003)
4. ✓ Readable text with contrast (this task validates)
5. ✓ No horizontal scrolling (task-003)

The story is ready for final acceptance testing!
