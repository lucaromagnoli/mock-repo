/**
 * Toast Notification Manager
 * ==========================
 * A centralized notification system for displaying success, error, info,
 * and warning messages with auto-dismiss functionality.
 *
 * @example
 * ToastManager.success('Profile updated successfully!');
 * ToastManager.error('Failed to save', { title: 'Network Error' });
 */

/**
 * Generate a unique ID for toast notifications
 * @returns {string} Unique identifier
 */
function generateId() {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Toast notification configuration defaults
 */
const DEFAULT_CONFIG = {
  maxVisible: 5,
  position: 'top-right',
  defaultDuration: {
    success: 4000,
    error: 0, // Manual dismiss for errors
    warning: 6000,
    info: 4000,
  },
  animationDuration: 300,
  duplicateThreshold: 500, // Debounce duplicate messages (ms)
};

/**
 * ToastManager singleton class
 */
class ToastManagerClass {
  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.toasts = new Map(); // Active toasts
    this.queue = []; // Queued toasts waiting to display
    this.recentMessages = new Map(); // For duplicate detection
    this.container = null;
    this._initialized = false;
  }

  /**
   * Initialize the toast container in the DOM
   */
  _init() {
    if (this._initialized) return;

    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', 'Notifications');
    this._updateContainerPosition();

    document.body.appendChild(this.container);

    // Listen for Escape key to dismiss focused toast
    document.addEventListener('keydown', this._handleKeyDown.bind(this));

    this._initialized = true;
  }

  /**
   * Update container position based on config
   */
  _updateContainerPosition() {
    if (!this.container) return;
    this.container.className = `toast-container toast-container--${this.config.position}`;
  }

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} event
   */
  _handleKeyDown(event) {
    if (event.key === 'Escape') {
      // Dismiss the most recent dismissible toast
      const toasts = Array.from(this.toasts.values());
      const lastDismissible = toasts.reverse().find(t => t.dismissible);
      if (lastDismissible) {
        this.dismiss(lastDismissible.id);
      }
    }
  }

  /**
   * Configure the ToastManager
   * @param {Object} options - Configuration options
   */
  configure(options) {
    this.config = { ...this.config, ...options };
    if (options.defaultDuration) {
      this.config.defaultDuration = { ...DEFAULT_CONFIG.defaultDuration, ...options.defaultDuration };
    }
    this._updateContainerPosition();
  }

  /**
   * Check if message is a duplicate within threshold
   * @param {string} message - Message to check
   * @returns {boolean} True if duplicate
   */
  _isDuplicate(message) {
    const now = Date.now();
    const lastTime = this.recentMessages.get(message);

    if (lastTime && now - lastTime < this.config.duplicateThreshold) {
      return true;
    }

    this.recentMessages.set(message, now);

    // Clean up old entries
    for (const [msg, time] of this.recentMessages) {
      if (now - time > this.config.duplicateThreshold) {
        this.recentMessages.delete(msg);
      }
    }

    return false;
  }

  /**
   * Create a toast notification
   * @param {Object} options - Toast options
   * @returns {string|null} Toast ID or null if duplicate
   */
  _createToast(options) {
    const {
      type = 'info',
      message,
      title = '',
      duration,
      dismissible = true,
      onDismiss = null,
    } = options;

    // Validate message
    if (!message || typeof message !== 'string') {
      console.warn('ToastManager: Message is required');
      return null;
    }

    // Check for duplicates
    if (this._isDuplicate(message)) {
      return null;
    }

    const toast = {
      id: generateId(),
      type,
      message: escapeHtml(message),
      title: escapeHtml(title),
      duration: duration !== undefined ? duration : this.config.defaultDuration[type],
      dismissible,
      onDismiss,
      timestamp: Date.now(),
      element: null,
      timeout: null,
    };

    return toast;
  }

  /**
   * Build the DOM element for a toast
   * @param {Object} toast - Toast object
   * @returns {HTMLElement} Toast element
   */
  _buildElement(toast) {
    const el = document.createElement('div');
    el.className = `toast toast--${toast.type}`;
    el.id = toast.id;
    el.setAttribute('role', toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status');
    el.setAttribute('aria-live', toast.type === 'error' || toast.type === 'warning' ? 'assertive' : 'polite');
    el.setAttribute('aria-atomic', 'true');

    // Icon
    const iconMap = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };

    const icon = document.createElement('span');
    icon.className = 'toast__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = iconMap[toast.type] || iconMap.info;

    // Content
    const content = document.createElement('div');
    content.className = 'toast__content';

    if (toast.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'toast__title';
      titleEl.textContent = toast.title;
      content.appendChild(titleEl);
    }

    const messageEl = document.createElement('div');
    messageEl.className = 'toast__message';
    messageEl.textContent = toast.message;
    content.appendChild(messageEl);

    // Dismiss button
    let dismissBtn = null;
    if (toast.dismissible) {
      dismissBtn = document.createElement('button');
      dismissBtn.className = 'toast__dismiss';
      dismissBtn.setAttribute('type', 'button');
      dismissBtn.setAttribute('aria-label', 'Dismiss notification');
      dismissBtn.innerHTML = '<span aria-hidden="true">×</span>';
      dismissBtn.addEventListener('click', () => this.dismiss(toast.id));
    }

    el.appendChild(icon);
    el.appendChild(content);
    if (dismissBtn) {
      el.appendChild(dismissBtn);
    }

    return el;
  }

  /**
   * Add a toast to the DOM
   * @param {Object} toast - Toast object
   */
  _addToDOM(toast) {
    this._init();

    // Check if we need to queue
    if (this.toasts.size >= this.config.maxVisible) {
      this.queue.push(toast);
      return;
    }

    const element = this._buildElement(toast);
    toast.element = element;

    // Add to container
    this.container.appendChild(element);
    this.toasts.set(toast.id, toast);

    // Trigger enter animation (use setTimeout to ensure CSS transition works)
    requestAnimationFrame(() => {
      element.classList.add('toast--visible');
    });

    // Schedule auto-dismiss
    if (toast.duration > 0) {
      toast.timeout = setTimeout(() => {
        this.dismiss(toast.id);
      }, toast.duration);
    }
  }

  /**
   * Remove a toast from the DOM
   * @param {Object} toast - Toast object
   */
  _removeFromDOM(toast) {
    if (!toast || !toast.element) return;

    // Clear timeout
    if (toast.timeout) {
      clearTimeout(toast.timeout);
      toast.timeout = null;
    }

    // Trigger exit animation
    toast.element.classList.remove('toast--visible');
    toast.element.classList.add('toast--exiting');

    // Remove after animation
    setTimeout(() => {
      if (toast.element && toast.element.parentNode) {
        toast.element.parentNode.removeChild(toast.element);
      }
      this.toasts.delete(toast.id);

      // Process queue
      if (this.queue.length > 0) {
        const nextToast = this.queue.shift();
        this._addToDOM(nextToast);
      }

      // Call onDismiss callback
      if (typeof toast.onDismiss === 'function') {
        toast.onDismiss();
      }
    }, this.config.animationDuration);
  }

  /**
   * Show a notification
   * @param {Object|string} options - Toast options or message string
   * @returns {string|null} Toast ID
   */
  show(options) {
    const toastOptions = typeof options === 'string' ? { message: options } : options;
    const toast = this._createToast(toastOptions);

    if (!toast) return null;

    this._addToDOM(toast);
    return toast.id;
  }

  /**
   * Show a success notification
   * @param {string} message - Message text
   * @param {Object} options - Additional options
   * @returns {string|null} Toast ID
   */
  success(message, options = {}) {
    return this.show({ ...options, type: 'success', message });
  }

  /**
   * Show an error notification
   * @param {string} message - Message text
   * @param {Object} options - Additional options
   * @returns {string|null} Toast ID
   */
  error(message, options = {}) {
    return this.show({ ...options, type: 'error', message });
  }

  /**
   * Show a warning notification
   * @param {string} message - Message text
   * @param {Object} options - Additional options
   * @returns {string|null} Toast ID
   */
  warning(message, options = {}) {
    return this.show({ ...options, type: 'warning', message });
  }

  /**
   * Show an info notification
   * @param {string} message - Message text
   * @param {Object} options - Additional options
   * @returns {string|null} Toast ID
   */
  info(message, options = {}) {
    return this.show({ ...options, type: 'info', message });
  }

  /**
   * Dismiss a specific toast
   * @param {string} id - Toast ID
   */
  dismiss(id) {
    const toast = this.toasts.get(id);
    if (toast) {
      this._removeFromDOM(toast);
    } else {
      // Check if it's in the queue
      const queueIndex = this.queue.findIndex(t => t.id === id);
      if (queueIndex > -1) {
        this.queue.splice(queueIndex, 1);
      }
    }
  }

  /**
   * Dismiss all toasts
   */
  dismissAll() {
    // Clear queue first
    this.queue = [];

    // Dismiss all active toasts
    for (const toast of this.toasts.values()) {
      this._removeFromDOM(toast);
    }
  }

  /**
   * Get the count of active toasts
   * @returns {number} Number of active toasts
   */
  getCount() {
    return this.toasts.size + this.queue.length;
  }

  /**
   * Destroy the ToastManager and clean up
   */
  destroy() {
    this.dismissAll();

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    this.container = null;
    this._initialized = false;
    this.recentMessages.clear();
  }
}

// Create singleton instance
const ToastManager = new ToastManagerClass();

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ToastManager, ToastManagerClass };
}

// Make available globally
if (typeof window !== 'undefined') {
  window.ToastManager = ToastManager;
}
