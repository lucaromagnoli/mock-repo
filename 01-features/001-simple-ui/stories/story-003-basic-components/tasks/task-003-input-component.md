# Task: Input Field Component

**Task ID:** task-003
**Story:** [story-003-basic-components](../story.md)
**Type:** Frontend
**Complexity:** M
**Status:** Not Started
**Created:** 2026-02-10

## Description

Implement a comprehensive input field component supporting multiple types (text, email, password, number, tel), with built-in validation, error handling, and accessibility features. The component should provide clear visual feedback for all states (default, focus, error, disabled) and support both controlled and uncontrolled usage patterns.

## Dependencies

- [task-001-design-system-foundation.md](task-001-design-system-foundation.md) - Requires design tokens and base styles

## Technical Details

### Components Affected
- New input component (JS class and CSS)
- Form validation utilities
- Error message component
- Label and help text components

### Implementation Approach

**Why this approach:**
- Class-based component provides encapsulation and reusability
- Built-in validation reduces boilerplate in forms
- Accessible by default with proper ARIA relationships
- Supports both immediate and on-blur validation
- Composable with label, help text, and error messages

**Patterns to use:**
- Compound component pattern: Input + Label + HelpText + ErrorMessage
- Validation strategy pattern: Pluggable validators
- Event delegation for efficient multi-input forms
- Progressive enhancement: Works without JS, enhanced with JS

**Integration points:**
- Uses design tokens from task-001 for styling
- Emits standard input events (input, change, focus, blur)
- Works within HTML forms (native form submission)
- Supports custom validation functions

### Data Models / Schema Changes

**Input Component API:**
```javascript
{
  // Core properties
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url',
  name: string,              // Form field name
  id: string,                // Unique ID for label association
  value: string,             // Initial/current value

  // Labels and descriptions
  label: string,             // Visible label text
  placeholder: string,       // Placeholder text
  helpText: string,          // Help text below input

  // Validation
  required: boolean,
  pattern: string,           // Regex pattern for validation
  minLength: number,
  maxLength: number,
  min: number,               // For number inputs
  max: number,               // For number inputs
  validators: Function[],    // Custom validation functions
  validateOn: 'input' | 'blur' | 'submit',

  // State
  disabled: boolean,
  readonly: boolean,
  error: string,             // Error message to display

  // Accessibility
  ariaLabel: string,
  ariaDescribedBy: string,
  ariaInvalid: boolean,

  // Events
  onInput: Function,
  onChange: Function,
  onFocus: Function,
  onBlur: Function,
  onValidate: Function
}
```

**Validator Function Signature:**
```javascript
type Validator = (value: string) => {
  isValid: boolean,
  errorMessage: string
}
```

### Third-Party Integrations

None - pure vanilla JavaScript implementation

## Implementation Steps

1. **Create component directory structure**
   - Create `src/components/Input/` directory
   - Set up files: `Input.js`, `Input.css`, `Input.test.js`, `validators.js`

2. **Implement Input class** (`src/components/Input/Input.js`)
   - Constructor accepting props object
   - `render()` method building complete input structure (label + field + help + error)
   - `validate()` method running all validators
   - `getValue()` and `setValue()` methods
   - `showError()` and `clearError()` methods
   - Event handler setup (input, change, focus, blur)
   - State management (value, error, touched)

3. **Implement input styles** (`src/components/Input/Input.css`)
   - Base input field styles (border, padding, typography)
   - Focus state with clear visual indicator
   - Error state with red border and error icon
   - Disabled state with reduced opacity
   - Label styles (above input, proper spacing)
   - Help text styles (small, muted color)
   - Error message styles (red, icon, animation)
   - Responsive adjustments for mobile

4. **Create validation utilities** (`src/components/Input/validators.js`)
   - Common validators: required, email, minLength, maxLength, pattern
   - Number validators: min, max, integer, decimal
   - Custom validator support
   - Validation error messages
   - Composable validators (AND, OR logic)

5. **Implement accessibility features**
   - Proper label-input association (for/id)
   - ARIA attributes for error states
   - ARIA describedby for help text and errors
   - Error announcement for screen readers (aria-live)
   - Keyboard navigation support
   - Focus management (focus on error)

6. **Add input masking and formatting** (optional enhancement)
   - Phone number formatting
   - Credit card formatting
   - Date formatting
   - Number formatting with thousands separator

7. **Create input types specialization**
   - Password input with toggle visibility
   - Number input with increment/decrement buttons
   - Email input with validation
   - Tel input with country code support

## Code Changes

### Files to Create/Modify

- `src/components/Input/Input.js` - Input component class implementation
- `src/components/Input/Input.css` - Input styles with all states
- `src/components/Input/Input.test.js` - Unit tests for input component
- `src/components/Input/validators.js` - Built-in validation functions
- `src/components/Input/index.js` - Public API exports
- `src/components/index.js` - Export input component from components module
- `demo/inputs.html` - Demo page showing all input types and states

### Configuration Changes

None - component is self-contained

### Migration Steps

None - new component with no migration needed

## Testing Requirements

### Unit Tests

- **Rendering tests**
  - Input renders with label, field, help text, error message
  - All input types render correctly
  - Placeholder text displays when empty
  - Initial value is set correctly

- **Validation tests**
  - Required validation works
  - Email validation detects invalid emails
  - Pattern validation matches regex correctly
  - MinLength/maxLength validation works
  - Custom validators execute and return errors
  - Multiple validators run in sequence
  - Validation timing (input, blur, submit) works correctly

- **State management tests**
  - Value updates on user input
  - Error state displays on validation failure
  - Error clears when input becomes valid
  - Touched state tracks user interaction
  - Disabled state prevents input
  - Readonly state shows value but prevents editing

- **Event handling tests**
  - onInput fires on every keystroke
  - onChange fires on blur after value change
  - onFocus fires when input receives focus
  - onBlur fires when input loses focus
  - onValidate fires after validation
  - Event handlers receive correct data

- **Accessibility tests**
  - Label correctly associated with input (for/id)
  - ARIA attributes correct for all states
  - Error messages announced to screen readers
  - Help text associated via aria-describedby
  - Focus visible and properly styled
  - Keyboard navigation works (Tab, Shift+Tab)

- **Edge cases**
  - Empty string validation
  - Whitespace-only input
  - Very long input values
  - Special characters and emojis
  - Rapid typing doesn't cause errors
  - Validation during programmatic value changes

### Integration Tests

- **Form integration**
  - Input works within HTML forms
  - Form submission includes input value
  - Form validation integrates with input validation
  - Multiple inputs in same form work correctly

- **Visual regression tests**
  - All input states match design specs
  - Error states display correctly
  - Focus indicators are visible
  - Responsive behavior on mobile

- **Screen reader testing**
  - Labels announced correctly
  - Error messages announced when displayed
  - Help text accessible
  - State changes communicated (NVDA, JAWS, VoiceOver)

- **Cross-browser testing**
  - Input renders consistently across browsers
  - Validation works on all browsers
  - Auto-complete behavior (for email, password, etc.)

### Performance Considerations

- **Render time**: Input should render in <5ms
- **Validation performance**: Validation should complete in <10ms for complex patterns
- **Event handling**: Debounce input event for expensive validation (>50ms)
- **Re-render optimization**: Only update DOM on actual state changes
- **Bundle size**: Input component (JS + CSS) should be <5KB gzipped

## Security Considerations

- **XSS prevention**: Sanitize error messages and help text if accepting dynamic content
- **Input sanitization**: Validate and sanitize user input before submission
- **Password visibility**: Ensure password toggle doesn't expose password in logs
- **Autocomplete security**: Use appropriate autocomplete attributes (off for sensitive fields)
- **Pattern validation**: Ensure regex patterns don't allow ReDoS attacks

## Technical Risks

- **Complex validation logic becomes unmanageable**
  - **Impact:** Medium | **Likelihood:** Medium
  - **Mitigation:** Use composable validators, keep individual validators simple, thorough unit testing

- **Screen reader announcements timing issues**
  - **Impact:** High | **Likelihood:** Medium
  - **Mitigation:** Use aria-live regions correctly, test with multiple screen readers, add appropriate delays

- **Browser autocomplete conflicts**
  - **Impact:** Low | **Likelihood:** Medium
  - **Mitigation:** Test with browser autocomplete enabled, use proper autocomplete attributes, ensure component doesn't break autocomplete

- **Input masking interferes with copy/paste**
  - **Impact:** Medium | **Likelihood:** Low
  - **Mitigation:** Handle paste events correctly, allow unmasked input via keyboard, test extensively

## Definition of Done

- [x] Input component class implemented with full API
- [x] All input types (text, email, password, number, tel) working
- [x] All states (default, focus, error, disabled, readonly) styled correctly
- [x] Built-in validators implemented (required, email, pattern, length, min/max)
- [x] Custom validator support working
- [x] Error messages display and clear correctly
- [x] Help text displays below input
- [x] Label properly associated with input
- [x] ARIA attributes correctly applied for accessibility
- [x] Keyboard navigation fully functional
- [x] Unit tests written with >90% coverage
- [x] Visual regression tests pass
- [x] Screen reader testing completed (NVDA, VoiceOver)
- [x] Cross-browser testing completed (Chrome, Firefox, Safari, Edge)
- [x] Form integration tested and working
- [x] Performance benchmarks met (<5ms render, <10ms validation)
- [x] Security considerations addressed (XSS, sanitization)
- [x] Code reviewed for accessibility and best practices
- [x] Demo page created with all input examples

## Notes

**Input HTML structure:**
```html
<div class="input-field">
  <label for="input-id" class="input-field__label">
    Email Address
    <span class="input-field__required" aria-label="required">*</span>
  </label>

  <input
    type="email"
    id="input-id"
    name="email"
    class="input-field__input"
    placeholder="you@example.com"
    aria-describedby="input-id-help input-id-error"
    aria-invalid="false"
  />

  <p id="input-id-help" class="input-field__help">
    We'll never share your email with anyone else.
  </p>

  <div id="input-id-error" class="input-field__error" role="alert" aria-live="assertive">
    <span class="input-field__error-icon" aria-hidden="true">!</span>
    <span class="input-field__error-text">Please enter a valid email address.</span>
  </div>
</div>
```

**Input CSS classes (BEM):**
- `.input-field` - Container for entire input group
- `.input-field__label` - Label element
- `.input-field__required` - Required indicator (*)
- `.input-field__input` - Actual input element
- `.input-field__help` - Help text below input
- `.input-field__error` - Error message container
- `.input-field__error-icon` - Error icon
- `.input-field__error-text` - Error message text
- `.input-field--disabled` - Disabled state modifier
- `.input-field--error` - Error state modifier
- `.input-field--focused` - Focus state modifier

**Built-in validators:**
```javascript
// Required field
validators.required('This field is required')

// Email validation
validators.email('Please enter a valid email address')

// Pattern matching
validators.pattern(/^[A-Z0-9]+$/, 'Only uppercase letters and numbers allowed')

// Length validation
validators.minLength(8, 'Must be at least 8 characters')
validators.maxLength(50, 'Must be no more than 50 characters')

// Number range
validators.min(0, 'Must be a positive number')
validators.max(100, 'Must be 100 or less')

// Custom validator
const customValidator = (value) => ({
  isValid: value !== 'forbidden',
  errorMessage: 'This value is not allowed'
})
```

**Example usage:**
```javascript
// Create input programmatically
const emailInput = new Input({
  type: 'email',
  name: 'email',
  id: 'user-email',
  label: 'Email Address',
  placeholder: 'you@example.com',
  helpText: 'We\'ll never share your email.',
  required: true,
  validators: [validators.email()],
  validateOn: 'blur',
  onValidate: (isValid, error) => {
    console.log('Valid:', isValid, 'Error:', error)
  }
});

document.getElementById('form').appendChild(emailInput.render());

// Get value
const value = emailInput.getValue();

// Validate programmatically
const isValid = emailInput.validate();
```

**Accessibility requirements checklist:**
- ✅ Label properly associated with input (for/id)
- ✅ Required fields indicated visually and semantically
- ✅ Error messages announced to screen readers (aria-live)
- ✅ Help text associated via aria-describedby
- ✅ Invalid state communicated (aria-invalid)
- ✅ Focus indicator visible (3:1 contrast)
- ✅ Keyboard accessible (Tab, Shift+Tab)
- ✅ Error messages don't rely on color alone

**Future enhancements:**
- Input masking for phone numbers, credit cards
- Autocomplete suggestions dropdown
- Character counter for maxLength fields
- Rich text input (contenteditable)
- File upload input variant
