# Accessibility Testing Checklist

Manual testing checklist for WCAG 2.1 AA compliance.

## Screen Reader Testing

### NVDA (Windows)

#### Button Component
- [ ] Button announces label and role ("button")
- [ ] Button announces state (disabled, pressed if applicable)
- [ ] Loading state announced when aria-busy changes
- [ ] Focus changes are announced
- [ ] Keyboard shortcut (Enter/Space) works

#### Input Component
- [ ] Label is announced when input receives focus
- [ ] Input type is announced (e.g., "edit text", "password")
- [ ] Required state is announced
- [ ] Help text is announced (aria-describedby)
- [ ] Error messages are announced immediately (aria-live)
- [ ] Invalid state is announced (aria-invalid)
- [ ] Password toggle announces state change

### JAWS (Windows)

#### Button Component
- [ ] Button announces label and role
- [ ] Disabled state is announced
- [ ] Loading state is announced
- [ ] All interactions work with JAWS active

#### Input Component
- [ ] Label announced on focus
- [ ] Help text announced
- [ ] Error messages announced dynamically
- [ ] Form mode works correctly

### VoiceOver (macOS)

#### Button Component
- [ ] Button announces label and role
- [ ] VO+Space activates button
- [ ] Disabled state announced
- [ ] Loading state announced

#### Input Component
- [ ] Label announced on focus
- [ ] VO+Right/Left navigates through field
- [ ] Error messages announced
- [ ] Help text accessible

### VoiceOver (iOS)

#### Button Component
- [ ] Tap to select, double-tap to activate
- [ ] Label and role announced
- [ ] Disabled state announced

#### Input Component
- [ ] Focus moves to input on tap
- [ ] Virtual keyboard appears
- [ ] Error messages announced
- [ ] Form navigation works

### TalkBack (Android)

#### Button Component
- [ ] Button announces label and role
- [ ] Double-tap to activate
- [ ] Disabled state announced

#### Input Component
- [ ] Label announced on focus
- [ ] Error messages announced
- [ ] Virtual keyboard appears appropriately

---

## Keyboard Testing

### General Navigation
- [ ] Tab moves focus forward through all interactive elements
- [ ] Shift+Tab moves focus backward
- [ ] Focus order is logical and predictable
- [ ] No keyboard traps (can always escape any component)
- [ ] Focus indicator is visible on all focusable elements

### Button Component
- [ ] Tab to focus button
- [ ] Enter activates button
- [ ] Space activates button
- [ ] Disabled buttons do not receive focus
- [ ] Loading buttons do not respond to activation

### Input Component
- [ ] Tab to focus input
- [ ] Can type in focused input
- [ ] Tab away triggers blur validation (if configured)
- [ ] Enter in text input does not submit form (unless configured)
- [ ] Password toggle works with keyboard

---

## Visual Testing

### Focus Indicators
- [ ] All interactive elements have visible focus indicators
- [ ] Focus indicator has at least 3:1 contrast ratio
- [ ] Focus indicator is not obscured by other elements
- [ ] Focus indicator works on both light and dark backgrounds

### Color Contrast
- [ ] Button text meets 4.5:1 contrast ratio
- [ ] Input text meets 4.5:1 contrast ratio
- [ ] Placeholder text meets 4.5:1 contrast ratio (or 3:1 for large text)
- [ ] Error text meets 4.5:1 contrast ratio
- [ ] Help text meets 4.5:1 contrast ratio
- [ ] Disabled state is distinguishable (not just by color)

### Error States
- [ ] Error state uses more than just color (icon + text + border)
- [ ] Error messages are clearly associated with inputs
- [ ] Error icon is visible and recognizable

### Touch Targets
- [ ] Buttons are at least 44x44px on mobile
- [ ] Inputs are at least 44px height on mobile
- [ ] Touch targets have adequate spacing (8px minimum)

---

## Responsive Testing

### Zoom Testing (up to 200%)
- [ ] All content visible at 200% zoom
- [ ] No horizontal scrolling required at 200% zoom
- [ ] Text reflows properly
- [ ] Interactive elements remain usable

### High Contrast Mode (Windows)
- [ ] Components are visible in High Contrast mode
- [ ] Focus indicators are visible
- [ ] Error states are distinguishable
- [ ] Button variants are distinguishable

### Reduced Motion
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Loading spinner is visible but doesn't animate (or animates slowly)
- [ ] No flashing content

---

## Form Testing

### Form Submission
- [ ] Form can be submitted with Enter key in text inputs
- [ ] Submit button submits the form
- [ ] Validation errors prevent submission
- [ ] Focus moves to first error field after failed submission

### Error Recovery
- [ ] Error messages are clear and actionable
- [ ] Users can correct errors and resubmit
- [ ] Success state is clearly indicated
- [ ] Previous input is preserved on error

---

## Testing Notes

### Test Environment
- Browser: ________________
- Screen Reader: ________________
- OS: ________________
- Date: ________________
- Tester: ________________

### Issues Found
| Issue | Severity | Component | Description | Status |
|-------|----------|-----------|-------------|--------|
|       |          |           |             |        |

### Pass/Fail Summary
- [ ] All screen reader tests passed
- [ ] All keyboard tests passed
- [ ] All visual tests passed
- [ ] All responsive tests passed
- [ ] All form tests passed

---

## WCAG 2.1 AA Criteria Checklist

### Perceivable
- [x] 1.1.1 Non-text Content - Images have alt text
- [x] 1.3.1 Info and Relationships - Structure conveyed programmatically
- [x] 1.3.2 Meaningful Sequence - Reading order is logical
- [x] 1.4.1 Use of Color - Color not sole means of conveying info
- [x] 1.4.3 Contrast (Minimum) - 4.5:1 for normal text, 3:1 for large
- [x] 1.4.4 Resize Text - Text can be resized to 200%
- [x] 1.4.10 Reflow - Content reflows at 320px width
- [x] 1.4.11 Non-text Contrast - UI components have 3:1 contrast

### Operable
- [x] 2.1.1 Keyboard - All functionality available via keyboard
- [x] 2.1.2 No Keyboard Trap - No keyboard traps
- [x] 2.4.3 Focus Order - Logical focus order
- [x] 2.4.6 Headings and Labels - Descriptive headings and labels
- [x] 2.4.7 Focus Visible - Visible focus indicator
- [x] 2.5.3 Label in Name - Accessible name includes visible text

### Understandable
- [x] 3.2.1 On Focus - No unexpected context changes on focus
- [x] 3.2.2 On Input - No unexpected context changes on input
- [x] 3.3.1 Error Identification - Errors clearly identified
- [x] 3.3.2 Labels or Instructions - Labels provided for inputs
- [x] 3.3.3 Error Suggestion - Suggestions provided for errors

### Robust
- [x] 4.1.1 Parsing - Valid HTML
- [x] 4.1.2 Name, Role, Value - Proper ARIA usage
- [x] 4.1.3 Status Messages - Status changes announced
