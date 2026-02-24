# Implementation Plan: Calculator UI

## Architecture Overview

A single self-contained `index.html` file with embedded CSS and JavaScript. No build tool or framework is needed. The JavaScript reimplements the four calculator operations directly in the browser (since `calculator.js` uses `module.exports`, which is not natively available in browsers without a bundler).

## Task Summary

| # | Task | Type | Complexity | Depends On |
|---|------|------|------------|------------|
| 001 | HTML structure & CSS layout | Frontend | S | — |
| 002 | JavaScript calculator logic & button wiring | Frontend | S | 001 |

## Implementation Sequence

**Phase 1 — Markup & Styles (task-001)**
- Create `index.html` with semantic HTML structure
- Add a display area and a grid of buttons
- Write minimal CSS to make it readable and usable

**Phase 2 — Logic & Interactivity (task-002)**
- Implement state management (currentInput, operator, previousValue)
- Wire each button to the appropriate handler
- Handle division-by-zero gracefully

## Dependency Graph

```
task-001-html-structure
        ↓
task-002-ui-logic
```

## Technical Notes

- All code lives in `index.html` (style and script tags) for zero-dependency simplicity
- No external libraries or CDN links required
