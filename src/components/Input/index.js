/**
 * Input Component - Public API
 * ============================
 * Entry point for the Input component module.
 */

// Import component (for bundlers that support it)
// For vanilla JS usage, files are loaded via script tags

// Export component class, factory functions, and validators
if (typeof module !== 'undefined' && module.exports) {
  const { Input, createInput } = require('./Input.js');
  const { validators } = require('./validators.js');
  module.exports = { Input, createInput, validators };
}
