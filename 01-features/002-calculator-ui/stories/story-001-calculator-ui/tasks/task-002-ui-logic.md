# Task: JavaScript Calculator Logic & Button Wiring

**Task ID:** task-002
**Story:** [story-001-calculator-ui](../story.md)
**Type:** Frontend
**Complexity:** S
**Status:** Done

## Description

Add an embedded `<script>` block to `index.html` that implements all calculator state management and wires every button to the correct handler. Arithmetic is implemented inline in the browser (no Node.js `require`).

## Dependencies

- [task-001-html-structure.md](task-001-html-structure.md)

## Implementation Steps

1. Declare state variables: `currentInput`, `operator`, `previousValue`, `shouldResetDisplay`
2. Implement `updateDisplay(expression, result)` to update the two display lines
3. Implement `handleDigit(digit)` — append digit to `currentInput`, update expression line
4. Implement `handleOperator(op)` — if a pending operation exists, evaluate it first (chaining); store operator and `previousValue`
5. Implement `handleEquals()` — compute result, display it, reset state for next operation
6. Implement `calculate(a, op, b)` — switch on op for +, -, ×, ÷; throw on divide-by-zero
7. Implement `handleClear()` — reset all state and display
8. Attach `onclick` handlers to every button (or use event delegation on `.buttons`)

## Files to Create/Modify

- `index.html` — add `<script>` block

## Tests

- `2 + 3 =` shows `5`
- `9 - 4 =` shows `5`
- `3 × 4 =` shows `12`
- `10 ÷ 2 =` shows `5`
- `5 ÷ 0 =` shows an error message, not a crash
- C button resets display to `0`
- Chained operations: `2 + 3 + 4 =` shows `9`
