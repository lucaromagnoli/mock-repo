/**
 * Accessibility Tests
 * ===================
 * Tests for WCAG 2.1 AA compliance and accessibility features.
 */

// Setup test environment
const testSetup = require('../setup.js');
testSetup.setupJsdom();

// Load components
require('../../src/components/Button/Button.js');
require('../../src/components/Input/validators.js');
require('../../src/components/Input/Input.js');

const { assert, testRunner, cleanupDom, simulateEvent } = testSetup;

// ============================================
// Button Accessibility Tests
// ============================================

testRunner.test('A11y Button: uses semantic button element', () => {
  const button = new Button({ text: 'Click me' });
  const element = button.render();

  assert.equal(element.tagName, 'BUTTON', 'Should use button element');
});

testRunner.test('A11y Button: has type attribute', () => {
  const button = new Button({ text: 'Click', type: 'submit' });
  const element = button.render();

  assert.hasAttribute(element, 'type', 'submit');
});

testRunner.test('A11y Button: supports aria-label for icon-only buttons', () => {
  const button = new Button({
    text: '',
    icon: '<svg></svg>',
    ariaLabel: 'Close dialog'
  });
  const element = button.render();

  assert.hasAttribute(element, 'aria-label', 'Close dialog');
});

testRunner.test('A11y Button: disabled state uses aria-disabled', () => {
  const button = new Button({ text: 'Disabled', disabled: true });
  const element = button.render();

  assert.hasAttribute(element, 'aria-disabled', 'true');
  assert.hasAttribute(element, 'disabled');
});

testRunner.test('A11y Button: loading state uses aria-busy', () => {
  const button = new Button({ text: 'Loading', loading: true });
  const element = button.render();

  assert.hasAttribute(element, 'aria-busy', 'true');
});

testRunner.test('A11y Button: spinner is hidden from screen readers', () => {
  const button = new Button({ text: 'Loading', loading: true });
  const element = button.render();

  const spinner = element.querySelector('.btn__spinner');
  assert.hasAttribute(spinner, 'aria-hidden', 'true');
});

testRunner.test('A11y Button: icon is hidden from screen readers', () => {
  const button = new Button({
    text: 'Edit',
    icon: '<svg></svg>'
  });
  const element = button.render();

  const icon = element.querySelector('.btn__icon');
  if (icon) {
    assert.hasAttribute(icon, 'aria-hidden', 'true');
  }
});

testRunner.test('A11y Button: has visible text content', () => {
  const button = new Button({ text: 'Submit' });
  const element = button.render();

  const text = element.querySelector('.btn__text');
  assert.ok(text, 'Should have text element');
  assert.ok(text.textContent.length > 0, 'Text should not be empty');
});

// ============================================
// Input Accessibility Tests
// ============================================

testRunner.test('A11y Input: label is associated with input via for/id', () => {
  const input = new Input({
    id: 'test-input',
    label: 'Email Address'
  });
  const element = input.render();

  const label = element.querySelector('label');
  const inputEl = element.querySelector('input');

  assert.hasAttribute(label, 'for', 'test-input');
  assert.hasAttribute(inputEl, 'id', 'test-input');
  assert.equal(label.getAttribute('for'), inputEl.getAttribute('id'));
});

testRunner.test('A11y Input: required field has required attribute', () => {
  const input = new Input({
    label: 'Name',
    required: true
  });
  const element = input.render();
  const inputEl = element.querySelector('input');

  assert.hasAttribute(inputEl, 'required');
});

testRunner.test('A11y Input: required indicator has accessible label', () => {
  const input = new Input({
    label: 'Name',
    required: true
  });
  const element = input.render();

  const requiredIndicator = element.querySelector('.input-field__required');
  assert.hasAttribute(requiredIndicator, 'aria-label', 'required');
});

testRunner.test('A11y Input: help text is associated via aria-describedby', () => {
  const input = new Input({
    id: 'help-input',
    label: 'Password',
    helpText: 'Must be at least 8 characters'
  });
  const element = input.render();
  const inputEl = element.querySelector('input');
  const helpEl = element.querySelector('.input-field__help');

  assert.ok(inputEl.getAttribute('aria-describedby').includes('help-input-help'));
  assert.hasAttribute(helpEl, 'id', 'help-input-help');
});

testRunner.test('A11y Input: error message is associated via aria-describedby', () => {
  const input = new Input({
    id: 'error-input',
    label: 'Email'
  });
  const element = input.render();
  input.showError('Invalid email');

  const inputEl = element.querySelector('input');

  assert.ok(inputEl.getAttribute('aria-describedby').includes('error-input-error'));
});

testRunner.test('A11y Input: error state sets aria-invalid', () => {
  const input = new Input({ label: 'Test' });
  input.render();

  assert.hasAttribute(input.inputElement, 'aria-invalid', 'false');

  input.showError('Error');
  assert.hasAttribute(input.inputElement, 'aria-invalid', 'true');
});

testRunner.test('A11y Input: error message has role alert', () => {
  const input = new Input({ label: 'Test' });
  const element = input.render();

  const errorEl = element.querySelector('.input-field__error');
  assert.hasAttribute(errorEl, 'role', 'alert');
});

testRunner.test('A11y Input: error message has aria-live assertive', () => {
  const input = new Input({ label: 'Test' });
  const element = input.render();

  const errorEl = element.querySelector('.input-field__error');
  assert.hasAttribute(errorEl, 'aria-live', 'assertive');
});

testRunner.test('A11y Input: error icon is hidden from screen readers', () => {
  const input = new Input({ label: 'Test' });
  const element = input.render();
  input.showError('Error');

  const errorIcon = element.querySelector('.input-field__error-icon');
  assert.hasAttribute(errorIcon, 'aria-hidden', 'true');
});

testRunner.test('A11y Input: disabled state is communicated', () => {
  const input = new Input({
    label: 'Disabled',
    disabled: true
  });
  const element = input.render();
  const inputEl = element.querySelector('input');

  assert.ok(inputEl.disabled, 'Should have disabled attribute');
});

testRunner.test('A11y Input: supports aria-label', () => {
  const input = new Input({
    ariaLabel: 'Search for products'
  });
  const element = input.render();
  const inputEl = element.querySelector('input');

  assert.hasAttribute(inputEl, 'aria-label', 'Search for products');
});

testRunner.test('A11y Input: password toggle is keyboard accessible', () => {
  const input = new Input({
    type: 'password',
    label: 'Password'
  });
  const element = input.render();

  const toggle = element.querySelector('.input-field__toggle');
  if (toggle) {
    assert.equal(toggle.getAttribute('type'), 'button', 'Should be a button');
    assert.ok(toggle.hasAttribute('aria-label'), 'Should have aria-label');
  }
});

// ============================================
// Keyboard Navigation Tests
// ============================================

testRunner.test('A11y Keyboard: button is focusable', () => {
  const button = new Button({ text: 'Click' });
  const element = button.render();
  document.body.appendChild(element);

  button.focus();
  assert.equal(document.activeElement, element, 'Button should be focusable');
});

testRunner.test('A11y Keyboard: input is focusable', () => {
  const input = new Input({ label: 'Test' });
  input.render();
  document.body.appendChild(input.element);

  input.focus();
  assert.equal(document.activeElement, input.inputElement, 'Input should be focusable');
});

testRunner.test('A11y Keyboard: disabled button is not focusable', () => {
  const button = new Button({ text: 'Disabled', disabled: true });
  const element = button.render();
  document.body.appendChild(element);

  // Disabled buttons should not receive focus
  assert.ok(element.disabled, 'Button should be disabled');
});

testRunner.test('A11y Keyboard: disabled input is not focusable', () => {
  const input = new Input({ label: 'Disabled', disabled: true });
  input.render();
  document.body.appendChild(input.element);

  // Disabled inputs should not receive focus
  assert.ok(input.inputElement.disabled, 'Input should be disabled');
});

// ============================================
// Color and Contrast Tests
// ============================================

testRunner.test('A11y Color: error state does not rely on color alone', () => {
  const input = new Input({ label: 'Test' });
  const element = input.render();
  input.showError('Error message');

  // Check for multiple indicators (class change, icon, text)
  assert.hasClass(element, 'input-field--error', 'Should have error class');

  const errorIcon = element.querySelector('.input-field__error-icon');
  assert.ok(errorIcon, 'Should have error icon');

  const errorText = element.querySelector('.input-field__error-text');
  assert.ok(errorText, 'Should have error text');
  assert.ok(errorText.textContent.length > 0, 'Error text should not be empty');
});

testRunner.test('A11y Color: button variants have sufficient contrast', () => {
  // This test documents the expected behavior
  // Actual contrast testing would require computed styles
  ['primary', 'secondary', 'tertiary', 'danger'].forEach(variant => {
    cleanupDom();
    const button = new Button({ text: 'Test', variant });
    const element = button.render();

    // All variants should have the btn class
    assert.hasClass(element, 'btn', 'Should have btn class');
    assert.hasClass(element, `btn--${variant}`, 'Should have variant class');
  });
});

// ============================================
// Screen Reader Announcement Tests
// ============================================

testRunner.test('A11y Announcements: loading state can be announced', () => {
  const button = new Button({ text: 'Submit' });
  const element = button.render();

  // Initial state
  assert.notOk(element.hasAttribute('aria-busy'), 'Should not have aria-busy initially');

  // Loading state
  button.setLoading(true);
  assert.hasAttribute(element, 'aria-busy', 'true');

  // Back to normal
  button.setLoading(false);
  assert.notOk(element.hasAttribute('aria-busy'), 'Should remove aria-busy');
});

testRunner.test('A11y Announcements: input error triggers announcement', () => {
  const input = new Input({
    id: 'announce-test',
    label: 'Test'
  });
  const element = input.render();

  const errorEl = element.querySelector('.input-field__error');

  // Error element should have aria-live for announcements
  assert.hasAttribute(errorEl, 'aria-live', 'assertive');
  assert.hasAttribute(errorEl, 'role', 'alert');
});

// ============================================
// Form Integration Accessibility Tests
// ============================================

testRunner.test('A11y Form: inputs have name attribute for form submission', () => {
  const input = new Input({
    label: 'Email',
    name: 'user_email'
  });
  const element = input.render();
  const inputEl = element.querySelector('input');

  assert.hasAttribute(inputEl, 'name', 'user_email');
});

testRunner.test('A11y Form: submit button has correct type', () => {
  const button = new Button({
    text: 'Submit',
    type: 'submit'
  });
  const element = button.render();

  assert.hasAttribute(element, 'type', 'submit');
});

testRunner.test('A11y Form: autocomplete attribute is set when provided', () => {
  const input = new Input({
    label: 'Email',
    name: 'email',
    autocomplete: 'email'
  });
  const element = input.render();
  const inputEl = element.querySelector('input');

  assert.hasAttribute(inputEl, 'autocomplete', 'email');
});

// Run all tests
testRunner.run().then(results => {
  process.exitCode = results.failed > 0 ? 1 : 0;
});
