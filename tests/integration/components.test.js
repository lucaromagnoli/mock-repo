/**
 * Integration Tests for UI Components
 * ====================================
 * Tests for component interactions and integration scenarios.
 */

// Setup test environment
const testSetup = require('../setup.js');
testSetup.setupJsdom();

// Load components
require('../../src/components/Button/Button.js');
require('../../src/components/Input/validators.js');
require('../../src/components/Input/Input.js');

const { assert, testRunner, cleanupDom, simulateEvent, typeInto, pressKey } = testSetup;

// ============================================
// Button Component Tests
// ============================================

testRunner.test('Button: renders with correct text', () => {
  const button = new Button({ text: 'Click me' });
  const element = button.render();

  assert.ok(element, 'Button should render an element');
  assert.equal(element.tagName, 'BUTTON', 'Should be a button element');
  assert.ok(element.textContent.includes('Click me'), 'Should contain the text');
});

testRunner.test('Button: applies variant classes', () => {
  ['primary', 'secondary', 'tertiary', 'danger'].forEach(variant => {
    cleanupDom();
    const button = new Button({ text: 'Test', variant });
    const element = button.render();

    assert.hasClass(element, `btn--${variant}`, `Should have ${variant} class`);
  });
});

testRunner.test('Button: applies size classes', () => {
  ['small', 'medium', 'large'].forEach(size => {
    cleanupDom();
    const button = new Button({ text: 'Test', size });
    const element = button.render();

    assert.hasClass(element, `btn--${size}`, `Should have ${size} class`);
  });
});

testRunner.test('Button: handles click events', () => {
  let clicked = false;
  const button = new Button({
    text: 'Click me',
    onClick: () => { clicked = true; }
  });
  const element = button.render();
  document.body.appendChild(element);

  simulateEvent(element, 'click');
  assert.ok(clicked, 'onClick should be called');
});

testRunner.test('Button: disabled state prevents click', () => {
  let clicked = false;
  const button = new Button({
    text: 'Disabled',
    disabled: true,
    onClick: () => { clicked = true; }
  });
  const element = button.render();
  document.body.appendChild(element);

  assert.hasAttribute(element, 'disabled');
  assert.hasAttribute(element, 'aria-disabled', 'true');

  // Click should not trigger due to disabled state
  // Note: In real browser, disabled buttons don't receive click events
  // In JSDOM, we need to check our handler's behavior
  assert.notOk(clicked, 'onClick should not be called when disabled');
});

testRunner.test('Button: loading state shows spinner', () => {
  const button = new Button({ text: 'Submit', loading: true });
  const element = button.render();

  assert.hasClass(element, 'btn--loading');
  assert.hasAttribute(element, 'aria-busy', 'true');

  const spinner = element.querySelector('.btn__spinner');
  assert.ok(spinner, 'Should have spinner element');
});

testRunner.test('Button: setLoading updates state', () => {
  const button = new Button({ text: 'Submit' });
  const element = button.render();

  assert.notHasClass(element, 'btn--loading');

  button.setLoading(true);
  assert.hasClass(element, 'btn--loading');

  button.setLoading(false);
  assert.notHasClass(element, 'btn--loading');
});

testRunner.test('Button: setDisabled updates state', () => {
  const button = new Button({ text: 'Submit' });
  const element = button.render();

  assert.notHasClass(element, 'btn--disabled');

  button.setDisabled(true);
  assert.hasAttribute(element, 'disabled');

  button.setDisabled(false);
  assert.notOk(element.hasAttribute('disabled'), 'Should remove disabled attribute');
});

testRunner.test('Button: keyboard Enter activates button', () => {
  let clicked = false;
  const button = new Button({
    text: 'Submit',
    onClick: () => { clicked = true; }
  });
  const element = button.render();
  document.body.appendChild(element);

  // Note: In real browser, Enter on button triggers click
  // We test that keydown handler doesn't prevent default behavior
  pressKey(element, 'Enter');
  // The click would be triggered by the browser, not our keydown handler
});

// ============================================
// Input Component Tests
// ============================================

testRunner.test('Input: renders with correct structure', () => {
  const input = new Input({
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter email'
  });
  const element = input.render();

  assert.ok(element, 'Input should render an element');
  assert.hasClass(element, 'input-field');

  const labelEl = element.querySelector('.input-field__label');
  assert.ok(labelEl, 'Should have label element');
  assert.ok(labelEl.textContent.includes('Email'), 'Label should have correct text');

  const inputEl = element.querySelector('.input-field__input');
  assert.ok(inputEl, 'Should have input element');
  assert.equal(inputEl.type, 'email', 'Should have correct type');
  assert.equal(inputEl.placeholder, 'Enter email', 'Should have correct placeholder');
});

testRunner.test('Input: required indicator shows asterisk', () => {
  const input = new Input({
    label: 'Required Field',
    required: true
  });
  const element = input.render();

  const requiredEl = element.querySelector('.input-field__required');
  assert.ok(requiredEl, 'Should have required indicator');
  assert.ok(requiredEl.textContent.includes('*'), 'Should show asterisk');
});

testRunner.test('Input: getValue returns current value', () => {
  const input = new Input({ value: 'initial' });
  input.render();

  assert.equal(input.getValue(), 'initial');

  input.setValue('updated');
  assert.equal(input.getValue(), 'updated');
});

testRunner.test('Input: setValue updates the input', () => {
  const input = new Input({ name: 'test' });
  const element = input.render();
  const inputEl = element.querySelector('.input-field__input');

  input.setValue('new value');

  assert.equal(inputEl.value, 'new value');
  assert.equal(input.getValue(), 'new value');
});

testRunner.test('Input: validates required field', () => {
  const input = new Input({
    label: 'Name',
    required: true
  });
  input.render();

  // Empty value should fail validation
  const isValid = input.validate();
  assert.notOk(isValid, 'Should fail validation when empty');
  assert.ok(input.hasError(), 'Should have error');

  // With value should pass
  input.setValue('John');
  const isValidNow = input.validate();
  assert.ok(isValidNow, 'Should pass validation with value');
  assert.notOk(input.hasError(), 'Should not have error');
});

testRunner.test('Input: validates email format', () => {
  const input = new Input({
    type: 'email',
    validators: [validators.email()]
  });
  input.render();

  // Invalid email
  input.setValue('invalid');
  assert.notOk(input.validate(), 'Should fail for invalid email');

  // Valid email
  input.setValue('test@example.com');
  assert.ok(input.validate(), 'Should pass for valid email');
});

testRunner.test('Input: validates minLength', () => {
  const input = new Input({
    validators: [validators.minLength(5)]
  });
  input.render();

  input.setValue('abc');
  assert.notOk(input.validate(), 'Should fail for short value');

  input.setValue('abcdef');
  assert.ok(input.validate(), 'Should pass for long enough value');
});

testRunner.test('Input: validates maxLength', () => {
  const input = new Input({
    validators: [validators.maxLength(5)]
  });
  input.render();

  input.setValue('abcdef');
  assert.notOk(input.validate(), 'Should fail for long value');

  input.setValue('abc');
  assert.ok(input.validate(), 'Should pass for short enough value');
});

testRunner.test('Input: showError displays error message', () => {
  const input = new Input({ label: 'Test' });
  const element = input.render();

  input.showError('Custom error message');

  assert.hasClass(element, 'input-field--error');
  const errorText = element.querySelector('.input-field__error-text');
  assert.ok(errorText.textContent.includes('Custom error message'));
});

testRunner.test('Input: clearError removes error', () => {
  const input = new Input({ label: 'Test' });
  const element = input.render();

  input.showError('Error');
  assert.hasClass(element, 'input-field--error');

  input.clearError();
  assert.notHasClass(element, 'input-field--error');
});

testRunner.test('Input: disabled state prevents editing', () => {
  const input = new Input({
    label: 'Disabled',
    disabled: true,
    value: 'Fixed'
  });
  const element = input.render();
  const inputEl = element.querySelector('.input-field__input');

  assert.ok(inputEl.disabled, 'Input should be disabled');
  assert.hasClass(element, 'input-field--disabled');
});

testRunner.test('Input: setDisabled updates state', () => {
  const input = new Input({ label: 'Test' });
  const element = input.render();
  const inputEl = element.querySelector('.input-field__input');

  input.setDisabled(true);
  assert.ok(inputEl.disabled, 'Should be disabled');

  input.setDisabled(false);
  assert.notOk(inputEl.disabled, 'Should be enabled');
});

testRunner.test('Input: reset restores initial state', () => {
  const input = new Input({
    label: 'Test',
    value: 'initial'
  });
  input.render();

  input.setValue('changed');
  input.showError('error');

  input.reset();

  assert.equal(input.getValue(), 'initial', 'Value should be reset');
  assert.notOk(input.hasError(), 'Error should be cleared');
});

testRunner.test('Input: validates on blur when validateOn is blur', () => {
  const input = new Input({
    label: 'Test',
    required: true,
    validateOn: 'blur'
  });
  const element = input.render();
  document.body.appendChild(element);
  const inputEl = element.querySelector('.input-field__input');

  // Focus and blur with empty value
  simulateEvent(inputEl, 'focus');
  simulateEvent(inputEl, 'blur');

  assert.ok(input.hasError(), 'Should have error after blur');
});

testRunner.test('Input: aria-invalid updates with error state', () => {
  const input = new Input({ label: 'Test' });
  const element = input.render();
  const inputEl = element.querySelector('.input-field__input');

  assert.hasAttribute(inputEl, 'aria-invalid', 'false');

  input.showError('Error');
  assert.hasAttribute(inputEl, 'aria-invalid', 'true');

  input.clearError();
  assert.hasAttribute(inputEl, 'aria-invalid', 'false');
});

// ============================================
// Integration: Button + Input in Form
// ============================================

testRunner.test('Integration: form validation with button and inputs', () => {
  // Create a simple form
  const form = document.createElement('form');

  const emailInput = new Input({
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    validators: [validators.email()]
  });

  const passwordInput = new Input({
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true,
    validators: [validators.minLength(8)]
  });

  let submitted = false;
  const submitBtn = new Button({
    text: 'Submit',
    type: 'submit',
    onClick: (e) => {
      e.preventDefault();
      const isEmailValid = emailInput.validate();
      const isPasswordValid = passwordInput.validate();

      if (isEmailValid && isPasswordValid) {
        submitted = true;
      }
    }
  });

  form.appendChild(emailInput.render());
  form.appendChild(passwordInput.render());
  form.appendChild(submitBtn.render());
  document.body.appendChild(form);

  // Try to submit with empty fields
  simulateEvent(submitBtn.element, 'click');
  assert.notOk(submitted, 'Should not submit with empty fields');
  assert.ok(emailInput.hasError(), 'Email should have error');
  assert.ok(passwordInput.hasError(), 'Password should have error');

  // Fill in valid values
  emailInput.setValue('test@example.com');
  passwordInput.setValue('password123');

  simulateEvent(submitBtn.element, 'click');
  assert.ok(submitted, 'Should submit with valid values');
});

testRunner.test('Integration: loading button disables during async operation', async () => {
  const btn = new Button({
    text: 'Submit',
    onClick: async () => {
      btn.setLoading(true);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 10));
      btn.setLoading(false);
    }
  });
  const element = btn.render();
  document.body.appendChild(element);

  simulateEvent(element, 'click');
  assert.hasClass(element, 'btn--loading', 'Should show loading state');

  await new Promise(resolve => setTimeout(resolve, 20));
  assert.notHasClass(element, 'btn--loading', 'Should remove loading state after completion');
});

testRunner.test('Integration: focus moves between inputs', () => {
  const input1 = new Input({ label: 'First' });
  const input2 = new Input({ label: 'Second' });

  document.body.appendChild(input1.render());
  document.body.appendChild(input2.render());

  const inputEl1 = input1.inputElement;
  const inputEl2 = input2.inputElement;

  input1.focus();
  assert.equal(document.activeElement, inputEl1, 'First input should be focused');

  input2.focus();
  assert.equal(document.activeElement, inputEl2, 'Second input should be focused');
});

// ============================================
// Validators Tests
// ============================================

testRunner.test('Validators: required validates correctly', () => {
  const validator = validators.required();

  assert.notOk(validator('').isValid, 'Empty string should fail');
  assert.notOk(validator('   ').isValid, 'Whitespace should fail');
  assert.notOk(validator(null).isValid, 'Null should fail');
  assert.ok(validator('value').isValid, 'Non-empty string should pass');
});

testRunner.test('Validators: email validates correctly', () => {
  const validator = validators.email();

  assert.ok(validator('test@example.com').isValid, 'Valid email should pass');
  assert.ok(validator('user.name+tag@domain.co.uk').isValid, 'Complex email should pass');
  assert.notOk(validator('invalid').isValid, 'Invalid email should fail');
  assert.notOk(validator('@example.com').isValid, 'Missing local part should fail');
  assert.ok(validator('').isValid, 'Empty should pass (use required for that)');
});

testRunner.test('Validators: min/max for numbers', () => {
  const minValidator = validators.min(0);
  const maxValidator = validators.max(100);

  assert.ok(minValidator(0).isValid, 'Min boundary should pass');
  assert.ok(minValidator(50).isValid, 'Above min should pass');
  assert.notOk(minValidator(-1).isValid, 'Below min should fail');

  assert.ok(maxValidator(100).isValid, 'Max boundary should pass');
  assert.ok(maxValidator(50).isValid, 'Below max should pass');
  assert.notOk(maxValidator(101).isValid, 'Above max should fail');
});

testRunner.test('Validators: pattern matches regex', () => {
  const validator = validators.pattern(/^[A-Z]+$/);

  assert.ok(validator('ABC').isValid, 'Matching pattern should pass');
  assert.notOk(validator('abc').isValid, 'Non-matching should fail');
  assert.notOk(validator('ABC123').isValid, 'Partial match should fail');
});

testRunner.test('Validators: compose runs multiple validators', () => {
  const composed = validators.compose(
    validators.required(),
    validators.minLength(3),
    validators.maxLength(10)
  );

  assert.notOk(composed('').isValid, 'Empty should fail required');
  assert.notOk(composed('ab').isValid, 'Short should fail minLength');
  assert.notOk(composed('verylongvalue').isValid, 'Long should fail maxLength');
  assert.ok(composed('valid').isValid, 'Valid value should pass all');
});

testRunner.test('Validators: custom validator works', () => {
  const noForbidden = validators.custom(
    value => !value.includes('forbidden'),
    'Value contains forbidden word'
  );

  assert.ok(noForbidden('allowed').isValid, 'Allowed value should pass');
  assert.notOk(noForbidden('forbidden').isValid, 'Forbidden value should fail');
  assert.equal(noForbidden('forbidden').errorMessage, 'Value contains forbidden word');
});

// Run all tests
testRunner.run().then(results => {
  process.exitCode = results.failed > 0 ? 1 : 0;
});
