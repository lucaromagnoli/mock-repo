# Story: Interactive Calculator UI

**Story ID:** story-001
**Feature:** [002-calculator-ui](../../feature.md)
**Priority:** Must Have
**Status:** In Progress
**Created:** 2026-02-24

## User Story

As a user, I want a simple calculator interface in my browser, so that I can perform arithmetic calculations by clicking buttons without typing commands or code.

## Acceptance Criteria

1. A display shows the current input expression and the computed result
2. Number buttons (0–9) append digits to the current input
3. Operation buttons (+, -, ×, ÷) let the user select an arithmetic operation
4. An equals button (=) computes and displays the result
5. A clear button (C) resets the display and any pending input
6. Division by zero shows a friendly error message instead of crashing

## Definition of Done

- The calculator UI is accessible by opening `index.html` in a browser
- All four arithmetic operations produce correct results
- The clear button fully resets state
- All acceptance criteria are met

## User Value

Allows non-technical users to use the calculator through a familiar point-and-click interface rather than running code in a terminal.

## Notes

- No build step required — pure HTML/CSS/JS in a single file
- Friendly error handling for division by zero
