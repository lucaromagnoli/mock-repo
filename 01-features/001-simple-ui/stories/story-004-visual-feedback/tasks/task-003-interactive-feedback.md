# Task: Interactive Element Feedback

**Task ID:** task-003
**Story:** [story-004-visual-feedback](../story.md)
**Type:** Frontend
**Complexity:** S
**Status:** Not Started
**Created:** 2026-02-10

## Description

Implement visual feedback for all interactive elements including hover states, active/pressed states, focus indicators for keyboard navigation, and disabled states. Ensure consistent, accessible, and performant interactions across all clickable elements (buttons, links, form inputs, cards, etc.).

## Dependencies

- [task-001-toast-notification-system.md](task-001-toast-notification-system.md) - For showing validation errors on form interactions

## Technical Details

### Components Affected

- Global CSS for interactive states
- All button components
- Form input elements (text, select, checkbox, radio)
- Link elements
- Card/tile components
- Navigation menu items
- Modal close buttons and interactive elements

### Implementation Approach

**Pattern:** CSS-first with progressive enhancement

**Why this approach:**
- CSS pseudo-classes (`:hover`, `:active`, `:focus`) provide instant feedback without JavaScript
- GPU-accelerated transitions ensure smooth 60fps interactions
- Declarative CSS scales across all interactive elements automatically
- JavaScript enhancement for complex interactions (ripple effects, haptic feedback)

**Key principles:**
- **Immediate feedback**: Visual change within 16ms (1 frame at 60fps)
- **Predictable behavior**: Consistent patterns across similar elements
- **Accessible**: Works with keyboard, mouse, touch, and assistive technology
- **Subtle but noticeable**: Enhancement without distraction

**Integration points:**
- Base interactive styles apply globally
- Component-specific styles extend base styles
- JavaScript event handlers for advanced feedback
- Integration with form validation and error display

### Data Models / Schema Changes

None - purely presentational CSS and minimal JavaScript enhancements

### Third-Party Integrations

None

## Implementation Steps

1. **Define global interactive state CSS variables**
   - Create CSS custom properties for colors, transitions, shadows
   - Define timing functions for smooth animations
   - Set up color palette for different states (hover, active, focus, disabled)
   - Ensure WCAG AA contrast requirements met

2. **Implement button hover and active states**
   - Hover: Darken background by 10%, add subtle shadow
   - Active: Scale down by 2% (`transform: scale(0.98)`), darken more
   - Transition duration: 150ms with ease-out timing
   - Apply to all button variants (primary, secondary, danger, text)

3. **Add focus indicators for keyboard navigation**
   - Visible focus ring using `outline` or `box-shadow`
   - Contrast ratio: 3:1 minimum against background (WCAG 2.2)
   - Focus-visible: Only show for keyboard, not mouse clicks
   - Apply to all focusable elements (buttons, links, inputs)

4. **Implement form input interactive states**
   - Focus: Blue border, subtle shadow
   - Error: Red border, shake animation on validation failure
   - Success: Green border (for validated inputs)
   - Disabled: Grayscale, reduced opacity, cursor: not-allowed
   - Placeholder animation: Fade in/out on focus

5. **Add link hover and active states**
   - Hover: Underline animation (expand from center)
   - Active: Slight color darkening
   - Visited links: Distinct color for accessibility
   - External links: Optional icon with smooth transition

6. **Implement card/tile interactive states**
   - Hover: Elevation increase (shadow deepens), slight scale up (1.02x)
   - Active: Scale down slightly (0.98x)
   - Smooth transition: 200ms ease-out
   - Cursor changes to pointer on hover

7. **Add disabled state styling**
   - Reduced opacity (0.6)
   - Grayscale filter
   - cursor: not-allowed
   - Prevent pointer events
   - ARIA attribute: `aria-disabled="true"`

8. **Implement accessibility enhancements**
   - Respect `prefers-reduced-motion` (disable transitions)
   - Ensure focus indicators have sufficient contrast
   - Add skip-to-content link for keyboard users
   - Test with keyboard-only navigation
   - Verify screen reader announcements

## Code Changes

### Files to Create/Modify

- `src/styles/interactive.css` - Global interactive state styles
- `src/styles/buttons.css` - Button-specific interactive states
- `src/styles/forms.css` - Form input interactive states
- `src/styles/links.css` - Link interactive states
- `src/styles/cards.css` - Card/tile interactive states
- `src/styles/variables.css` - CSS custom properties for colors and transitions
- `src/utils/focus-visible.js` - Polyfill for :focus-visible support (if needed)

### Configuration Changes

None

### Migration Steps

None - new styling added to existing elements

## Testing Requirements

### Unit Tests

- **CSS specificity**: Verify interactive states don't conflict with component styles
- **State transitions**: Confirm smooth animations between states
- **Color contrast**: Validate WCAG AA compliance for all interactive states
- **Focus management**: Test tab order is logical and focus is visible
- **Edge cases**:
  - Rapidly hover on/off elements
  - Keyboard and mouse interaction together
  - Nested interactive elements (button inside link)
  - Disabled elements don't respond to interaction

### Integration Tests

- **Keyboard navigation**: Tab through entire page, verify all interactive elements are reachable
- **Screen reader**: Test with NVDA/JAWS/VoiceOver for proper announcements
- **Touch devices**: Verify active states work on mobile (no sticky hover)
- **Reduced motion**: Confirm animations respect user preference
- **Cross-browser**: Test on Chrome, Firefox, Safari, Edge
- **Form interaction flow**: Focus → Type → Blur → Validation → Error display
- **Button interaction**: Hover → Click → Loading state → Success feedback

### Performance Considerations

- **Animation frame rate**: Maintain 60fps during all transitions
- **GPU acceleration**: Use `transform` and `opacity` for animations
- **Paint flashing**: Minimize repaint regions
- **Interaction latency**: Visual feedback within 100ms of user action (ideally 16ms)
- **CSS bundle size**: Keep interactive styles under 5KB

## Security Considerations

None - purely presentational with no user input handling

## Technical Risks

### Risk 1: Hover states persist on touch devices ("sticky hover")
**Mitigation:**
- Use `@media (hover: hover)` to apply hover styles only on hover-capable devices
- Add touch-specific active states
- Reset hover state on touchend event

### Risk 2: Focus indicators interfere with design aesthetic
**Mitigation:**
- Use `:focus-visible` to show focus only for keyboard navigation
- Design attractive focus indicators that complement UI
- Work with design team to create brand-appropriate focus styles

### Risk 3: Animation jank on low-end devices
**Mitigation:**
- Use GPU-accelerated properties only (transform, opacity)
- Test on low-end Android devices
- Respect `prefers-reduced-motion`
- Simplify animations if performance issues detected

## Definition of Done

- [ ] Code implemented following project standards
- [ ] Global interactive state CSS with custom properties
- [ ] Button hover, active, focus states implemented
- [ ] Form input interactive states implemented
- [ ] Link interactive states with underline animation
- [ ] Card/tile hover effects implemented
- [ ] Disabled state styling consistent across elements
- [ ] Focus indicators visible and WCAG 2.2 compliant
- [ ] Unit tests for CSS specificity and state transitions
- [ ] Integration tests for keyboard navigation completed
- [ ] Accessibility testing with screen readers completed
- [ ] Reduced motion support verified
- [ ] Touch device testing (no sticky hover) completed
- [ ] Performance testing (60fps animations) passed
- [ ] Code reviewed and approved
- [ ] Documentation: Interactive state design guidelines
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Story acceptance criteria validated (AC 4)

## Notes

### CSS Implementation Examples

```css
/* CSS Custom Properties */
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-active: #1d4ed8;

  --transition-fast: 150ms ease-out;
  --transition-normal: 200ms ease-out;

  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-active: 0 2px 6px rgba(0, 0, 0, 0.1);

  --focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

/* Button Interactive States */
.btn {
  transition: all var(--transition-fast);
  cursor: pointer;
}

.btn:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-hover);
}

.btn:active {
  background-color: var(--color-primary-active);
  transform: scale(0.98);
  box-shadow: var(--shadow-active);
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  filter: grayscale(50%);
}

/* Form Input Interactive States */
.input {
  transition: border-color var(--transition-fast),
              box-shadow var(--transition-fast);
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.input.error {
  border-color: #ef4444;
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* Link Interactive States */
.link {
  position: relative;
  text-decoration: none;
  color: var(--color-primary);
}

.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width var(--transition-normal),
              left var(--transition-normal);
}

.link:hover::after {
  width: 100%;
  left: 0;
}

/* Card Interactive States */
.card {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
  cursor: pointer;
}

.card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--shadow-hover);
}

.card:active {
  transform: scale(0.98);
}

/* Respect Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Touch Device Hover Prevention */
@media (hover: none) {
  .btn:hover {
    background-color: var(--color-primary);
    box-shadow: none;
  }
}
```

### Accessibility Checklist

- [ ] All interactive elements are keyboard accessible (Tab/Enter)
- [ ] Focus indicators have 3:1 contrast ratio minimum
- [ ] `:focus-visible` used to avoid mouse focus rings
- [ ] Disabled elements have `aria-disabled="true"`
- [ ] Color is not the only indicator of state (use icons, text)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Touch targets are minimum 44x44px (WCAG 2.5.5)
- [ ] Screen readers announce button states correctly

### Design Tokens

```javascript
// Interactive state design tokens
export const interactiveStates = {
  hover: {
    brightnessAdjust: 0.9,    // Darken by 10%
    shadowIntensity: 'medium',
    scaleAdjust: 1.0,          // No scale on hover (or 1.02 for cards)
  },
  active: {
    brightnessAdjust: 0.85,   // Darken by 15%
    shadowIntensity: 'low',
    scaleAdjust: 0.98,         // Subtle press effect
  },
  focus: {
    ringColor: 'primary-500',
    ringOpacity: 0.5,
    ringWidth: '3px',
    ringOffset: '2px',
  },
  disabled: {
    opacity: 0.6,
    grayscale: '50%',
    cursor: 'not-allowed',
  },
  transition: {
    fast: '150ms',
    normal: '200ms',
    timing: 'ease-out',
  },
};
```

### Follow-up items
- Add ripple effect for material design style interactions
- Implement haptic feedback for mobile devices
- Consider adding sound effects for critical actions (opt-in)
- Add micro-animations for delight (e.g., checkbox check animation)
