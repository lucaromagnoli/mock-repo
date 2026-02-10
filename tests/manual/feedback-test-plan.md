# Visual Feedback System - Manual QA Test Plan

**Story:** [story-004-visual-feedback](../../01-features/001-simple-ui/stories/story-004-visual-feedback/story.md)
**Last Updated:** 2026-02-10

## Pre-testing Setup

1. Clear browser cache and local storage
2. Disable browser extensions that might interfere
3. Test in both light and dark modes (if applicable)
4. Test with JavaScript enabled
5. Enable browser developer tools to check for console errors

## Test Scenarios

### Scenario 1: Toast Notification - Success Flow

**Steps:**
1. Trigger a successful action (e.g., form submission, data save)
2. Observe the notification area (top-right by default)

**Expected Results:**
- [ ] Success toast appears with green/success styling
- [ ] Toast slides in with smooth animation (~300ms)
- [ ] Icon (✓) is visible and appropriate
- [ ] Message is clear and readable
- [ ] Toast auto-dismisses after 3-5 seconds
- [ ] Dismiss button (×) is clickable
- [ ] No JavaScript errors in console

### Scenario 2: Toast Notification - Error Flow

**Steps:**
1. Trigger an error condition (e.g., network failure, validation error)
2. Observe the error notification

**Expected Results:**
- [ ] Error toast appears with red/error styling
- [ ] Toast has `role="alert"` for screen readers
- [ ] Toast does NOT auto-dismiss (requires manual dismissal)
- [ ] Error message includes helpful context
- [ ] Dismiss button works correctly
- [ ] Error title is displayed if provided

### Scenario 3: Toast Notification - Multiple Toasts

**Steps:**
1. Trigger multiple notifications in rapid succession
2. Observe notification stacking behavior

**Expected Results:**
- [ ] Maximum of 5 toasts visible at once
- [ ] Additional toasts are queued
- [ ] Queued toasts appear when visible ones are dismissed
- [ ] Duplicate messages within 500ms are debounced
- [ ] Toasts don't overlap or overlap improperly

### Scenario 4: Toast Notification - Keyboard Accessibility

**Steps:**
1. Trigger a notification
2. Press Escape key
3. Use Tab key to navigate to dismiss button
4. Press Enter on dismiss button

**Expected Results:**
- [ ] Escape key dismisses most recent toast
- [ ] Dismiss button is focusable via Tab
- [ ] Enter/Space activates dismiss button
- [ ] Focus indicators are visible

### Scenario 5: Loading Indicators - Button Loading State

**Steps:**
1. Click a button that triggers an async operation
2. Observe the button state during loading

**Expected Results:**
- [ ] Button shows loading spinner
- [ ] Button text is hidden (but space preserved)
- [ ] Button is disabled during loading
- [ ] Button has `aria-busy="true"` attribute
- [ ] Button width doesn't change
- [ ] Loading state clears after operation completes

### Scenario 6: Loading Indicators - Smart Delay

**Steps:**
1. Trigger a fast operation (<400ms)
2. Trigger a slow operation (>400ms)

**Expected Results:**
- [ ] Fast operation: No spinner flicker (not shown at all)
- [ ] Slow operation: Spinner appears after ~400ms delay
- [ ] Once visible, spinner stays for minimum 200ms
- [ ] No jarring flash or flicker

### Scenario 7: Loading Overlay - Full Page

**Steps:**
1. Trigger a full-page loading state
2. Observe the overlay appearance

**Expected Results:**
- [ ] Overlay covers entire viewport
- [ ] Spinner is centered
- [ ] Message is displayed if provided
- [ ] Background content is dimmed/blurred
- [ ] Cannot interact with background content
- [ ] Overlay fades in/out smoothly

### Scenario 8: Skeleton Screens

**Steps:**
1. Navigate to a page that loads data
2. Observe placeholder content

**Expected Results:**
- [ ] Skeleton matches layout of actual content
- [ ] Shimmer animation is smooth
- [ ] No layout shift when content loads
- [ ] Content replaces skeleton smoothly

### Scenario 9: Interactive Elements - Hover States

**Steps:**
1. Hover over buttons, links, and cards
2. Observe visual changes

**Expected Results:**
- [ ] Buttons darken/lighten on hover
- [ ] Cards elevate (shadow increases) on hover
- [ ] Links show underline animation
- [ ] Transitions are smooth (~150-200ms)
- [ ] Cursor changes to pointer

### Scenario 10: Interactive Elements - Active/Pressed States

**Steps:**
1. Click and hold on buttons and cards
2. Observe the pressed state

**Expected Results:**
- [ ] Buttons scale down slightly (98%)
- [ ] Cards scale down on click
- [ ] Visual feedback is immediate (<16ms)
- [ ] State returns to normal on release

### Scenario 11: Interactive Elements - Focus States

**Steps:**
1. Tab through the page using keyboard
2. Observe focus indicators

**Expected Results:**
- [ ] All interactive elements are reachable via Tab
- [ ] Focus ring is clearly visible (3:1 contrast minimum)
- [ ] Focus ring only shows for keyboard (focus-visible)
- [ ] Tab order is logical
- [ ] No focus traps

### Scenario 12: Disabled States

**Steps:**
1. Find disabled buttons/inputs
2. Attempt to interact with them

**Expected Results:**
- [ ] Disabled elements have reduced opacity (50%)
- [ ] Cursor shows not-allowed
- [ ] Click events don't trigger
- [ ] `aria-disabled="true"` is set
- [ ] No hover/focus visual changes

### Scenario 13: Touch Device Testing

**Steps:**
1. Test on iOS Safari and Chrome Android
2. Tap interactive elements

**Expected Results:**
- [ ] No "sticky hover" states after tap
- [ ] Active states provide tactile feedback
- [ ] Touch targets are at least 44x44px
- [ ] Scrolling is not blocked by interactive elements

### Scenario 14: Reduced Motion Preference

**Steps:**
1. Enable "Reduce motion" in OS accessibility settings
2. Trigger notifications and loading states

**Expected Results:**
- [ ] Spinner animation is disabled or simplified
- [ ] Toast transitions are minimal/instant
- [ ] Skeleton shimmer is disabled
- [ ] All functionality still works

### Scenario 15: Screen Reader Testing

**Steps:**
1. Enable NVDA (Windows), VoiceOver (Mac/iOS), or TalkBack (Android)
2. Trigger notifications and loading states

**Expected Results:**
- [ ] Toast notifications are announced
- [ ] Error toasts announced with "alert" urgency
- [ ] Loading states announced (aria-busy)
- [ ] Spinner has accessible label ("Loading")
- [ ] Button states are clear (enabled/disabled/loading)

## Browser/Device Test Matrix

| Browser | Version | OS | Status | Notes |
|---------|---------|----|----|-------|
| Chrome | Latest | Windows 11 | ⏳ | |
| Firefox | Latest | Windows 11 | ⏳ | |
| Safari | Latest | macOS | ⏳ | |
| Edge | Latest | Windows 11 | ⏳ | |
| Chrome | Latest | Android 13 | ⏳ | |
| Safari | Latest | iOS 17 | ⏳ | |

## Acceptance Criteria Validation

### AC 1: Loading indicators appear when content or data is being fetched or processed
- [ ] Loading indicators show after 300-500ms delay
- [ ] Indicators are visible and appropriate for context
- [ ] No flicker for fast operations

### AC 2: Success messages display when actions complete successfully (with auto-dismiss after 3-5 seconds)
- [ ] Success toasts appear with appropriate styling
- [ ] Auto-dismiss timing is 4 seconds (configurable)
- [ ] Animation is smooth

### AC 3: Error messages display clearly when actions fail, with helpful context about what went wrong
- [ ] Error toasts have distinct styling (red/alert)
- [ ] Error messages include helpful context
- [ ] Errors do NOT auto-dismiss
- [ ] Manual dismissal works

### AC 4: Interactive elements provide immediate feedback (visual changes on click, hover effects)
- [ ] Hover states are visible on all interactive elements
- [ ] Active/pressed states provide immediate feedback
- [ ] Focus states are clearly visible for keyboard navigation
- [ ] Disabled states prevent interaction

### AC 5: Users can dismiss notification messages manually if needed
- [ ] Dismiss button (×) is visible on all toasts
- [ ] Click/tap dismisses the toast
- [ ] Escape key dismisses most recent toast
- [ ] dismissAll() clears all notifications

## Performance Benchmarks

| Metric | Target | Actual | Pass/Fail |
|--------|--------|--------|-----------|
| Animation FPS | ≥55fps | ___ | ⏳ |
| Notification Display Latency | <100ms | ___ | ⏳ |
| Bundle Size (JS) | ≤5KB gzip | ___ | ⏳ |
| Bundle Size (CSS) | ≤5KB gzip | ___ | ⏳ |

## Issues Found

| # | Severity | Description | Steps to Reproduce | Status |
|---|----------|-------------|-------------------|--------|
| | | | | |

## Sign-off

- [ ] All acceptance criteria validated
- [ ] All critical scenarios pass
- [ ] No blocking issues found
- [ ] Ready for production deployment

**Tested By:** _______________
**Date:** _______________
