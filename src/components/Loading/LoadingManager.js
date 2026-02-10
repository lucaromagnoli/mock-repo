/**
 * Loading Indicators and Spinners
 * ================================
 * Reusable loading components with smart delay logic to prevent flicker.
 *
 * @example
 * // Simple button loading
 * button.classList.add('loading');
 *
 * // Smart loading with delay
 * const loader = new LoadingManager({ delay: 400 });
 * await loader.wrap(fetchData());
 *
 * // Full-page overlay
 * LoadingOverlay.show('Loading...');
 */

/**
 * Default configuration for loading indicators
 */
const LOADING_CONFIG = {
  delay: 400, // Delay before showing (ms)
  minDuration: 200, // Minimum display time once shown (ms)
};

/**
 * Spinner component for inline and button loading states
 */
class Spinner {
  /**
   * Create a spinner element
   * @param {Object} options - Spinner options
   * @param {string} [options.size='medium'] - Size: 'small', 'medium', 'large'
   * @param {string} [options.variant='circular'] - Variant: 'circular', 'dots'
   * @param {string} [options.label='Loading'] - Accessible label
   * @returns {HTMLElement} Spinner element
   */
  static create(options = {}) {
    const {
      size = 'medium',
      variant = 'circular',
      label = 'Loading',
    } = options;

    const spinner = document.createElement('div');
    spinner.className = `spinner spinner--${size} spinner--${variant}`;
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-label', label);

    // Add visual representation based on variant
    if (variant === 'dots') {
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.className = 'spinner__dot';
        spinner.appendChild(dot);
      }
    }

    // Add screen reader text
    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = label;
    spinner.appendChild(srText);

    return spinner;
  }

  /**
   * Create and append a spinner to an element
   * @param {HTMLElement} parent - Parent element
   * @param {Object} options - Spinner options
   * @returns {HTMLElement} Spinner element
   */
  static appendTo(parent, options = {}) {
    const spinner = Spinner.create(options);
    parent.appendChild(spinner);
    return spinner;
  }

  /**
   * Remove spinner from parent
   * @param {HTMLElement} spinner - Spinner element to remove
   */
  static remove(spinner) {
    if (spinner && spinner.parentNode) {
      spinner.parentNode.removeChild(spinner);
    }
  }
}

/**
 * Skeleton screen component for content loading placeholders
 */
class Skeleton {
  /**
   * Create a skeleton element
   * @param {Object} options - Skeleton options
   * @param {string} [options.type='text'] - Type: 'text', 'circle', 'rect', 'card'
   * @param {string} [options.width] - Custom width
   * @param {string} [options.height] - Custom height
   * @param {number} [options.lines=1] - Number of text lines (for type='text')
   * @returns {HTMLElement} Skeleton element
   */
  static create(options = {}) {
    const {
      type = 'text',
      width,
      height,
      lines = 1,
    } = options;

    const container = document.createElement('div');
    container.className = 'skeleton-container';
    container.setAttribute('aria-hidden', 'true');

    if (type === 'text') {
      for (let i = 0; i < lines; i++) {
        const line = document.createElement('div');
        line.className = 'skeleton skeleton--text';
        if (i === lines - 1 && lines > 1) {
          line.classList.add('skeleton--short');
        }
        container.appendChild(line);
      }
    } else if (type === 'circle') {
      const circle = document.createElement('div');
      circle.className = 'skeleton skeleton--circle';
      if (width) circle.style.width = width;
      if (height) circle.style.height = height;
      container.appendChild(circle);
    } else if (type === 'rect') {
      const rect = document.createElement('div');
      rect.className = 'skeleton skeleton--rect';
      if (width) rect.style.width = width;
      if (height) rect.style.height = height;
      container.appendChild(rect);
    } else if (type === 'card') {
      const card = document.createElement('div');
      card.className = 'skeleton-card';

      const image = document.createElement('div');
      image.className = 'skeleton skeleton--image';

      const content = document.createElement('div');
      content.className = 'skeleton-card__content';

      const title = document.createElement('div');
      title.className = 'skeleton skeleton--text skeleton--title';

      const text1 = document.createElement('div');
      text1.className = 'skeleton skeleton--text';

      const text2 = document.createElement('div');
      text2.className = 'skeleton skeleton--text skeleton--short';

      content.appendChild(title);
      content.appendChild(text1);
      content.appendChild(text2);
      card.appendChild(image);
      card.appendChild(content);
      container.appendChild(card);
    }

    return container;
  }
}

/**
 * Full-page loading overlay singleton
 */
class LoadingOverlayClass {
  constructor() {
    this.element = null;
    this.isVisible = false;
    this._showTimeout = null;
    this._hideTimeout = null;
    this._showTime = null;
    this.config = { ...LOADING_CONFIG };
  }

  /**
   * Configure the overlay
   * @param {Object} options - Configuration options
   */
  configure(options) {
    this.config = { ...this.config, ...options };
  }

  /**
   * Create the overlay element
   * @param {string} message - Loading message
   * @returns {HTMLElement} Overlay element
   */
  _createOverlay(message) {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', message || 'Loading');

    const content = document.createElement('div');
    content.className = 'loading-overlay__content';

    const spinner = Spinner.create({ size: 'large' });
    content.appendChild(spinner);

    if (message) {
      const messageEl = document.createElement('div');
      messageEl.className = 'loading-overlay__message';
      messageEl.textContent = message;
      content.appendChild(messageEl);
    }

    overlay.appendChild(content);
    return overlay;
  }

  /**
   * Show the loading overlay
   * @param {string} [message] - Optional loading message
   * @param {Object} [options] - Options { immediate: boolean }
   */
  show(message = '', options = {}) {
    const { immediate = false } = options;

    // Clear any pending hide
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }

    // If already visible, just update message
    if (this.isVisible && this.element) {
      const messageEl = this.element.querySelector('.loading-overlay__message');
      if (messageEl) {
        messageEl.textContent = message;
      }
      return;
    }

    const doShow = () => {
      this.element = this._createOverlay(message);
      document.body.appendChild(this.element);
      this.isVisible = true;
      this._showTime = Date.now();

      // Trigger animation
      requestAnimationFrame(() => {
        if (this.element) {
          this.element.classList.add('loading-overlay--visible');
        }
      });
    };

    if (immediate) {
      doShow();
    } else {
      // Show after delay
      this._showTimeout = setTimeout(doShow, this.config.delay);
    }
  }

  /**
   * Hide the loading overlay
   */
  hide() {
    // Clear pending show
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    if (!this.isVisible || !this.element) {
      return;
    }

    // Ensure minimum display time
    const elapsed = Date.now() - (this._showTime || 0);
    const remaining = Math.max(0, this.config.minDuration - elapsed);

    const doHide = () => {
      if (this.element) {
        this.element.classList.remove('loading-overlay--visible');
        this.element.classList.add('loading-overlay--hiding');

        // Remove after animation
        setTimeout(() => {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
          this.element = null;
          this.isVisible = false;
          this._showTime = null;
        }, 300);
      }
    };

    if (remaining > 0) {
      this._hideTimeout = setTimeout(doHide, remaining);
    } else {
      doHide();
    }
  }

  /**
   * Check if overlay is visible
   * @returns {boolean}
   */
  isShowing() {
    return this.isVisible;
  }
}

// Create singleton
const LoadingOverlay = new LoadingOverlayClass();

/**
 * LoadingManager utility class for managing loading states with delay
 */
class LoadingManager {
  /**
   * Create a LoadingManager instance
   * @param {Object} options - Configuration options
   * @param {number} [options.delay=400] - Delay before showing loading state
   * @param {number} [options.minDuration=200] - Minimum display time
   */
  constructor(options = {}) {
    this.config = {
      delay: options.delay ?? LOADING_CONFIG.delay,
      minDuration: options.minDuration ?? LOADING_CONFIG.minDuration,
    };

    this._isLoading = false;
    this._isVisible = false;
    this._showTimeout = null;
    this._hideTimeout = null;
    this._showTime = null;
    this._onShow = options.onShow || null;
    this._onHide = options.onHide || null;
  }

  /**
   * Start loading state
   */
  start() {
    if (this._isLoading) return;
    this._isLoading = true;

    // Clear any pending hide
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }

    // Schedule show after delay
    this._showTimeout = setTimeout(() => {
      this._isVisible = true;
      this._showTime = Date.now();
      if (typeof this._onShow === 'function') {
        this._onShow();
      }
    }, this.config.delay);
  }

  /**
   * Stop loading state
   */
  stop() {
    if (!this._isLoading) return;
    this._isLoading = false;

    // Clear pending show
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    // If not yet visible, nothing to hide
    if (!this._isVisible) {
      return;
    }

    // Ensure minimum display time
    const elapsed = Date.now() - (this._showTime || 0);
    const remaining = Math.max(0, this.config.minDuration - elapsed);

    const doHide = () => {
      this._isVisible = false;
      this._showTime = null;
      if (typeof this._onHide === 'function') {
        this._onHide();
      }
    };

    if (remaining > 0) {
      this._hideTimeout = setTimeout(doHide, remaining);
    } else {
      doHide();
    }
  }

  /**
   * Wrap a promise with loading state management
   * @param {Promise} promise - Promise to wrap
   * @returns {Promise} Wrapped promise
   */
  async wrap(promise) {
    this.start();
    try {
      const result = await promise;
      return result;
    } finally {
      this.stop();
    }
  }

  /**
   * Run an async function with loading state
   * @param {Function} fn - Async function to run
   * @returns {Promise} Result of the function
   */
  async run(fn) {
    return this.wrap(fn());
  }

  /**
   * Check if currently loading
   * @returns {boolean}
   */
  isLoading() {
    return this._isLoading;
  }

  /**
   * Check if loading indicator is visible
   * @returns {boolean}
   */
  isVisible() {
    return this._isVisible;
  }

  /**
   * Reset the loading manager
   */
  reset() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    this._isLoading = false;
    this._isVisible = false;
    this._showTime = null;
  }
}

/**
 * Apply loading state to a button element
 * @param {HTMLElement} button - Button element
 * @param {boolean} loading - Loading state
 */
function setButtonLoading(button, loading) {
  if (loading) {
    button.classList.add('loading');
    button.setAttribute('aria-busy', 'true');
    button.disabled = true;
  } else {
    button.classList.remove('loading');
    button.removeAttribute('aria-busy');
    button.disabled = false;
  }
}

/**
 * Create a loading state manager for an element
 * @param {HTMLElement} element - Element to manage
 * @param {Object} options - Options
 * @returns {LoadingManager} Loading manager instance
 */
function createElementLoader(element, options = {}) {
  return new LoadingManager({
    ...options,
    onShow: () => {
      element.classList.add('loading');
      element.setAttribute('aria-busy', 'true');
      if (options.onShow) options.onShow();
    },
    onHide: () => {
      element.classList.remove('loading');
      element.removeAttribute('aria-busy');
      if (options.onHide) options.onHide();
    },
  });
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Spinner,
    Skeleton,
    LoadingOverlay,
    LoadingOverlayClass,
    LoadingManager,
    setButtonLoading,
    createElementLoader,
    LOADING_CONFIG,
  };
}

// Make available globally
if (typeof window !== 'undefined') {
  window.Spinner = Spinner;
  window.Skeleton = Skeleton;
  window.LoadingOverlay = LoadingOverlay;
  window.LoadingManager = LoadingManager;
  window.setButtonLoading = setButtonLoading;
  window.createElementLoader = createElementLoader;
}
