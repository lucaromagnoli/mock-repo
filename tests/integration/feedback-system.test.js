/**
 * Integration Tests for Feedback System
 * ======================================
 * Tests for Toast notifications, Loading indicators, and Interactive states.
 */

// Setup test environment
const testSetup = require('../setup.js');
testSetup.setupJsdom();

// Load components
require('../../src/components/Toast/ToastManager.js');
require('../../src/components/Loading/LoadingManager.js');

const { assert, testRunner, cleanupDom, simulateEvent, wait } = testSetup;

// ============================================
// Toast Manager Tests
// ============================================

testRunner.test('Toast: creates success notification', () => {
  cleanupDom();
  ToastManager.destroy();

  const id = ToastManager.success('Operation completed!');

  assert.ok(id, 'Should return toast ID');

  const container = document.querySelector('.toast-container');
  assert.ok(container, 'Should create toast container');

  const toast = document.querySelector('.toast--success');
  assert.ok(toast, 'Should create success toast');
  assert.ok(toast.textContent.includes('Operation completed!'), 'Should contain message');

  ToastManager.destroy();
});

testRunner.test('Toast: creates error notification', () => {
  cleanupDom();
  ToastManager.destroy();

  const id = ToastManager.error('Something went wrong');

  const toast = document.querySelector('.toast--error');
  assert.ok(toast, 'Should create error toast');
  assert.hasAttribute(toast, 'role', 'alert', 'Error toast should have alert role');

  ToastManager.destroy();
});

testRunner.test('Toast: creates warning notification', () => {
  cleanupDom();
  ToastManager.destroy();

  const id = ToastManager.warning('Warning message');

  const toast = document.querySelector('.toast--warning');
  assert.ok(toast, 'Should create warning toast');

  ToastManager.destroy();
});

testRunner.test('Toast: creates info notification', () => {
  cleanupDom();
  ToastManager.destroy();

  const id = ToastManager.info('Info message');

  const toast = document.querySelector('.toast--info');
  assert.ok(toast, 'Should create info toast');
  assert.hasAttribute(toast, 'role', 'status', 'Info toast should have status role');

  ToastManager.destroy();
});

testRunner.test('Toast: includes title when provided', () => {
  cleanupDom();
  ToastManager.destroy();

  ToastManager.error('Error details', { title: 'Error Title' });

  const title = document.querySelector('.toast__title');
  assert.ok(title, 'Should have title element');
  assert.ok(title.textContent.includes('Error Title'), 'Should contain title text');

  ToastManager.destroy();
});

testRunner.test('Toast: dismiss button removes notification', async () => {
  cleanupDom();
  ToastManager.destroy();

  ToastManager.info('Dismissible toast');

  const dismissBtn = document.querySelector('.toast__dismiss');
  assert.ok(dismissBtn, 'Should have dismiss button');

  simulateEvent(dismissBtn, 'click');

  await wait(400); // Wait for animation

  const toast = document.querySelector('.toast--info');
  assert.notOk(toast, 'Toast should be removed after dismiss');

  ToastManager.destroy();
});

testRunner.test('Toast: dismissAll removes all notifications', async () => {
  cleanupDom();
  ToastManager.destroy();

  ToastManager.success('Toast 1');
  ToastManager.info('Toast 2');
  ToastManager.warning('Toast 3');

  assert.equal(ToastManager.getCount(), 3, 'Should have 3 toasts');

  ToastManager.dismissAll();

  await wait(400);

  const toasts = document.querySelectorAll('.toast');
  assert.equal(toasts.length, 0, 'All toasts should be removed');

  ToastManager.destroy();
});

testRunner.test('Toast: respects maxVisible limit', () => {
  cleanupDom();
  ToastManager.destroy();
  ToastManager.configure({ maxVisible: 3 });

  // Create more than max
  for (let i = 0; i < 5; i++) {
    // Force unique messages to avoid duplicate detection
    ToastManager.info(`Message ${i} - ${Date.now()}-${Math.random()}`);
  }

  const visibleToasts = document.querySelectorAll('.toast');
  assert.equal(visibleToasts.length, 3, 'Should only show maxVisible toasts');
  assert.equal(ToastManager.getCount(), 5, 'Should track all toasts including queued');

  ToastManager.destroy();
});

testRunner.test('Toast: prevents duplicate messages within threshold', () => {
  cleanupDom();
  ToastManager.destroy();

  const id1 = ToastManager.success('Same message');
  const id2 = ToastManager.success('Same message');

  assert.ok(id1, 'First toast should be created');
  assert.notOk(id2, 'Duplicate toast should not be created');

  ToastManager.destroy();
});

testRunner.test('Toast: escapes HTML in messages', () => {
  cleanupDom();
  ToastManager.destroy();

  ToastManager.info('<script>alert("xss")</script>');

  const message = document.querySelector('.toast__message');
  assert.ok(message, 'Should have message element');
  assert.notOk(message.querySelector('script'), 'Should not contain script element');
  assert.ok(message.textContent.includes('<script>'), 'Should show escaped HTML');

  ToastManager.destroy();
});

testRunner.test('Toast: onDismiss callback is called', async () => {
  cleanupDom();
  ToastManager.destroy();

  let callbackCalled = false;
  const id = ToastManager.show({
    type: 'info',
    message: 'Test callback',
    onDismiss: () => { callbackCalled = true; }
  });

  ToastManager.dismiss(id);
  await wait(400);

  assert.ok(callbackCalled, 'onDismiss callback should be called');

  ToastManager.destroy();
});

testRunner.test('Toast: configure changes settings', () => {
  cleanupDom();
  ToastManager.destroy();

  ToastManager.configure({ position: 'top-left' });

  ToastManager.info('Test position');

  const container = document.querySelector('.toast-container--top-left');
  assert.ok(container, 'Should apply new position class');

  ToastManager.destroy();
});

// ============================================
// Loading Manager Tests
// ============================================

testRunner.test('LoadingManager: tracks loading state', () => {
  const loader = new LoadingManager({ delay: 0 });

  assert.notOk(loader.isLoading(), 'Should not be loading initially');

  loader.start();
  assert.ok(loader.isLoading(), 'Should be loading after start');

  loader.stop();
  assert.notOk(loader.isLoading(), 'Should not be loading after stop');
});

testRunner.test('LoadingManager: delays visibility', async () => {
  const loader = new LoadingManager({ delay: 50, minDuration: 0 });
  let showCount = 0;

  loader._onShow = () => { showCount++; };

  loader.start();
  assert.notOk(loader.isVisible(), 'Should not be visible immediately');

  await wait(60);
  assert.ok(loader.isVisible(), 'Should be visible after delay');
  assert.equal(showCount, 1, 'onShow should be called once');

  loader.stop();
});

testRunner.test('LoadingManager: prevents flicker for fast operations', async () => {
  const loader = new LoadingManager({ delay: 100, minDuration: 0 });
  let showCount = 0;

  loader._onShow = () => { showCount++; };

  loader.start();
  await wait(50);
  loader.stop();

  await wait(100);
  assert.equal(showCount, 0, 'onShow should not be called for fast operations');
});

testRunner.test('LoadingManager: ensures minimum display duration', async () => {
  const loader = new LoadingManager({ delay: 0, minDuration: 100 });
  let hideCount = 0;

  loader._onHide = () => { hideCount++; };

  loader.start();
  await wait(10); // Wait for show

  loader.stop();
  assert.ok(loader.isVisible(), 'Should still be visible');
  assert.equal(hideCount, 0, 'onHide should not be called yet');

  await wait(150);
  assert.equal(hideCount, 1, 'onHide should be called after min duration');
});

testRunner.test('LoadingManager: wrap handles promises', async () => {
  const loader = new LoadingManager({ delay: 0, minDuration: 0 });
  let showCalled = false;
  let hideCalled = false;

  loader._onShow = () => { showCalled = true; };
  loader._onHide = () => { hideCalled = true; };

  const result = await loader.wrap(
    new Promise(resolve => setTimeout(() => resolve('done'), 50))
  );

  assert.equal(result, 'done', 'Should return promise result');
  assert.ok(showCalled, 'onShow should be called');
  assert.ok(hideCalled, 'onHide should be called');
});

testRunner.test('LoadingManager: wrap handles errors', async () => {
  const loader = new LoadingManager({ delay: 0, minDuration: 0 });
  let hideCalled = false;

  loader._onHide = () => { hideCalled = true; };

  let errorThrown = false;
  try {
    await loader.wrap(Promise.reject(new Error('test error')));
  } catch (e) {
    errorThrown = true;
  }

  assert.ok(errorThrown, 'Should propagate error');
  assert.ok(hideCalled, 'onHide should still be called on error');
});

testRunner.test('LoadingManager: reset clears state', () => {
  const loader = new LoadingManager({ delay: 100 });

  loader.start();
  assert.ok(loader.isLoading(), 'Should be loading');

  loader.reset();
  assert.notOk(loader.isLoading(), 'Should not be loading after reset');
});

// ============================================
// Spinner Tests
// ============================================

testRunner.test('Spinner: creates circular spinner', () => {
  const spinner = Spinner.create({ variant: 'circular', size: 'medium' });

  assert.ok(spinner, 'Should create spinner');
  assert.hasClass(spinner, 'spinner--circular');
  assert.hasClass(spinner, 'spinner--medium');
  assert.hasAttribute(spinner, 'role', 'status');
});

testRunner.test('Spinner: creates dots spinner', () => {
  const spinner = Spinner.create({ variant: 'dots' });

  assert.hasClass(spinner, 'spinner--dots');

  const dots = spinner.querySelectorAll('.spinner__dot');
  assert.equal(dots.length, 3, 'Should have 3 dots');
});

testRunner.test('Spinner: includes accessible label', () => {
  const spinner = Spinner.create({ label: 'Loading data' });

  assert.hasAttribute(spinner, 'aria-label', 'Loading data');

  const srText = spinner.querySelector('.sr-only');
  assert.ok(srText, 'Should have screen reader text');
  assert.ok(srText.textContent.includes('Loading data'));
});

testRunner.test('Spinner: size variants work correctly', () => {
  const small = Spinner.create({ size: 'small' });
  const large = Spinner.create({ size: 'large' });

  assert.hasClass(small, 'spinner--small');
  assert.hasClass(large, 'spinner--large');
});

// ============================================
// Skeleton Tests
// ============================================

testRunner.test('Skeleton: creates text skeleton', () => {
  const skeleton = Skeleton.create({ type: 'text', lines: 3 });

  const lines = skeleton.querySelectorAll('.skeleton--text');
  assert.equal(lines.length, 3, 'Should create 3 text lines');
  assert.hasAttribute(skeleton, 'aria-hidden', 'true', 'Should be hidden from screen readers');
});

testRunner.test('Skeleton: creates circle skeleton', () => {
  const skeleton = Skeleton.create({ type: 'circle', width: '50px', height: '50px' });

  const circle = skeleton.querySelector('.skeleton--circle');
  assert.ok(circle, 'Should create circle skeleton');
  assert.equal(circle.style.width, '50px');
  assert.equal(circle.style.height, '50px');
});

testRunner.test('Skeleton: creates card skeleton', () => {
  const skeleton = Skeleton.create({ type: 'card' });

  const card = skeleton.querySelector('.skeleton-card');
  assert.ok(card, 'Should create card skeleton');

  const image = card.querySelector('.skeleton--image');
  assert.ok(image, 'Should have image placeholder');

  const title = card.querySelector('.skeleton--title');
  assert.ok(title, 'Should have title placeholder');
});

// ============================================
// Loading Overlay Tests
// ============================================

testRunner.test('LoadingOverlay: shows and hides', async () => {
  cleanupDom();
  LoadingOverlay.hide();

  LoadingOverlay.show('Loading...', { immediate: true });

  const overlay = document.querySelector('.loading-overlay');
  assert.ok(overlay, 'Should create overlay');

  const message = overlay.querySelector('.loading-overlay__message');
  assert.ok(message, 'Should have message');
  assert.ok(message.textContent.includes('Loading...'));

  assert.ok(LoadingOverlay.isShowing(), 'Should report as showing');

  LoadingOverlay.hide();
  await wait(400);

  assert.notOk(LoadingOverlay.isShowing(), 'Should report as not showing');

  const overlayAfter = document.querySelector('.loading-overlay');
  assert.notOk(overlayAfter, 'Overlay should be removed');
});

testRunner.test('LoadingOverlay: updates message when already showing', () => {
  cleanupDom();

  LoadingOverlay.show('First message', { immediate: true });
  LoadingOverlay.show('Second message');

  const messages = document.querySelectorAll('.loading-overlay__message');
  assert.equal(messages.length, 1, 'Should only have one overlay');
  assert.ok(messages[0].textContent.includes('Second message'));

  LoadingOverlay.hide();
});

testRunner.test('LoadingOverlay: has proper accessibility attributes', () => {
  cleanupDom();

  LoadingOverlay.show('Loading content', { immediate: true });

  const overlay = document.querySelector('.loading-overlay');
  assert.hasAttribute(overlay, 'role', 'dialog');
  assert.hasAttribute(overlay, 'aria-modal', 'true');
  assert.hasAttribute(overlay, 'aria-label', 'Loading content');

  LoadingOverlay.hide();
});

// ============================================
// setButtonLoading Utility Tests
// ============================================

testRunner.test('setButtonLoading: adds and removes loading class', () => {
  const button = document.createElement('button');
  button.textContent = 'Submit';
  document.body.appendChild(button);

  setButtonLoading(button, true);

  assert.hasClass(button, 'loading');
  assert.hasAttribute(button, 'aria-busy', 'true');
  assert.ok(button.disabled, 'Should be disabled');

  setButtonLoading(button, false);

  assert.notHasClass(button, 'loading');
  assert.notOk(button.hasAttribute('aria-busy'), 'Should remove aria-busy');
  assert.notOk(button.disabled, 'Should be enabled');
});

// ============================================
// Integration: Toast + Loading Flow
// ============================================

testRunner.test('Integration: form submission with loading and toast', async () => {
  cleanupDom();
  ToastManager.destroy();

  // Simulate form submission
  const button = document.createElement('button');
  button.textContent = 'Submit';
  document.body.appendChild(button);

  // Start loading
  setButtonLoading(button, true);
  assert.hasClass(button, 'loading', 'Button should show loading');

  // Simulate async operation
  await wait(50);

  // Complete with success
  setButtonLoading(button, false);
  ToastManager.success('Form submitted successfully!');

  const toast = document.querySelector('.toast--success');
  assert.ok(toast, 'Success toast should appear');
  assert.notHasClass(button, 'loading', 'Button should not be loading');

  ToastManager.destroy();
});

testRunner.test('Integration: error handling with toast', async () => {
  cleanupDom();
  ToastManager.destroy();

  const loader = new LoadingManager({ delay: 0, minDuration: 0 });

  let error = null;
  try {
    await loader.wrap(Promise.reject(new Error('Network error')));
  } catch (e) {
    error = e;
    ToastManager.error('Failed to save data', { title: 'Network Error' });
  }

  assert.ok(error, 'Error should be caught');

  const toast = document.querySelector('.toast--error');
  assert.ok(toast, 'Error toast should appear');

  const title = toast.querySelector('.toast__title');
  assert.ok(title.textContent.includes('Network Error'));

  ToastManager.destroy();
});

// ============================================
// Accessibility Tests
// ============================================

testRunner.test('Accessibility: toast has proper ARIA roles', () => {
  cleanupDom();
  ToastManager.destroy();

  ToastManager.success('Success');
  ToastManager.error('Error');

  const successToast = document.querySelector('.toast--success');
  const errorToast = document.querySelector('.toast--error');

  assert.hasAttribute(successToast, 'role', 'status', 'Success should have status role');
  assert.hasAttribute(errorToast, 'role', 'alert', 'Error should have alert role');

  assert.hasAttribute(successToast, 'aria-live', 'polite');
  assert.hasAttribute(errorToast, 'aria-live', 'assertive');

  ToastManager.destroy();
});

testRunner.test('Accessibility: container has region role', () => {
  cleanupDom();
  ToastManager.destroy();

  ToastManager.info('Test');

  const container = document.querySelector('.toast-container');
  assert.hasAttribute(container, 'role', 'region');
  assert.hasAttribute(container, 'aria-label', 'Notifications');

  ToastManager.destroy();
});

testRunner.test('Accessibility: dismiss button has accessible name', () => {
  cleanupDom();
  ToastManager.destroy();

  ToastManager.info('Test');

  const dismissBtn = document.querySelector('.toast__dismiss');
  assert.hasAttribute(dismissBtn, 'aria-label', 'Dismiss notification');

  ToastManager.destroy();
});

testRunner.test('Accessibility: spinner has status role and label', () => {
  const spinner = Spinner.create({ label: 'Loading items' });

  assert.hasAttribute(spinner, 'role', 'status');
  assert.hasAttribute(spinner, 'aria-label', 'Loading items');
});

// Run all tests
testRunner.run().then(results => {
  process.exitCode = results.failed > 0 ? 1 : 0;
});
