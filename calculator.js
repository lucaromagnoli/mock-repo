// Simple calculator with a bug

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  // BUG: No check for division by zero!
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
