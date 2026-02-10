# Task: Toast Notification System

**Task ID:** task-001
**Story:** [story-004-visual-feedback](../story.md)
**Type:** Frontend
**Complexity:** M
**Status:** Not Started
**Created:** 2026-02-10

## Description

Implement a comprehensive toast notification system that displays success, error, info, and warning messages to users. The system should support auto-dismissal after a configurable timeout, manual dismissal, queuing multiple notifications, and proper accessibility features. This is the foundation for all user feedback in the application.

## Dependencies

- None (foundation component)

## Technical Details

### Components Affected

- New notification system module (vanilla JavaScript or framework-agnostic)
- Global CSS for notification styling and animations
- HTML structure for notification container
- Integration points: Any feature that needs to show user feedback

### Implementation Approach

**Pattern:** Singleton pattern for ToastManager to ensure single notification queue across the app

**Why this approach:**
- Centralized management prevents notification conflicts and overlaps
- Queue system handles rapid-fire notifications gracefully
- Event-driven API allows any part of the application to trigger notifications
- CSS-based animations for optimal performance

**Integration points:**
- Expose global API: `window.ToastManager` or import as ES module
- Event system for framework integration (React, Vue, etc.)
- Customizable via data attributes or configuration object

### Data Models / Schema Changes

```javascript
// Notification object structure
interface Toast {
  id: string;                    // Unique identifier (timestamp + random)
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;               // Main message text (required)
  title?: string;                // Optional title/heading
  duration: number;              // Auto-dismiss time in ms (0 = no auto-dismiss)
  dismissible: boolean;          // Show close button
  timestamp: number;             // Creation time for ordering
  onDismiss?: () => void;        // Optional callback
}

// Configuration options
interface ToastConfig {
  maxVisible: number;            // Max simultaneous toasts (default: 5)
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
  defaultDuration: {
    success: 4000,               // 4 seconds for success
    error: 0,                    // Manual dismiss for errors
    warning: 6000,               // 6 seconds for warnings
    info: 4000                   // 4 seconds for info
  };
  animationDuration: 300;        // CSS transition time in ms
}
```

### Third-Party Integrations

- None - vanilla implementation to avoid dependencies
- Optional: Sanitize HTML library if allowing HTML in messages (DOMPurify)

## Implementation Steps

1. **Create notification HTML structure and CSS**
   - Add container div to HTML (fixed position, z-index: 9999)
   - Create CSS classes for notification types (success, error, warning, info)
   - Implement slide-in/slide-out animations using CSS transforms
   - Add responsive positioning (adjust for mobile devices)

2. **Implement ToastManager class**
   - Create singleton class with private constructor
   - Implement notification queue (array) and active notifications tracking
   - Add methods: `show()`, `success()`, `error()`, `warning()`, `info()`, `dismiss()`, `dismissAll()`
   - Handle max visible limit with queuing logic

3. **Build notification lifecycle methods**
   - `_createToast(toast)`: Generate DOM element for notification
   - `_addToDOM(element)`: Append to container with animation
   - `_removeFromDOM(element)`: Fade out and remove element
   - `_scheduleAutoDismiss(toast)`: Set timeout for auto-dismiss
   - `_sanitizeMessage(message)`: Escape HTML to prevent XSS

4. **Add accessibility features**
   - Set `role="alert"` for error/warning, `role="status"` for success/info
   - Add `aria-live="polite"` for non-critical messages
   - Implement keyboard support (Escape to dismiss, Tab navigation)
   - Ensure focus management doesn't trap users

5. **Implement debouncing and duplicate prevention**
   - Track recent messages by content hash
   - Debounce duplicate messages within 500ms window
   - Option to increment counter for repeated messages

6. **Add configuration and customization options**
   - Allow global configuration via `ToastManager.configure()`
   - Per-notification customization via options object
   - CSS custom properties for theme customization

## Code Changes

### Files to Create/Modify

- `src/components/toast/ToastManager.js` - Core notification manager class
- `src/components/toast/toast.css` - Notification styles and animations
- `src/index.html` - Add notification container div
- `src/main.js` - Initialize ToastManager singleton
- `src/utils/sanitize.js` - HTML sanitization utility (XSS prevention)

### Configuration Changes

- None - all configuration is runtime-based

### Migration Steps

- None - new feature

## Testing Requirements

### Unit Tests

- **Toast creation**: Verify toast object structure and ID generation
- **Queue management**: Test max visible limit and queuing behavior
- **Auto-dismiss timing**: Verify timeouts work correctly (use fake timers)
- **Duplicate detection**: Ensure duplicate messages are debounced
- **Sanitization**: Test XSS prevention with malicious input
- **Dismiss functionality**: Test manual dismiss, dismiss all, and callbacks
- **Edge cases**:
  - Rapid creation of 100+ notifications
  - Dismiss notification before timeout
  - Create notification with duration of 0
  - Invalid message types or empty messages

### Integration Tests

- **End-to-end notification flow**: Create → Display → Auto-dismiss
- **Multiple notifications**: Display 3 notifications simultaneously
- **Framework integration**: Test with React/Vue if applicable
- **Keyboard navigation**: Tab through notifications, press Escape to dismiss
- **Screen reader testing**: Verify ARIA announcements work correctly
- **Visual regression**: Ensure notifications appear correctly positioned

### Performance Considerations

- **Animation frame rate**: Maintain 60fps during slide animations
- **Memory management**: Ensure dismissed notifications are garbage collected
- **DOM operations**: Batch DOM updates where possible
- **Bundle size**: Keep JavaScript under 3KB minified + gzipped
- **Response time**: Notification should appear within 16ms of call

## Security Considerations

- **XSS prevention**: Sanitize all message content before rendering
  - Use `textContent` instead of `innerHTML` by default
  - If HTML is needed, use DOMPurify or similar library
  - Escape user-generated content in error messages
- **Content Security Policy**: Ensure inline styles work with CSP
- **Rate limiting**: Prevent DOS by limiting notification creation rate
- **Input validation**: Validate notification type, duration, and message length

## Technical Risks

### Risk 1: Notification spam overwhelming users
**Mitigation:**
- Implement strict max visible limit (5)
- Debounce duplicate messages
- Group similar notifications
- Provide "Clear all" button

### Risk 2: Memory leaks from undismissed notifications
**Mitigation:**
- Set maximum lifetime for all notifications (2 minutes)
- Clear timeouts on dismissal
- Use WeakMap for internal tracking
- Run memory profiling tests

### Risk 3: Animation jank on low-end devices
**Mitigation:**
- Use GPU-accelerated transforms (translateY, opacity)
- Respect `prefers-reduced-motion`
- Test on low-end Android devices
- Simplify animations if needed

## Definition of Done

- [ ] Code implemented following project standards
- [ ] ToastManager class with all methods implemented
- [ ] CSS animations smooth at 60fps
- [ ] Unit tests written and passing (>90% coverage)
- [ ] Integration tests for complete notification lifecycle
- [ ] Accessibility testing with NVDA/VoiceOver completed
- [ ] Security review: XSS prevention validated
- [ ] Performance benchmarks met (sub-3KB, 60fps animations)
- [ ] Code reviewed and approved
- [ ] Documentation: API reference and usage examples
- [ ] Manual testing on Chrome, Firefox, Safari, Edge
- [ ] Mobile responsive testing (iOS Safari, Chrome Android)
- [ ] Story acceptance criteria validated (AC 2, 3, 5)

## Notes

### API Usage Examples

```javascript
// Simple success message
ToastManager.success('Profile updated successfully!');

// Error with title
ToastManager.error('Failed to save', {
  title: 'Network Error',
  duration: 0  // Must dismiss manually
});

// Custom configuration
ToastManager.show({
  type: 'warning',
  message: 'Your session will expire in 5 minutes',
  duration: 10000,
  dismissible: true,
  onDismiss: () => console.log('Warning dismissed')
});

// Dismiss specific notification
const toastId = ToastManager.info('Processing...');
// Later...
ToastManager.dismiss(toastId);
```

### Styling Customization

```css
/* Override colors via CSS custom properties */
:root {
  --toast-success-bg: #10b981;
  --toast-error-bg: #ef4444;
  --toast-warning-bg: #f59e0b;
  --toast-info-bg: #3b82f6;
  --toast-text-color: #ffffff;
  --toast-border-radius: 8px;
  --toast-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
```

### Follow-up items
- Consider adding progress bar for auto-dismiss countdown
- Add sound effects for critical errors (opt-in)
- Implement action buttons within notifications (e.g., "Undo")
