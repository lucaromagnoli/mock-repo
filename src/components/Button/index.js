/**
 * Button Component - Public API
 * =============================
 * Entry point for the Button component module.
 */

// Import component (for bundlers that support it)
// For vanilla JS usage, files are loaded via script tags

// Export component class and factory functions
if (typeof module !== 'undefined' && module.exports) {
  const { Button, createButton, createButtons } = require('./Button.js');
  module.exports = { Button, createButton, createButtons };
}
