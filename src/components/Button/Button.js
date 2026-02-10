/**
 * Button Component
 * ================
 * A flexible, accessible button component with multiple variants,
 * sizes, and states including loading and disabled.
 *
 * @example
 * const button = new Button({
 *   text: 'Click me',
 *   variant: 'primary',
 *   size: 'medium',
 *   onClick: () => console.log('Clicked!')
 * });
 * document.body.appendChild(button.render());
 */

class Button {
  /**
   * Default button configuration
   * @type {Object}
   */
  static defaults = {
    text: '',
    variant: 'primary',
    size: 'medium',
    type: 'button',
    disabled: false,
    loading: false,
    icon: null,
    iconPosition: 'left',
    ariaLabel: null,
    onClick: null,
    fullWidth: false,
  };

  /**
   * Valid variant values
   * @type {string[]}
   */
  static variants = ['primary', 'secondary', 'tertiary', 'danger'];

  /**
   * Valid size values
   * @type {string[]}
   */
  static sizes = ['small', 'medium', 'large'];

  /**
   * Valid button types
   * @type {string[]}
   */
  static types = ['button', 'submit', 'reset'];

  /**
   * Create a Button instance
   * @param {Object} props - Button properties
   * @param {string} props.text - Button label text
   * @param {string} [props.variant='primary'] - Button variant (primary, secondary, tertiary, danger)
   * @param {string} [props.size='medium'] - Button size (small, medium, large)
   * @param {string} [props.type='button'] - Button type (button, submit, reset)
   * @param {boolean} [props.disabled=false] - Disabled state
   * @param {boolean} [props.loading=false] - Loading state
   * @param {string|null} [props.icon=null] - Icon HTML or identifier
   * @param {string} [props.iconPosition='left'] - Icon position (left, right)
   * @param {string|null} [props.ariaLabel=null] - Accessible label
   * @param {Function|null} [props.onClick=null] - Click handler
   * @param {boolean} [props.fullWidth=false] - Full width button
   */
  constructor(props = {}) {
    this.props = { ...Button.defaults, ...props };
    this.element = null;
    this._validateProps();
    this._boundHandleClick = this._handleClick.bind(this);
    this._boundHandleKeyDown = this._handleKeyDown.bind(this);
  }

  /**
   * Validate props and warn about invalid values
   * @private
   */
  _validateProps() {
    const { variant, size, type } = this.props;

    if (!Button.variants.includes(variant)) {
      console.warn(`Button: Invalid variant "${variant}". Using "primary".`);
      this.props.variant = 'primary';
    }

    if (!Button.sizes.includes(size)) {
      console.warn(`Button: Invalid size "${size}". Using "medium".`);
      this.props.size = 'medium';
    }

    if (!Button.types.includes(type)) {
      console.warn(`Button: Invalid type "${type}". Using "button".`);
      this.props.type = 'button';
    }
  }

  /**
   * Generate CSS class names based on props
   * @private
   * @returns {string} Space-separated class names
   */
  _getClassNames() {
    const { variant, size, disabled, loading, fullWidth, iconPosition, icon, text } = this.props;
    const classes = ['btn'];

    classes.push(`btn--${variant}`);
    classes.push(`btn--${size}`);

    if (disabled) classes.push('btn--disabled');
    if (loading) classes.push('btn--loading');
    if (fullWidth) classes.push('btn--full-width');
    if (icon && iconPosition === 'right') classes.push('btn--icon-right');
    if (icon && !text) classes.push('btn--icon-only');

    return classes.join(' ');
  }

  /**
   * Handle button click
   * @private
   * @param {Event} event - Click event
   */
  _handleClick(event) {
    const { disabled, loading, onClick } = this.props;

    if (disabled || loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (typeof onClick === 'function') {
      onClick(event);
    }
  }

  /**
   * Handle keyboard interactions
   * @private
   * @param {KeyboardEvent} event - Keyboard event
   */
  _handleKeyDown(event) {
    const { disabled, loading } = this.props;

    // Allow default behavior for form submission
    if (event.key === 'Enter' && this.props.type === 'submit') {
      return;
    }

    // Activate button on Enter or Space
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && !loading) {
      // Prevent space from scrolling the page
      if (event.key === ' ') {
        event.preventDefault();
      }
    }
  }

  /**
   * Create the button icon element
   * @private
   * @returns {HTMLElement|null} Icon element or null
   */
  _createIcon() {
    const { icon } = this.props;
    if (!icon) return null;

    const iconEl = document.createElement('span');
    iconEl.className = 'btn__icon';
    iconEl.setAttribute('aria-hidden', 'true');

    if (typeof icon === 'string') {
      iconEl.innerHTML = icon;
    } else if (icon instanceof HTMLElement) {
      iconEl.appendChild(icon.cloneNode(true));
    }

    return iconEl;
  }

  /**
   * Create the loading spinner element
   * @private
   * @returns {HTMLElement} Spinner element
   */
  _createSpinner() {
    const spinner = document.createElement('span');
    spinner.className = 'btn__spinner';
    spinner.setAttribute('aria-hidden', 'true');

    const spinnerIcon = document.createElement('span');
    spinnerIcon.className = 'btn__spinner-icon';

    spinner.appendChild(spinnerIcon);
    return spinner;
  }

  /**
   * Render the button element
   * @returns {HTMLButtonElement} The button element
   */
  render() {
    const { text, type, disabled, loading, ariaLabel, icon, iconPosition } = this.props;

    // Create button element
    const button = document.createElement('button');
    button.className = this._getClassNames();
    button.type = type;

    // Set disabled state
    if (disabled) {
      button.setAttribute('disabled', '');
      button.setAttribute('aria-disabled', 'true');
    }

    // Set loading state
    if (loading) {
      button.setAttribute('aria-busy', 'true');
    }

    // Set accessible label
    if (ariaLabel) {
      button.setAttribute('aria-label', ariaLabel);
    } else if (icon && !text) {
      console.warn('Button: Icon-only buttons should have an ariaLabel for accessibility.');
    }

    // Create content wrapper
    const content = document.createElement('span');
    content.className = 'btn__content';

    // Add icon (left position)
    if (icon && iconPosition === 'left') {
      const iconEl = this._createIcon();
      if (iconEl) content.appendChild(iconEl);
    }

    // Add text
    if (text) {
      const textEl = document.createElement('span');
      textEl.className = 'btn__text';
      textEl.textContent = text;
      content.appendChild(textEl);
    }

    // Add icon (right position)
    if (icon && iconPosition === 'right') {
      const iconEl = this._createIcon();
      if (iconEl) content.appendChild(iconEl);
    }

    button.appendChild(content);

    // Add loading spinner
    button.appendChild(this._createSpinner());

    // Attach event listeners
    button.addEventListener('click', this._boundHandleClick);
    button.addEventListener('keydown', this._boundHandleKeyDown);

    this.element = button;
    return button;
  }

  /**
   * Update button props and re-render
   * @param {Object} newProps - New properties to update
   */
  update(newProps) {
    const oldProps = { ...this.props };
    this.props = { ...this.props, ...newProps };
    this._validateProps();

    if (!this.element) return;

    // Update class names
    this.element.className = this._getClassNames();

    // Update disabled state
    if (this.props.disabled) {
      this.element.setAttribute('disabled', '');
      this.element.setAttribute('aria-disabled', 'true');
    } else {
      this.element.removeAttribute('disabled');
      this.element.removeAttribute('aria-disabled');
    }

    // Update loading state
    if (this.props.loading) {
      this.element.setAttribute('aria-busy', 'true');
    } else {
      this.element.removeAttribute('aria-busy');
    }

    // Update text if changed
    if (newProps.text !== undefined && newProps.text !== oldProps.text) {
      const textEl = this.element.querySelector('.btn__text');
      if (textEl) {
        textEl.textContent = this.props.text;
      }
    }

    // Update aria-label if changed
    if (newProps.ariaLabel !== undefined) {
      if (this.props.ariaLabel) {
        this.element.setAttribute('aria-label', this.props.ariaLabel);
      } else {
        this.element.removeAttribute('aria-label');
      }
    }
  }

  /**
   * Set loading state
   * @param {boolean} loading - Loading state
   */
  setLoading(loading) {
    this.update({ loading });
  }

  /**
   * Set disabled state
   * @param {boolean} disabled - Disabled state
   */
  setDisabled(disabled) {
    this.update({ disabled });
  }

  /**
   * Programmatically click the button
   */
  click() {
    if (this.element && !this.props.disabled && !this.props.loading) {
      this.element.click();
    }
  }

  /**
   * Focus the button
   */
  focus() {
    if (this.element) {
      this.element.focus();
    }
  }

  /**
   * Blur the button
   */
  blur() {
    if (this.element) {
      this.element.blur();
    }
  }

  /**
   * Remove event listeners and clean up
   */
  destroy() {
    if (this.element) {
      this.element.removeEventListener('click', this._boundHandleClick);
      this.element.removeEventListener('keydown', this._boundHandleKeyDown);
      this.element.remove();
      this.element = null;
    }
  }
}

/**
 * Factory function to create a button
 * @param {Object} props - Button properties
 * @returns {Button} Button instance
 */
function createButton(props) {
  return new Button(props);
}

/**
 * Create multiple buttons from an array of configs
 * @param {Object[]} configs - Array of button configurations
 * @returns {Button[]} Array of Button instances
 */
function createButtons(configs) {
  return configs.map(config => new Button(config));
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Button, createButton, createButtons };
}

// Export for ES modules
if (typeof window !== 'undefined') {
  window.Button = Button;
  window.createButton = createButton;
  window.createButtons = createButtons;
}
