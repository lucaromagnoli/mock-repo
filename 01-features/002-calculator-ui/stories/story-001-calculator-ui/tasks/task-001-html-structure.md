# Task: HTML Structure & CSS Layout

**Task ID:** task-001
**Story:** [story-001-calculator-ui](../story.md)
**Type:** Frontend
**Complexity:** S
**Status:** Done

## Description

Create `index.html` with the semantic HTML skeleton for the calculator and a minimal embedded CSS layout. The layout must include a display element and a grid of buttons (0–9, +, -, ×, ÷, =, C).

## Dependencies

None

## Implementation Steps

1. Create `index.html` at the project root
2. Add a `<div class="calculator">` wrapper
3. Add a `<div class="display">` with an expression line and a result line
4. Add a `<div class="buttons">` grid containing:
   - Digits 0–9
   - Operators: +, -, ×, ÷
   - Equals: =
   - Clear: C
5. Write embedded `<style>` with a CSS grid layout for the button pad

## Files to Create/Modify

- `index.html` — new file, full calculator UI

## Tests

- Open `index.html` in a browser; all buttons are visible and the display is readable
- No horizontal overflow at default browser zoom
