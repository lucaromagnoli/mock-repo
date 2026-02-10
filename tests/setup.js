/**
 * Test Environment Setup
 * ======================
 * Configures the test environment for component testing.
 * Sets up JSDOM and provides test utilities.
 */

// Check if we're in a Node.js environment
const isNode = typeof window === 'undefined';

/**
 * Setup JSDOM environment for Node.js testing
 */
function setupJsdom() {
  if (isNode) {
    try {
      const { JSDOM } = require('jsdom');
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
        url: 'http://localhost',
        pretendToBeVisual: true,
      });

      global.window = dom.window;
      global.document = dom.window.document;
      global.navigator = dom.window.navigator;
      global.HTMLElement = dom.window.HTMLElement;
      global.Event = dom.window.Event;
      global.KeyboardEvent = dom.window.KeyboardEvent;
      global.MouseEvent = dom.window.MouseEvent;
      global.FocusEvent = dom.window.FocusEvent;
      global.CustomEvent = dom.window.CustomEvent;

      console.log('JSDOM environment initialized');
    } catch (error) {
      console.warn('JSDOM not available. Tests requiring DOM will fail.');
      console.warn('Install with: npm install --save-dev jsdom');
    }
  }
}

/**
 * Clean up DOM between tests
 */
function cleanupDom() {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = '';
  }
}

/**
 * Wait for a specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Simulate a DOM event
 * @param {HTMLElement} element - Target element
 * @param {string} eventType - Event type (e.g., 'click', 'input')
 * @param {Object} options - Event options
 */
function simulateEvent(element, eventType, options = {}) {
  let event;

  switch (eventType) {
    case 'click':
    case 'mousedown':
    case 'mouseup':
    case 'mouseover':
    case 'mouseout':
      event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
        ...options
      });
      break;

    case 'keydown':
    case 'keyup':
    case 'keypress':
      event = new KeyboardEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
        ...options
      });
      break;

    case 'focus':
    case 'blur':
      event = new FocusEvent(eventType, {
        bubbles: eventType === 'focus' ? false : true,
        cancelable: false,
        view: window,
        ...options
      });
      break;

    case 'input':
    case 'change':
      event = new Event(eventType, {
        bubbles: true,
        cancelable: true,
        ...options
      });
      break;

    default:
      event = new Event(eventType, {
        bubbles: true,
        cancelable: true,
        ...options
      });
  }

  element.dispatchEvent(event);
}

/**
 * Type text into an input element
 * @param {HTMLInputElement} input - Input element
 * @param {string} text - Text to type
 */
function typeInto(input, text) {
  input.focus();
  input.value = text;
  simulateEvent(input, 'input');
  simulateEvent(input, 'change');
}

/**
 * Press a key on an element
 * @param {HTMLElement} element - Target element
 * @param {string} key - Key to press (e.g., 'Enter', 'Tab', ' ')
 * @param {Object} options - Additional key options
 */
function pressKey(element, key, options = {}) {
  simulateEvent(element, 'keydown', { key, ...options });
  simulateEvent(element, 'keyup', { key, ...options });
}

/**
 * Test assertion helpers
 */
const assert = {
  /**
   * Assert that a value is truthy
   * @param {*} value - Value to check
   * @param {string} message - Error message
   */
  ok(value, message = 'Expected value to be truthy') {
    if (!value) {
      throw new Error(message);
    }
  },

  /**
   * Assert that two values are equal
   * @param {*} actual - Actual value
   * @param {*} expected - Expected value
   * @param {string} message - Error message
   */
  equal(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected} but got ${actual}`);
    }
  },

  /**
   * Assert that two values are not equal
   * @param {*} actual - Actual value
   * @param {*} notExpected - Value that should not match
   * @param {string} message - Error message
   */
  notEqual(actual, notExpected, message) {
    if (actual === notExpected) {
      throw new Error(message || `Expected value to not equal ${notExpected}`);
    }
  },

  /**
   * Assert that a value is falsy
   * @param {*} value - Value to check
   * @param {string} message - Error message
   */
  notOk(value, message = 'Expected value to be falsy') {
    if (value) {
      throw new Error(message);
    }
  },

  /**
   * Assert that an element has a specific class
   * @param {HTMLElement} element - Element to check
   * @param {string} className - Class name to look for
   * @param {string} message - Error message
   */
  hasClass(element, className, message) {
    if (!element.classList.contains(className)) {
      throw new Error(message || `Expected element to have class "${className}"`);
    }
  },

  /**
   * Assert that an element does not have a specific class
   * @param {HTMLElement} element - Element to check
   * @param {string} className - Class name to look for
   * @param {string} message - Error message
   */
  notHasClass(element, className, message) {
    if (element.classList.contains(className)) {
      throw new Error(message || `Expected element to not have class "${className}"`);
    }
  },

  /**
   * Assert that an element has a specific attribute
   * @param {HTMLElement} element - Element to check
   * @param {string} attr - Attribute name
   * @param {string} [value] - Expected value (optional)
   * @param {string} message - Error message
   */
  hasAttribute(element, attr, value, message) {
    if (!element.hasAttribute(attr)) {
      throw new Error(message || `Expected element to have attribute "${attr}"`);
    }
    if (value !== undefined && element.getAttribute(attr) !== value) {
      throw new Error(message || `Expected attribute "${attr}" to equal "${value}" but got "${element.getAttribute(attr)}"`);
    }
  },

  /**
   * Assert that a function throws an error
   * @param {Function} fn - Function to call
   * @param {string} message - Error message
   */
  throws(fn, message = 'Expected function to throw') {
    let threw = false;
    try {
      fn();
    } catch (e) {
      threw = true;
    }
    if (!threw) {
      throw new Error(message);
    }
  },

  /**
   * Assert that an array contains a value
   * @param {Array} array - Array to check
   * @param {*} value - Value to look for
   * @param {string} message - Error message
   */
  contains(array, value, message) {
    if (!array.includes(value)) {
      throw new Error(message || `Expected array to contain ${value}`);
    }
  }
};

/**
 * Simple test runner
 */
const testRunner = {
  tests: [],
  passed: 0,
  failed: 0,
  skipped: 0,

  /**
   * Register a test
   * @param {string} name - Test name
   * @param {Function} fn - Test function
   */
  test(name, fn) {
    this.tests.push({ name, fn, skip: false });
  },

  /**
   * Skip a test
   * @param {string} name - Test name
   * @param {Function} fn - Test function
   */
  skip(name, fn) {
    this.tests.push({ name, fn, skip: true });
  },

  /**
   * Run all tests
   */
  async run() {
    console.log('\n========================================');
    console.log('Running Tests...');
    console.log('========================================\n');

    for (const test of this.tests) {
      if (test.skip) {
        console.log(`SKIP: ${test.name}`);
        this.skipped++;
        continue;
      }

      try {
        cleanupDom();
        await test.fn();
        console.log(`PASS: ${test.name}`);
        this.passed++;
      } catch (error) {
        console.log(`FAIL: ${test.name}`);
        console.log(`      Error: ${error.message}`);
        this.failed++;
      }
    }

    console.log('\n========================================');
    console.log(`Results: ${this.passed} passed, ${this.failed} failed, ${this.skipped} skipped`);
    console.log('========================================\n');

    return {
      passed: this.passed,
      failed: this.failed,
      skipped: this.skipped,
      total: this.tests.length
    };
  },

  /**
   * Reset the test runner
   */
  reset() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
  }
};

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setupJsdom,
    cleanupDom,
    wait,
    simulateEvent,
    typeInto,
    pressKey,
    assert,
    testRunner
  };
}

// Make available globally for browser tests
if (typeof window !== 'undefined') {
  window.testUtils = {
    cleanupDom,
    wait,
    simulateEvent,
    typeInto,
    pressKey,
    assert,
    testRunner
  };
}
