/**
 * Toast Component - Public API
 * ============================
 * Entry point for the Toast notification system.
 *
 * Usage (CommonJS):
 *   const { ToastManager } = require('./Toast');
 *
 * Usage (Browser):
 *   Include ToastManager.js via script tag.
 *   ToastManager is available globally.
 */

if (typeof module !== 'undefined' && module.exports) {
  const { ToastManager, ToastManagerClass } = require('./ToastManager.js');
  module.exports = { ToastManager, ToastManagerClass };
}
