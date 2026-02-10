/**
 * Input Component
 * ===============
 * A flexible, accessible input field component with built-in validation,
 * error handling, and various input types support.
 *
 * @example
 * const input = new Input({
 *   type: 'email',
 *   name: 'email',
 *   label: 'Email Address',
 *   placeholder: 'you@example.com',
 *   required: true,
 *   validators: [validators.email()]
 * });
 * document.body.appendChild(input.render());
 */

class Input {
  /**
   * Default input configuration
   * @type {Object}
   */
  static defaults = {
    type: 'text',
    name: '',
    id: null,
    value: '',
    label: '',
    placeholder: '',
    helpText: '',
    required: false,
    disabled: false,
    readonly: false,
    error: '',
    validators: [],
    validateOn: 'blur',
    minLength: null,
    maxLength: null,
    min: null,
    max: null,
    pattern: null,
    autocomplete: null,
    ariaLabel: null,
    ariaDescribedBy: null,
    size: 'medium',
    showCounter: false,
    onInput: null,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onValidate: null,
  };

  /**
   * Valid input types
   * @type {string[]}
   */
  static types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'];

  /**
   * Valid size values
   * @type {string[]}
   */
  static sizes = ['small', 'medium', 'large'];

  /**
   * Counter for generating unique IDs
   * @type {number}
   */
  static idCounter = 0;

  /**
   * Create an Input instance
   * @param {Object} props - Input properties
   */
  constructor(props = {}) {
    this.props = { ...Input.defaults, ...props };

    // Generate unique ID if not provided
    if (!this.props.id) {
      this.props.id = `input-${++Input.idCounter}`;
    }

    this.element = null;
    this.inputElement = null;
    this.errorElement = null;
    this.state = {
      value: this.props.value,
      error: this.props.error,
      touched: false,
      focused: false,
    };

    this._validateProps();
    this._bindMethods();
  }

  /**
   * Bind event handler methods
   * @private
   */
  _bindMethods() {
    this._handleInput = this._handleInput.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  /**
   * Validate props and warn about invalid values
   * @private
   */
  _validateProps() {
    const { type, size } = this.props;

    if (!Input.types.includes(type)) {
      console.warn(`Input: Invalid type "${type}". Using "text".`);
      this.props.type = 'text';
    }

    if (!Input.sizes.includes(size)) {
      console.warn(`Input: Invalid size "${size}". Using "medium".`);
      this.props.size = 'medium';
    }
  }

  /**
   * Generate element IDs for accessibility
   * @private
   * @returns {Object} Object with element IDs
   */
  _getIds() {
    const baseId = this.props.id;
    return {
      input: baseId,
      label: `${baseId}-label`,
      help: `${baseId}-help`,
      error: `${baseId}-error`,
    };
  }

  /**
   * Generate CSS class names based on state
   * @private
   * @returns {string} Space-separated class names
   */
  _getClassNames() {
    const { disabled, size, type } = this.props;
    const { error, focused } = this.state;
    const classes = ['input-field'];

    classes.push(`input-field--${size}`);

    if (disabled) classes.push('input-field--disabled');
    if (error) classes.push('input-field--error');
    if (focused) classes.push('input-field--focused');
    if (type === 'password') classes.push('input-field--password');

    return classes.join(' ');
  }

  /**
   * Handle input event
   * @private
   * @param {Event} event - Input event
   */
  _handleInput(event) {
    const value = event.target.value;
    this.state.value = value;

    // Validate on input if configured
    if (this.props.validateOn === 'input' && this.state.touched) {
      this.validate();
    }

    // Update counter if shown
    this._updateCounter();

    // Call user's onInput handler
    if (typeof this.props.onInput === 'function') {
      this.props.onInput(value, event);
    }
  }

  /**
   * Handle change event
   * @private
   * @param {Event} event - Change event
   */
  _handleChange(event) {
    const value = event.target.value;
    this.state.value = value;

    // Call user's onChange handler
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value, event);
    }
  }

  /**
   * Handle focus event
   * @private
   * @param {Event} event - Focus event
   */
  _handleFocus(event) {
    this.state.focused = true;
    this._updateContainerClasses();

    // Call user's onFocus handler
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event);
    }
  }

  /**
   * Handle blur event
   * @private
   * @param {Event} event - Blur event
   */
  _handleBlur(event) {
    this.state.focused = false;
    this.state.touched = true;
    this._updateContainerClasses();

    // Validate on blur if configured
    if (this.props.validateOn === 'blur') {
      this.validate();
    }

    // Call user's onBlur handler
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event);
    }
  }

  /**
   * Handle keydown event
   * @private
   * @param {KeyboardEvent} event - Keyboard event
   */
  _handleKeyDown(event) {
    // Allow form submission on Enter
    if (event.key === 'Enter' && this.props.type !== 'textarea') {
      // Validate before potential form submission
      this.validate();
    }
  }

  /**
   * Update container classes based on state
   * @private
   */
  _updateContainerClasses() {
    if (this.element) {
      this.element.className = this._getClassNames();
    }
  }

  /**
   * Update character counter
   * @private
   */
  _updateCounter() {
    if (!this.props.showCounter || !this.props.maxLength) return;

    const counterEl = this.element?.querySelector('.input-field__counter');
    if (!counterEl) return;

    const currentLength = this.state.value.length;
    const maxLength = this.props.maxLength;
    counterEl.textContent = `${currentLength}/${maxLength}`;

    // Update counter state classes
    counterEl.classList.remove('input-field__counter--warning', 'input-field__counter--error');
    if (currentLength >= maxLength) {
      counterEl.classList.add('input-field__counter--error');
    } else if (currentLength >= maxLength * 0.9) {
      counterEl.classList.add('input-field__counter--warning');
    }
  }

  /**
   * Create the label element
   * @private
   * @returns {HTMLElement} Label element
   */
  _createLabel() {
    const { label, required } = this.props;
    const ids = this._getIds();

    const labelEl = document.createElement('label');
    labelEl.className = 'input-field__label';
    labelEl.id = ids.label;
    labelEl.setAttribute('for', ids.input);
    labelEl.textContent = label;

    if (required) {
      const requiredEl = document.createElement('span');
      requiredEl.className = 'input-field__required';
      requiredEl.setAttribute('aria-label', 'required');
      requiredEl.textContent = '*';
      labelEl.appendChild(requiredEl);
    }

    return labelEl;
  }

  /**
   * Create the input element
   * @private
   * @returns {HTMLInputElement} Input element
   */
  _createInput() {
    const {
      type, name, placeholder, disabled, readonly,
      minLength, maxLength, min, max, pattern,
      autocomplete, ariaLabel, required
    } = this.props;
    const ids = this._getIds();

    const input = document.createElement('input');
    input.type = type;
    input.className = 'input-field__input';
    input.id = ids.input;
    input.name = name;
    input.value = this.state.value;

    if (placeholder) input.placeholder = placeholder;
    if (disabled) input.disabled = true;
    if (readonly) input.readOnly = true;
    if (required) input.required = true;
    if (minLength !== null) input.minLength = minLength;
    if (maxLength !== null) input.maxLength = maxLength;
    if (min !== null) input.min = min;
    if (max !== null) input.max = max;
    if (pattern !== null) input.pattern = pattern;
    if (autocomplete) input.autocomplete = autocomplete;

    // Accessibility attributes
    if (ariaLabel) {
      input.setAttribute('aria-label', ariaLabel);
    }

    // Build aria-describedby
    const describedBy = [];
    if (this.props.helpText) describedBy.push(ids.help);
    if (this.state.error) describedBy.push(ids.error);
    if (this.props.ariaDescribedBy) describedBy.push(this.props.ariaDescribedBy);

    if (describedBy.length > 0) {
      input.setAttribute('aria-describedby', describedBy.join(' '));
    }

    // Error state
    input.setAttribute('aria-invalid', this.state.error ? 'true' : 'false');

    // Attach event listeners
    input.addEventListener('input', this._handleInput);
    input.addEventListener('change', this._handleChange);
    input.addEventListener('focus', this._handleFocus);
    input.addEventListener('blur', this._handleBlur);
    input.addEventListener('keydown', this._handleKeyDown);

    return input;
  }

  /**
   * Create the help text element
   * @private
   * @returns {HTMLElement|null} Help text element or null
   */
  _createHelpText() {
    const { helpText } = this.props;
    if (!helpText) return null;

    const ids = this._getIds();
    const helpEl = document.createElement('p');
    helpEl.className = 'input-field__help';
    helpEl.id = ids.help;
    helpEl.textContent = helpText;

    return helpEl;
  }

  /**
   * Create the error message element
   * @private
   * @returns {HTMLElement} Error element
   */
  _createError() {
    const ids = this._getIds();

    const errorEl = document.createElement('div');
    errorEl.className = 'input-field__error';
    errorEl.id = ids.error;
    errorEl.setAttribute('role', 'alert');
    errorEl.setAttribute('aria-live', 'assertive');

    const iconEl = document.createElement('span');
    iconEl.className = 'input-field__error-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.innerHTML = '!';

    const textEl = document.createElement('span');
    textEl.className = 'input-field__error-text';
    textEl.textContent = this.state.error;

    errorEl.appendChild(iconEl);
    errorEl.appendChild(textEl);

    return errorEl;
  }

  /**
   * Create character counter element
   * @private
   * @returns {HTMLElement|null} Counter element or null
   */
  _createCounter() {
    if (!this.props.showCounter || !this.props.maxLength) return null;

    const counterEl = document.createElement('div');
    counterEl.className = 'input-field__counter';
    counterEl.textContent = `${this.state.value.length}/${this.props.maxLength}`;
    counterEl.setAttribute('aria-live', 'polite');

    return counterEl;
  }

  /**
   * Render the input component
   * @returns {HTMLElement} The container element
   */
  render() {
    const { label, type } = this.props;

    // Create container
    const container = document.createElement('div');
    container.className = this._getClassNames();

    // Add label
    if (label) {
      container.appendChild(this._createLabel());
    }

    // Create input wrapper (for password toggle, etc.)
    if (type === 'password') {
      const wrapper = document.createElement('div');
      wrapper.className = 'input-field__wrapper';

      this.inputElement = this._createInput();
      wrapper.appendChild(this.inputElement);

      // Add password toggle button
      const toggleBtn = this._createPasswordToggle();
      wrapper.appendChild(toggleBtn);

      container.appendChild(wrapper);
    } else {
      this.inputElement = this._createInput();
      container.appendChild(this.inputElement);
    }

    // Add help text
    const helpText = this._createHelpText();
    if (helpText) {
      container.appendChild(helpText);
    }

    // Add error message
    this.errorElement = this._createError();
    container.appendChild(this.errorElement);

    // Add character counter
    const counter = this._createCounter();
    if (counter) {
      container.appendChild(counter);
    }

    this.element = container;
    return container;
  }

  /**
   * Create password visibility toggle button
   * @private
   * @returns {HTMLButtonElement} Toggle button element
   */
  _createPasswordToggle() {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'input-field__toggle';
    toggle.setAttribute('aria-label', 'Show password');

    // Eye icon (show password)
    toggle.innerHTML = `
      <svg class="input-field__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `;

    let isVisible = false;

    toggle.addEventListener('click', () => {
      isVisible = !isVisible;
      this.inputElement.type = isVisible ? 'text' : 'password';
      toggle.setAttribute('aria-label', isVisible ? 'Hide password' : 'Show password');

      // Update icon
      if (isVisible) {
        toggle.innerHTML = `
          <svg class="input-field__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        `;
      } else {
        toggle.innerHTML = `
          <svg class="input-field__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      }
    });

    return toggle;
  }

  /**
   * Validate the input value
   * @returns {boolean} True if valid
   */
  validate() {
    const { validators, required, onValidate } = this.props;
    const value = this.state.value;
    let error = '';

    // Check required first
    if (required && (!value || String(value).trim() === '')) {
      error = 'This field is required';
    }

    // Run custom validators if value is present or required check passed
    if (!error && validators.length > 0) {
      for (const validator of validators) {
        const result = validator(value);
        if (!result.isValid) {
          error = result.errorMessage;
          break;
        }
      }
    }

    // Update state and UI
    this.state.error = error;
    this._updateError();
    this._updateContainerClasses();

    // Update aria-invalid
    if (this.inputElement) {
      this.inputElement.setAttribute('aria-invalid', error ? 'true' : 'false');

      // Update aria-describedby
      const ids = this._getIds();
      const describedBy = [];
      if (this.props.helpText) describedBy.push(ids.help);
      if (error) describedBy.push(ids.error);
      if (this.props.ariaDescribedBy) describedBy.push(this.props.ariaDescribedBy);

      if (describedBy.length > 0) {
        this.inputElement.setAttribute('aria-describedby', describedBy.join(' '));
      } else {
        this.inputElement.removeAttribute('aria-describedby');
      }
    }

    // Call onValidate callback
    if (typeof onValidate === 'function') {
      onValidate(!error, error);
    }

    return !error;
  }

  /**
   * Update the error message display
   * @private
   */
  _updateError() {
    if (!this.errorElement) return;

    const textEl = this.errorElement.querySelector('.input-field__error-text');
    if (textEl) {
      textEl.textContent = this.state.error;
    }
  }

  /**
   * Show an error message
   * @param {string} message - Error message to display
   */
  showError(message) {
    this.state.error = message;
    this._updateError();
    this._updateContainerClasses();

    if (this.inputElement) {
      this.inputElement.setAttribute('aria-invalid', 'true');
    }

    // Add shake animation for attention
    if (this.element) {
      this.element.classList.add('input-field--shake');
      setTimeout(() => {
        this.element.classList.remove('input-field--shake');
      }, 500);
    }
  }

  /**
   * Clear the error message
   */
  clearError() {
    this.state.error = '';
    this._updateError();
    this._updateContainerClasses();

    if (this.inputElement) {
      this.inputElement.setAttribute('aria-invalid', 'false');
    }
  }

  /**
   * Get the current value
   * @returns {string} Current input value
   */
  getValue() {
    return this.state.value;
  }

  /**
   * Set the input value
   * @param {string} value - Value to set
   * @param {boolean} [triggerValidation=false] - Whether to validate after setting
   */
  setValue(value, triggerValidation = false) {
    this.state.value = value;

    if (this.inputElement) {
      this.inputElement.value = value;
    }

    this._updateCounter();

    if (triggerValidation) {
      this.validate();
    }
  }

  /**
   * Focus the input element
   */
  focus() {
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }

  /**
   * Blur the input element
   */
  blur() {
    if (this.inputElement) {
      this.inputElement.blur();
    }
  }

  /**
   * Reset the input to initial state
   */
  reset() {
    this.state.value = this.props.value;
    this.state.error = '';
    this.state.touched = false;

    if (this.inputElement) {
      this.inputElement.value = this.props.value;
    }

    this.clearError();
    this._updateCounter();
  }

  /**
   * Set disabled state
   * @param {boolean} disabled - Disabled state
   */
  setDisabled(disabled) {
    this.props.disabled = disabled;

    if (this.inputElement) {
      this.inputElement.disabled = disabled;
    }

    this._updateContainerClasses();
  }

  /**
   * Check if the input has been touched
   * @returns {boolean} True if touched
   */
  isTouched() {
    return this.state.touched;
  }

  /**
   * Check if the input has an error
   * @returns {boolean} True if has error
   */
  hasError() {
    return !!this.state.error;
  }

  /**
   * Get the error message
   * @returns {string} Current error message
   */
  getError() {
    return this.state.error;
  }

  /**
   * Remove event listeners and clean up
   */
  destroy() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('input', this._handleInput);
      this.inputElement.removeEventListener('change', this._handleChange);
      this.inputElement.removeEventListener('focus', this._handleFocus);
      this.inputElement.removeEventListener('blur', this._handleBlur);
      this.inputElement.removeEventListener('keydown', this._handleKeyDown);
    }

    if (this.element) {
      this.element.remove();
    }

    this.element = null;
    this.inputElement = null;
    this.errorElement = null;
  }
}

/**
 * Factory function to create an input
 * @param {Object} props - Input properties
 * @returns {Input} Input instance
 */
function createInput(props) {
  return new Input(props);
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Input, createInput };
}

// Export for ES modules
if (typeof window !== 'undefined') {
  window.Input = Input;
  window.createInput = createInput;
}
