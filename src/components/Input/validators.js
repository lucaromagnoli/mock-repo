/**
 * Input Validators
 * ================
 * Built-in validation functions for the Input component.
 * Each validator returns an object with isValid and errorMessage.
 *
 * @example
 * const emailValidator = validators.email('Please enter a valid email');
 * const result = emailValidator('test@example.com');
 * // { isValid: true, errorMessage: '' }
 */

const validators = {
  /**
   * Required field validator
   * @param {string} [message='This field is required'] - Error message
   * @returns {Function} Validator function
   */
  required(message = 'This field is required') {
    return (value) => {
      const isValid = value !== null && value !== undefined && String(value).trim() !== '';
      return {
        isValid,
        errorMessage: isValid ? '' : message
      };
    };
  },

  /**
   * Email validator
   * Uses a reasonable regex pattern for most email formats
   * @param {string} [message='Please enter a valid email address'] - Error message
   * @returns {Function} Validator function
   */
  email(message = 'Please enter a valid email address') {
    // RFC 5322 compliant-ish email regex (simplified for performance)
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return (value) => {
      // Empty values should be handled by required validator
      if (!value || String(value).trim() === '') {
        return { isValid: true, errorMessage: '' };
      }

      const isValid = emailPattern.test(String(value).toLowerCase());
      return {
        isValid,
        errorMessage: isValid ? '' : message
      };
    };
  },

  /**
   * Minimum length validator
   * @param {number} min - Minimum length
   * @param {string} [message] - Error message (default includes min value)
   * @returns {Function} Validator function
   */
  minLength(min, message) {
    const errorMessage = message || `Must be at least ${min} characters`;

    return (value) => {
      // Empty values should be handled by required validator
      if (!value || String(value) === '') {
        return { isValid: true, errorMessage: '' };
      }

      const isValid = String(value).length >= min;
      return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
      };
    };
  },

  /**
   * Maximum length validator
   * @param {number} max - Maximum length
   * @param {string} [message] - Error message (default includes max value)
   * @returns {Function} Validator function
   */
  maxLength(max, message) {
    const errorMessage = message || `Must be no more than ${max} characters`;

    return (value) => {
      const isValid = String(value || '').length <= max;
      return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
      };
    };
  },

  /**
   * Regex pattern validator
   * @param {RegExp} pattern - Regular expression pattern
   * @param {string} [message='Invalid format'] - Error message
   * @returns {Function} Validator function
   */
  pattern(pattern, message = 'Invalid format') {
    return (value) => {
      // Empty values should be handled by required validator
      if (!value || String(value) === '') {
        return { isValid: true, errorMessage: '' };
      }

      const isValid = pattern.test(String(value));
      return {
        isValid,
        errorMessage: isValid ? '' : message
      };
    };
  },

  /**
   * Minimum value validator (for numbers)
   * @param {number} min - Minimum value
   * @param {string} [message] - Error message (default includes min value)
   * @returns {Function} Validator function
   */
  min(min, message) {
    const errorMessage = message || `Must be at least ${min}`;

    return (value) => {
      // Empty values should be handled by required validator
      if (value === '' || value === null || value === undefined) {
        return { isValid: true, errorMessage: '' };
      }

      const numValue = Number(value);
      if (isNaN(numValue)) {
        return { isValid: false, errorMessage: 'Please enter a valid number' };
      }

      const isValid = numValue >= min;
      return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
      };
    };
  },

  /**
   * Maximum value validator (for numbers)
   * @param {number} max - Maximum value
   * @param {string} [message] - Error message (default includes max value)
   * @returns {Function} Validator function
   */
  max(max, message) {
    const errorMessage = message || `Must be no more than ${max}`;

    return (value) => {
      // Empty values should be handled by required validator
      if (value === '' || value === null || value === undefined) {
        return { isValid: true, errorMessage: '' };
      }

      const numValue = Number(value);
      if (isNaN(numValue)) {
        return { isValid: false, errorMessage: 'Please enter a valid number' };
      }

      const isValid = numValue <= max;
      return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
      };
    };
  },

  /**
   * Number range validator
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @param {string} [message] - Error message
   * @returns {Function} Validator function
   */
  range(min, max, message) {
    const errorMessage = message || `Must be between ${min} and ${max}`;

    return (value) => {
      // Empty values should be handled by required validator
      if (value === '' || value === null || value === undefined) {
        return { isValid: true, errorMessage: '' };
      }

      const numValue = Number(value);
      if (isNaN(numValue)) {
        return { isValid: false, errorMessage: 'Please enter a valid number' };
      }

      const isValid = numValue >= min && numValue <= max;
      return {
        isValid,
        errorMessage: isValid ? '' : errorMessage
      };
    };
  },

  /**
   * URL validator
   * @param {string} [message='Please enter a valid URL'] - Error message
   * @returns {Function} Validator function
   */
  url(message = 'Please enter a valid URL') {
    return (value) => {
      // Empty values should be handled by required validator
      if (!value || String(value).trim() === '') {
        return { isValid: true, errorMessage: '' };
      }

      try {
        new URL(value);
        return { isValid: true, errorMessage: '' };
      } catch {
        return { isValid: false, errorMessage: message };
      }
    };
  },

  /**
   * Phone number validator (flexible format)
   * @param {string} [message='Please enter a valid phone number'] - Error message
   * @returns {Function} Validator function
   */
  phone(message = 'Please enter a valid phone number') {
    // Flexible phone pattern - allows various formats
    const phonePattern = /^[\d\s\-+()]{10,}$/;

    return (value) => {
      // Empty values should be handled by required validator
      if (!value || String(value).trim() === '') {
        return { isValid: true, errorMessage: '' };
      }

      const cleaned = String(value).replace(/[\s\-()]/g, '');
      const isValid = phonePattern.test(value) && cleaned.length >= 10;
      return {
        isValid,
        errorMessage: isValid ? '' : message
      };
    };
  },

  /**
   * Matches another field validator
   * @param {Function} getOtherValue - Function that returns the other field's value
   * @param {string} [message='Values do not match'] - Error message
   * @returns {Function} Validator function
   */
  matches(getOtherValue, message = 'Values do not match') {
    return (value) => {
      const otherValue = typeof getOtherValue === 'function' ? getOtherValue() : getOtherValue;
      const isValid = value === otherValue;
      return {
        isValid,
        errorMessage: isValid ? '' : message
      };
    };
  },

  /**
   * Custom validator wrapper
   * @param {Function} validatorFn - Custom validation function that returns boolean
   * @param {string} message - Error message when validation fails
   * @returns {Function} Validator function
   */
  custom(validatorFn, message = 'Invalid value') {
    return (value) => {
      const isValid = validatorFn(value);
      return {
        isValid,
        errorMessage: isValid ? '' : message
      };
    };
  },

  /**
   * Compose multiple validators (AND logic - all must pass)
   * @param {...Function} validatorFns - Validator functions to compose
   * @returns {Function} Composed validator function
   */
  compose(...validatorFns) {
    return (value) => {
      for (const validator of validatorFns) {
        const result = validator(value);
        if (!result.isValid) {
          return result;
        }
      }
      return { isValid: true, errorMessage: '' };
    };
  },

  /**
   * Any of multiple validators (OR logic - at least one must pass)
   * @param {string} message - Error message when all validators fail
   * @param {...Function} validatorFns - Validator functions
   * @returns {Function} Validator function
   */
  anyOf(message, ...validatorFns) {
    return (value) => {
      for (const validator of validatorFns) {
        const result = validator(value);
        if (result.isValid) {
          return result;
        }
      }
      return { isValid: false, errorMessage: message };
    };
  }
};

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validators };
}

if (typeof window !== 'undefined') {
  window.validators = validators;
}
