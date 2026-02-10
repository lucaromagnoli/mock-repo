# Task: Navigation HTML Structure

**Task ID:** task-001
**Story:** [Navigation Menu](../story.md)
**Type:** Frontend
**Complexity:** S
**Status:** Not Started
**Created:** 2026-02-10

## Description

Create the semantic HTML structure for the navigation menu that will serve as the foundation for styling and JavaScript functionality. This includes the desktop navigation bar, mobile hamburger menu button, and all necessary accessibility attributes (ARIA labels, roles, etc.).

The HTML structure must be reusable across all pages and support both desktop horizontal navigation and mobile hamburger menu patterns.

## Dependencies

- None (this is the foundational task)

## Technical Details

### Components Affected

- New file: `navigation.html` (reusable navigation component)
- New file: `index.html` (demo page to test navigation)
- Project root directory structure

### Implementation Approach

- **Semantic HTML5**: Use `<nav>`, `<ul>`, `<li>`, `<a>` elements for proper document structure
- **Accessibility-first**: Include ARIA attributes from the start (aria-label, aria-expanded, aria-current)
- **Mobile-first markup**: Include hamburger button in HTML (hidden via CSS on desktop)
- **Reusable component pattern**: Create self-contained navigation HTML that can be included via server-side includes, iframe, or copy-paste

**Why this approach:**
- Semantic HTML improves SEO and accessibility
- ARIA attributes ensure screen reader compatibility
- Having both mobile and desktop elements in single HTML simplifies maintenance
- Matches the vanilla JS approach of the existing codebase

### Data Models / Schema Changes

None

### Third-Party Integrations

None

## Implementation Steps

1. Create `navigation.html` file in project root with complete navigation structure
2. Add `<nav>` element with appropriate ARIA label
3. Create hamburger button (`<button>`) with:
   - ARIA attributes (aria-label, aria-expanded, aria-controls)
   - BEM class naming (nav__toggle)
   - Hidden on desktop via CSS class
4. Create navigation list (`<ul>`) with:
   - Semantic list structure (`<li>` items)
   - Link elements (`<a>`) for each menu item
   - Data attributes for active page detection (data-nav-item)
5. Define initial menu items (Home, About, Services, Contact)
6. Create `index.html` demo page that includes the navigation
7. Add proper document structure (DOCTYPE, head, body)
8. Include placeholders for CSS and JS files

## Code Changes

### Files to Create/Modify

- `navigation.html` - **CREATE**: Reusable navigation component with full HTML structure
- `index.html` - **CREATE**: Demo page to test navigation implementation
- `nav.css` - **PLACEHOLDER**: Link to future CSS file (created in task-002)
- `nav.js` - **PLACEHOLDER**: Link to future JS file (created in task-003)

### Configuration Changes

None

### Migration Steps

None

## Testing Requirements

### Unit Tests

Not applicable for HTML structure (no logic to unit test)

### Integration Tests

- **Visual inspection**: Load index.html in browser, verify all elements are present
- **HTML validation**: Run through W3C HTML validator (https://validator.w3.org/)
- **Accessibility check**: Run through WAVE or axe DevTools browser extension
  - Verify ARIA attributes are correct
  - Check for semantic structure warnings
  - Ensure link elements have accessible names
- **Screen reader test**: Use NVDA (Windows) or VoiceOver (Mac) to verify navigation is announced correctly

### Performance Considerations

None (HTML structure has minimal performance impact)

## Security Considerations

- **URL safety**: Ensure all `href` attributes use relative URLs (no external links in initial implementation)
- **XSS prevention**: No user-generated content in this task, but document that future dynamic menu items must sanitize URLs
- **No inline JavaScript**: Keep HTML, CSS, and JS separated for Content Security Policy compatibility

## Technical Risks

- **Risk**: HTML structure may need changes if CSS or JS requirements differ from expectations
  - **Mitigation**: Review task-002 and task-003 specifications before finalizing HTML structure. Keep markup flexible with data attributes and BEM classes.

- **Risk**: Accessibility attributes may be incorrect or incomplete
  - **Mitigation**: Follow ARIA Authoring Practices Guide for disclosure navigation pattern. Test with screen readers early. Use automated accessibility tools (axe, WAVE).

## Definition of Done

- [x] `navigation.html` created with complete semantic structure
- [x] Hamburger button includes proper ARIA attributes (aria-label, aria-expanded="false", aria-controls)
- [x] Navigation list includes 4+ menu items with links
- [x] Each link has data attribute for active state detection (e.g., data-nav-item="home")
- [x] `index.html` demo page created and includes navigation
- [x] HTML validates without errors via W3C validator
- [x] WAVE or axe accessibility scan shows no critical errors
- [x] Screen reader announces navigation correctly (tested with NVDA or VoiceOver)
- [x] Code follows BEM naming convention for classes
- [x] Documentation comments explain structure and purpose

## Notes

### BEM Naming Convention

Use Block-Element-Modifier (BEM) methodology:
- **Block**: `nav` (the navigation component)
- **Elements**: `nav__toggle`, `nav__menu`, `nav__item`, `nav__link`
- **Modifiers**: `nav__link--active`, `nav__menu--open` (added via JS in task-003)

Example:
```html
<nav class="nav">
  <button class="nav__toggle" aria-label="Open menu">...</button>
  <ul class="nav__menu">
    <li class="nav__item">
      <a href="/" class="nav__link" data-nav-item="home">Home</a>
    </li>
  </ul>
</nav>
```

### Menu Items to Include

Initial navigation items (can be expanded later):
1. **Home** - `/` or `/index.html`
2. **About** - `/about.html`
3. **Services** - `/services.html`
4. **Contact** - `/contact.html`

### Accessibility Reference

Follow WAI-ARIA Authoring Practices for disclosure navigation:
https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/

Key ARIA attributes:
- `aria-label="Main navigation"` on `<nav>`
- `aria-label="Open menu"` on hamburger button
- `aria-expanded="false"` on hamburger button (toggled by JS)
- `aria-controls="nav-menu"` on hamburger button (references menu ID)
- `aria-current="page"` on active link (added by JS in task-003)

### Code Example

See implementation steps above for detailed structure. Final code should be ~40-60 lines of clean, semantic HTML.
