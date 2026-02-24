/**
 * Calculator UI Logic
 *
 * Handles all user interactions for the calculator interface:
 * - Digit and decimal input
 * - Arithmetic operations: +, −, ×, ÷
 * - Clear, sign toggle, and percentage helpers
 * - Equals / evaluation
 */

(function () {
  'use strict';

  // ─── State ────────────────────────────────────────────────────────────────

  let currentValue  = '0';   // Value shown in the main display
  let pendingValue  = null;  // First operand waiting for second
  let pendingOp     = null;  // Operator waiting to be applied (+, −, ×, ÷)
  let justEvaluated = false; // True immediately after pressing =

  // ─── DOM refs ─────────────────────────────────────────────────────────────

  const displayCurrent    = document.getElementById('current');
  const displayExpression = document.getElementById('expression');

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /** Render current state to the display elements. */
  function updateDisplay() {
    displayCurrent.textContent = currentValue;

    if (pendingOp && pendingValue !== null) {
      displayExpression.textContent = `${pendingValue} ${pendingOp}`;
    } else {
      displayExpression.textContent = '';
    }
  }

  /** Clamp / format a number so the display never overflows. */
  function formatNumber(num) {
    if (!isFinite(num)) return 'Error';

    // Use toPrecision to cap significant digits then strip trailing zeros.
    const str = parseFloat(num.toPrecision(10)).toString();
    return str;
  }

  /** Apply the pending operation to pendingValue and secondValue. */
  function applyOperation(a, op, b) {
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷':
        if (b === 0) return 'Error';
        return a / b;
      default:
        return b;
    }
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  function handleDigit(digit) {
    if (justEvaluated) {
      // Start fresh after an evaluation
      currentValue  = digit;
      justEvaluated = false;
    } else if (currentValue === '0') {
      currentValue = digit;
    } else {
      if (currentValue.length >= 12) return; // limit display length
      currentValue += digit;
    }
    updateDisplay();
  }

  function handleDecimal() {
    if (justEvaluated) {
      currentValue  = '0.';
      justEvaluated = false;
      updateDisplay();
      return;
    }
    if (currentValue.includes('.')) return; // only one decimal point
    currentValue += '.';
    updateDisplay();
  }

  function handleOperator(op) {
    justEvaluated = false;

    // If we already have a pending operation and a new number was entered,
    // chain the calculation before storing the new operator.
    if (pendingOp !== null && pendingValue !== null) {
      const result = applyOperation(parseFloat(pendingValue), pendingOp, parseFloat(currentValue));
      currentValue = formatNumber(result);
    }

    pendingValue = currentValue;
    pendingOp    = op;
    currentValue = '0'; // ready for the second operand
    updateDisplay();
  }

  function handleEquals() {
    if (pendingOp === null || pendingValue === null) return;

    const a      = parseFloat(pendingValue);
    const b      = parseFloat(currentValue);
    const result = applyOperation(a, pendingOp, b);

    displayExpression.textContent = `${pendingValue} ${pendingOp} ${currentValue} =`;
    currentValue  = formatNumber(result);
    pendingValue  = null;
    pendingOp     = null;
    justEvaluated = true;
    displayCurrent.textContent = currentValue;
  }

  function handleClear() {
    currentValue  = '0';
    pendingValue  = null;
    pendingOp     = null;
    justEvaluated = false;
    updateDisplay();
  }

  function handleSign() {
    if (currentValue === '0' || currentValue === 'Error') return;
    currentValue = currentValue.startsWith('-')
      ? currentValue.slice(1)
      : '-' + currentValue;
    updateDisplay();
  }

  function handlePercent() {
    const num = parseFloat(currentValue);
    if (isNaN(num)) return;
    currentValue = formatNumber(num / 100);
    updateDisplay();
  }

  // ─── Event wiring ─────────────────────────────────────────────────────────

  // Digit buttons
  document.querySelectorAll('[data-digit]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      handleDigit(btn.dataset.digit);
    });
  });

  // Operator buttons
  document.querySelectorAll('[data-op]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      handleOperator(btn.dataset.op);
    });
  });

  document.getElementById('btn-equals') .addEventListener('click', handleEquals);
  document.getElementById('btn-clear')  .addEventListener('click', handleClear);
  document.getElementById('btn-sign')   .addEventListener('click', handleSign);
  document.getElementById('btn-percent').addEventListener('click', handlePercent);
  document.getElementById('btn-dot')    .addEventListener('click', handleDecimal);

  // ─── Keyboard support ─────────────────────────────────────────────────────

  const keyMap = {
    '0': () => handleDigit('0'),
    '1': () => handleDigit('1'),
    '2': () => handleDigit('2'),
    '3': () => handleDigit('3'),
    '4': () => handleDigit('4'),
    '5': () => handleDigit('5'),
    '6': () => handleDigit('6'),
    '7': () => handleDigit('7'),
    '8': () => handleDigit('8'),
    '9': () => handleDigit('9'),
    '.': handleDecimal,
    '+': () => handleOperator('+'),
    '-': () => handleOperator('−'),
    '*': () => handleOperator('×'),
    '/': () => handleOperator('÷'),
    'Enter': handleEquals,
    '=': handleEquals,
    'Backspace': handleClear,
    'Escape': handleClear,
    '%': handlePercent,
  };

  document.addEventListener('keydown', function (e) {
    if (keyMap[e.key]) {
      e.preventDefault();
      keyMap[e.key]();
    }
  });

  // ─── Init ─────────────────────────────────────────────────────────────────

  updateDisplay();
}());
