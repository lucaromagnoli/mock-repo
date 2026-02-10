/**
 * Loading Components - Public API
 * ================================
 * Entry point for loading indicators and spinners.
 *
 * Usage (CommonJS):
 *   const { LoadingManager, Spinner, LoadingOverlay } = require('./Loading');
 *
 * Usage (Browser):
 *   Include LoadingManager.js via script tag.
 *   Components are available globally.
 */

if (typeof module !== 'undefined' && module.exports) {
  const {
    Spinner,
    Skeleton,
    LoadingOverlay,
    LoadingOverlayClass,
    LoadingManager,
    setButtonLoading,
    createElementLoader,
    LOADING_CONFIG,
  } = require('./LoadingManager.js');

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
