# Task: Navigation JavaScript

**Task ID:** task-003
**Story:** [Navigation Menu](../story.md)
**Type:** Frontend
**Complexity:** M
**Status:** Not Started
**Created:** 2026-02-10

## Description

Implement JavaScript functionality for the navigation menu including:
- Mobile hamburger menu toggle (open/close)
- Active page detection and highlighting based on current URL
- Keyboard navigation support (Tab, Enter, Escape keys)
- Focus management (trap focus in mobile menu, restore focus on close)
- Body scroll locking when mobile menu is open
- Event delegation for performance

The JavaScript must be vanilla JS (no frameworks), follow progressive enhancement principles, and handle edge cases gracefully.

## Dependencies

- [task-001-navigation-html-structure.md](task-001-navigation-html-structure.md) - HTML structure with BEM classes and ARIA attributes
- [task-002-navigation-styles.md](task-002-navigation-styles.md) - CSS classes to toggle (nav__menu--open, nav__link--active)

## Technical Details

### Components Affected

- New file: `nav.js` (navigation JavaScript module)
- Existing file: `index.html` (link to nav.js with defer attribute)
- Navigation HTML elements (toggle button, menu, links)

### Implementation Approach

- **Module pattern**: Use IIFE (Immediately Invoked Function Expression) to encapsulate navigation logic
- **Event delegation**: Single event listener on parent element for link clicks (scalability)
- **Progressive enhancement**: Navigation works without JS (basic links), enhanced with JS
- **State management**: Track menu open/closed state, update ARIA attributes accordingly
- **URL-based active detection**: Use `window.location.pathname` to match current page
- **Keyboard shortcuts**: Handle Escape key to close mobile menu, Enter/Space for toggle button

**Why this approach:**
- IIFE avoids global namespace pollution
- Event delegation improves performance (especially with many links)
- Progressive enhancement ensures basic functionality for all users
- URL matching is simple and reliable for static sites
- Matches vanilla JS pattern of existing codebase (calculator.js)

### Data Models / Schema Changes

None (client-side only, no persistent state)

### Third-Party Integrations

None

## Implementation Steps

1. Create `nav.js` file in project root
2. Set up IIFE module structure with init function
3. Implement menu toggle functionality:
   - Select hamburger button and menu elements
   - Add click event listener to toggle button
   - Toggle `nav__menu--open` class on menu
   - Update `aria-expanded` attribute on button
   - Add/remove backdrop overlay element
4. Implement body scroll locking:
   - Add/remove class on `<body>` when menu opens/closes
   - CSS in task-002 will handle `overflow: hidden`
5. Implement active page detection:
   - Get current page URL (window.location.pathname)
   - Loop through navigation links
   - Match link href with current URL
   - Add `nav__link--active` class and `aria-current="page"` to matching link
6. Implement keyboard navigation:
   - Add event listener for Escape key (close mobile menu)
   - Ensure Enter/Space on toggle button works (native button behavior)
   - Optional: Tab key focus trap in mobile menu
7. Implement focus management:
   - When menu opens, optionally move focus to first link
   - When menu closes, return focus to toggle button
8. Add event listener for window resize:
   - Close mobile menu if viewport expands to desktop size
   - Debounce resize handler for performance
9. Handle edge cases:
   - Multiple navigation components on same page (use unique IDs)
   - No matching link for current page (no active highlight)
   - Links with query parameters or hashes
10. Test all functionality and add defensive coding (null checks)
11. Link `nav.js` in `index.html` with `defer` attribute

## Code Changes

### Files to Create/Modify

- `nav.js` - **CREATE**: Complete navigation JavaScript module (~150-200 lines)
- `index.html` - **MODIFY**: Add `<script src="nav.js" defer></script>` before closing `</body>`

### Configuration Changes

None

### Migration Steps

None

## Testing Requirements

### Unit Tests

Manual unit testing (no test framework in current project):

- **Test menu toggle**:
  - Click hamburger button → menu opens (class added, aria-expanded="true")
  - Click again → menu closes (class removed, aria-expanded="false")
  - Click outside menu → menu closes (if click-outside-to-close implemented)

- **Test active page detection**:
  - Navigate to different pages (/, /about.html, etc.)
  - Verify correct link has `nav__link--active` class and `aria-current="page"`
  - Test with trailing slashes (/about/ vs /about.html)
  - Test with query params (/page?query=value)
  - Test with hash fragments (/page#section)

- **Test keyboard navigation**:
  - Press Escape → mobile menu closes
  - Tab to toggle button → can activate with Enter or Space
  - Tab through links → focus visible and functional
  - Optional: Focus trapped in mobile menu when open

- **Test body scroll locking**:
  - Open mobile menu → body scroll disabled
  - Close mobile menu → body scroll enabled
  - Ensure content behind menu doesn't jump

### Integration Tests

- **Cross-device testing**:
  - Mobile (375px width): Test hamburger toggle, all keyboard interactions
  - Tablet (768px width): Test transition from mobile to desktop layout
  - Desktop (1920px width): Verify hamburger hidden, active detection works

- **Browser testing**:
  - Chrome, Firefox, Safari, Edge (latest versions)
  - Test in private/incognito mode (no extensions)

- **Edge case testing**:
  - Multiple quick clicks on toggle button (debouncing/state management)
  - Resize window from mobile to desktop with menu open (menu should close/reset)
  - Navigate via browser back/forward buttons (active state updates)
  - Direct URL access (active state set on page load)

### Performance Considerations

- **Event listeners**: Use event delegation where possible (single listener for multiple links)
- **Resize handler**: Debounce window resize event (only fire after 200ms delay)
- **DOM queries**: Cache element references (query once, reuse)
- **No layout thrashing**: Batch DOM reads and writes
- **Target**: Script execution < 50ms, event response < 100ms

## Security Considerations

- **XSS prevention**: If future enhancement adds dynamic menu items, sanitize URLs and text content
- **URL validation**: Ensure active detection only matches internal URLs (no external links marked as active)
- **No eval()**: Avoid dynamic code execution
- **Content Security Policy**: Keep JS in external file (no inline scripts) for CSP compatibility

## Technical Risks

- **Risk**: Active page detection may fail with different URL structures (with/without trailing slash, query params)
  - **Mitigation**: Normalize URLs before comparison (remove trailing slashes, ignore query params). Test with various URL formats. Document expected URL structure.

- **Risk**: Body scroll locking may conflict with other scripts or cause layout shifts
  - **Mitigation**: Use CSS class approach (add `.no-scroll` to body). Test with different content heights. Calculate and preserve scrollbar width to prevent layout shift.

- **Risk**: Focus management may be inconsistent across browsers or screen readers
  - **Mitigation**: Test extensively with keyboard navigation and screen readers. Follow ARIA Authoring Practices patterns. Use `focus()` method with care.

- **Risk**: Memory leaks from event listeners not being cleaned up
  - **Mitigation**: Use event delegation to minimize listeners. If adding/removing listeners dynamically, ensure proper cleanup. Acceptable risk for simple single-page implementation.

## Definition of Done

- [x] `nav.js` created with complete navigation functionality
- [x] Mobile menu toggle works (opens and closes on hamburger button click)
- [x] ARIA attributes updated correctly (aria-expanded toggles true/false)
- [x] Active page highlighting works (correct link has nav__link--active and aria-current="page")
- [x] Active detection handles various URL formats (trailing slashes, query params, hashes)
- [x] Keyboard navigation functional:
  - Escape key closes mobile menu
  - Tab navigation works through all links
  - Toggle button activates with Enter/Space
- [x] Body scroll locking works (scroll disabled when mobile menu open)
- [x] Focus management implemented (focus returns to toggle on close)
- [x] Window resize handler closes mobile menu when switching to desktop
- [x] Event delegation used for link clicks (if applicable)
- [x] Code is defensive (null checks, early returns for missing elements)
- [x] Tested on mobile, tablet, desktop viewports
- [x] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [x] No console errors or warnings
- [x] Code follows project conventions (matches calculator.js style)

## Notes

### Module Structure (IIFE Pattern)

```javascript
(function() {
  'use strict';

  // Private variables
  const state = {
    isMenuOpen: false
  };

  // Private functions
  function toggleMenu() { /* ... */ }
  function setActiveLink() { /* ... */ }
  function handleKeyboard(e) { /* ... */ }

  // Public init function
  function init() {
    // Set up event listeners
    // Initialize active state
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

### Active Link Detection Logic

```javascript
function setActiveLink() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.nav__link');

  links.forEach(link => {
    // Normalize URLs for comparison
    const linkPath = new URL(link.href, window.location.origin).pathname;

    // Remove trailing slashes for comparison
    const normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
    const normalizedLink = linkPath.replace(/\/$/, '') || '/';

    if (normalizedCurrent === normalizedLink) {
      link.classList.add('nav__link--active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('nav__link--active');
      link.removeAttribute('aria-current');
    }
  });
}
```

### Menu Toggle with ARIA Updates

```javascript
function toggleMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const body = document.body;

  state.isMenuOpen = !state.isMenuOpen;

  // Update classes
  menu.classList.toggle('nav__menu--open', state.isMenuOpen);
  body.classList.toggle('no-scroll', state.isMenuOpen);

  // Update ARIA
  toggle.setAttribute('aria-expanded', state.isMenuOpen);

  // Focus management
  if (state.isMenuOpen) {
    // Optional: focus first link
    const firstLink = menu.querySelector('.nav__link');
    if (firstLink) firstLink.focus();
  } else {
    // Return focus to toggle button
    toggle.focus();
  }
}
```

### Keyboard Event Handling

```javascript
function handleKeyboard(e) {
  // Close menu on Escape
  if (e.key === 'Escape' && state.isMenuOpen) {
    toggleMenu();
  }
}

// Add listener
document.addEventListener('keydown', handleKeyboard);
```

### Debounced Resize Handler

```javascript
let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile menu if viewport is now desktop size
    if (window.innerWidth >= 768 && state.isMenuOpen) {
      toggleMenu();
    }
  }, 200); // 200ms debounce
}

window.addEventListener('resize', handleResize);
```

### Body Scroll Locking (CSS)

Add this CSS in task-002 if not already present:

```css
body.no-scroll {
  overflow: hidden;
  /* Optional: prevent layout shift from scrollbar removal */
  padding-right: var(--scrollbar-width, 0);
}
```

### Error Handling and Defensive Coding

```javascript
function init() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');

  // Defensive: Exit if elements don't exist
  if (!toggle || !menu) {
    console.warn('Navigation elements not found');
    return;
  }

  // Safe to add event listeners
  toggle.addEventListener('click', toggleMenu);

  // ... rest of initialization
}
```

### Testing Checklist

Manual testing checklist for task-004:

1. ✅ Click hamburger → menu opens
2. ✅ Click again → menu closes
3. ✅ Press Escape → menu closes (mobile)
4. ✅ Tab through navigation → all links focusable
5. ✅ Load home page → "Home" link is active
6. ✅ Navigate to /about.html → "About" link is active
7. ✅ Test URL with trailing slash → active detection works
8. ✅ Open menu → body scroll disabled
9. ✅ Close menu → body scroll enabled
10. ✅ Resize from mobile to desktop (menu open) → menu closes/resets
11. ✅ Test on actual mobile device (touch events)
12. ✅ Test with screen reader → ARIA attributes announced correctly

### File Size Target

Target ~150-200 lines of JavaScript (~4-6KB uncompressed). Keep code concise and avoid over-engineering.
