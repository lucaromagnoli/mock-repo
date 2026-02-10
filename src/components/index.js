/**
 * UI Components Library - Public API
 * ===================================
 * Entry point for all UI components.
 *
 * Usage (CommonJS):
 *   const { Button, Input, validators } = require('./components');
 *
 * Usage (Browser):
 *   Include individual component JS files via script tags.
 *   Components are available globally (window.Button, window.Input, etc.)
 */

// Export all components
if (typeof module !== 'undefined' && module.exports) {
  const { Button, createButton, createButtons } = require('./Button/Button.js');
  const { Input, createInput } = require('./Input/Input.js');
  const { validators } = require('./Input/validators.js');

  module.exports = {
    // Button exports
    Button,
    createButton,
    createButtons,

    // Input exports
    Input,
    createInput,
    validators,
  };
}
