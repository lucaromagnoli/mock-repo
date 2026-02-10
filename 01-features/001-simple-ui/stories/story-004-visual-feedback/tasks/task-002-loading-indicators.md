# Task: Loading Indicators and Spinners

**Task ID:** task-002
**Story:** [story-004-visual-feedback](../story.md)
**Type:** Frontend
**Complexity:** S
**Status:** Not Started
**Created:** 2026-02-10

## Description

Create reusable loading indicator components including spinners, skeleton screens, and progress overlays. Implement smart loading states that only appear after a 300-500ms delay to prevent flicker for fast operations, with smooth fade-in/out transitions.

## Dependencies

- None (can be implemented independently)
- Optional: Integrates with [task-001-toast-notification-system.md](task-001-toast-notification-system.md) for error states

## Technical Details

### Components Affected

- New loading components module
- CSS for spinner animations and skeleton screens
- Utility functions for delayed loading state management
- Integration points: Any async operations (API calls, data fetching, form submissions)

### Implementation Approach

**Pattern:** Component-based architecture with utility functions for loading state management

**Why this approach:**
- Reusable components reduce code duplication
- Delay threshold prevents flicker on fast operations
- Multiple loading patterns support different use cases:
  - **Inline spinners**: For buttons and small areas
  - **Skeleton screens**: For content placeholders
  - **Full-page overlay**: For critical blocking operations
  - **Progress bars**: For operations with known duration

**Integration points:**
- CSS classes for easy application
- JavaScript API for programmatic control
- Framework-agnostic design (works with vanilla JS, React, Vue, etc.)
- Respects `prefers-reduced-motion` for accessibility

### Data Models / Schema Changes

```javascript
// Loading state configuration
interface LoadingConfig {
  delay: number;              // Delay before showing (default: 400ms)
  minDuration: number;        // Min display time once shown (default: 200ms)
  message?: string;           // Optional loading message
  type: 'spinner' | 'skeleton' | 'overlay' | 'progress';
  size: 'small' | 'medium' | 'large';
  position?: 'center' | 'inline';
}

// Loading manager state
interface LoadingState {
  isVisible: boolean;
  startTime: number;
  delayTimer: number | null;
  minDurationTimer: number | null;
}
```

### Third-Party Integrations

- None - pure CSS animations for optimal performance

## Implementation Steps

1. **Create spinner component with CSS animations**
   - Design circular spinner using CSS borders and rotation
   - Create pulsing dot animation as alternative
   - Add three size variants (small: 16px, medium: 32px, large: 48px)
   - Ensure smooth 60fps animation using CSS transforms

2. **Implement skeleton screen component**
   - Create reusable skeleton blocks (text, image, card)
   - Add shimmer/pulse animation effect
   - Design skeleton layouts for common patterns (list, grid, card)
   - Ensure same dimensions as actual content to prevent layout shift

3. **Build full-page loading overlay**
   - Create modal-like overlay with backdrop
   - Add centered spinner with optional message
   - Implement z-index management (below modals, above content)
   - Add fade-in/out transitions

4. **Create LoadingManager utility class**
   - Implement delay logic: start timer on `show()`, cancel on fast `hide()`
   - Enforce minimum display duration once visible
   - Track loading state to prevent premature hiding
   - Provide async/await compatible API

5. **Add button loading states**
   - Create `.loading` class for buttons
   - Replace button text with spinner during loading
   - Disable button interaction while loading
   - Maintain button width to prevent layout shift

6. **Implement accessibility features**
   - Add `aria-live="polite"` to loading regions
   - Include `role="status"` for screen readers
   - Provide text alternatives: `aria-label="Loading content"`
   - Respect `prefers-reduced-motion` (disable animations)
   - Ensure proper color contrast for spinners

## Code Changes

### Files to Create/Modify

- `src/components/loading/Spinner.js` - Spinner component
- `src/components/loading/Skeleton.js` - Skeleton screen component
- `src/components/loading/LoadingOverlay.js` - Full-page overlay component
- `src/components/loading/LoadingManager.js` - Smart loading state utility
- `src/components/loading/loading.css` - All loading styles and animations
- `src/utils/async-helpers.js` - Utility functions for wrapping async operations

### Configuration Changes

- None

### Migration Steps

- None - new feature

## Testing Requirements

### Unit Tests

- **Delay threshold**: Verify spinner doesn't show for operations <400ms
- **Minimum duration**: Ensure spinner stays visible for at least 200ms once shown
- **State transitions**: Test show → hide → show rapid cycling
- **Animation performance**: Verify CSS animations don't drop frames
- **Size variants**: Test small, medium, large spinners render correctly
- **Edge cases**:
  - Call hide() before delay timer completes
  - Call show() multiple times rapidly
  - Zero duration operations
  - Operations taking exactly 400ms

### Integration Tests

- **Button loading state**: Click button → spinner appears → operation completes → spinner disappears
- **Skeleton screen**: Data fetch starts → skeleton shows → data arrives → content replaces skeleton
- **Full-page overlay**: Long operation starts → overlay appears after delay → operation completes → overlay fades out
- **Framework integration**: Test with React useEffect hooks or similar
- **Screen reader testing**: Verify loading announcements are read
- **Reduced motion**: Confirm animations respect user preferences

### Performance Considerations

- **Animation smoothness**: Maintain 60fps for all animations
- **CSS-only animations**: No JavaScript animation loops
- **GPU acceleration**: Use `transform` and `opacity` properties
- **Bundle size**: Total CSS/JS under 2KB minified + gzipped
- **Reflow prevention**: Skeleton screens match content dimensions

## Security Considerations

- None - purely presentational components with no user input or data handling

## Technical Risks

### Risk 1: Flicker on operations near threshold (380-420ms)
**Mitigation:**
- Use 400ms delay as sweet spot (based on UX research)
- Implement minimum display duration (200ms) to avoid quick flash
- Smooth fade transitions (150ms) make any flicker less jarring

### Risk 2: Layout shift when loading indicators appear/disappear
**Mitigation:**
- Reserve space for spinners using fixed dimensions
- Skeleton screens match exact content dimensions
- Use CSS Grid/Flexbox for stable layouts
- Test on various screen sizes

### Risk 3: Animations causing performance issues on low-end devices
**Mitigation:**
- Use CSS transforms (GPU-accelerated)
- Avoid animating width, height, or layout properties
- Respect `prefers-reduced-motion` setting
- Provide static fallback for problematic devices

## Definition of Done

- [ ] Code implemented following project standards
- [ ] Spinner component with 3 size variants
- [ ] Skeleton screen components for common patterns
- [ ] Full-page loading overlay component
- [ ] LoadingManager utility with delay/min-duration logic
- [ ] Button loading states implemented
- [ ] Unit tests written and passing (>85% coverage)
- [ ] Integration tests for all loading patterns
- [ ] Animation performance verified at 60fps
- [ ] Accessibility testing with NVDA/VoiceOver completed
- [ ] Reduced motion support verified
- [ ] Code reviewed and approved
- [ ] Documentation: Usage examples and API reference
- [ ] Visual testing across browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive testing
- [ ] Story acceptance criteria validated (AC 1)

## Notes

### API Usage Examples

```javascript
// Simple button loading state
const button = document.querySelector('#submit-button');
button.classList.add('loading');
await submitForm();
button.classList.remove('loading');

// Smart loading with delay
const loader = new LoadingManager({
  delay: 400,
  minDuration: 200
});

await loader.show(async () => {
  const data = await fetchData();
  return data;
});
// Loader automatically manages display timing

// Full-page overlay
LoadingOverlay.show('Loading your data...');
await longOperation();
LoadingOverlay.hide();

// Skeleton screen (HTML)
<div class="skeleton-card">
  <div class="skeleton-image"></div>
  <div class="skeleton-text"></div>
  <div class="skeleton-text short"></div>
</div>
```

### CSS Examples

```css
/* Spinner animation */
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Button loading state */
.btn.loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.btn.loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Skeleton shimmer effect */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .spinner,
  .skeleton {
    animation: none;
  }
}
```

### Design Guidelines

- **Spinner colors**: Match brand primary color or use neutral gray
- **Skeleton colors**: Light gray (#f0f0f0) on white backgrounds
- **Overlay backdrop**: Semi-transparent dark (#000000 at 50% opacity)
- **Animation speed**: 0.6-1s for spinners, 1.5-2s for shimmers
- **Transition duration**: 150-200ms for fade-in/out

### Follow-up items
- Add progress bar component for file uploads
- Consider deterministic progress indicators for known-duration operations
- Add customizable spinner shapes (dots, bars, pulse)
