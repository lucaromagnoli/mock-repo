# Templates

This directory contains templates for creating features, stories, and tasks. When generating these artifacts, follow the template structure exactly.

## Available Templates

- `story-template.md` - User story format (WHAT and WHY from user perspective)
- `task-template.md` - Technical task format (HOW from engineering perspective)
- `story-prompt-template.md` - Prompt for generating stories from features
- `task-prompt-template.md` - Prompt for generating tasks from stories
- `story-impl-prompt-template.md` - Prompt for implementing story code

## Usage

**For Agents:** When creating features, stories, or tasks:
1. Read the appropriate template file
2. Follow the structure exactly (don't skip sections)
3. Pay attention to instructions in HTML comments (`<!-- -->`)
4. Maintain the hierarchy: Feature → Story → Task

**Template Structure:**
- Templates include placeholders in `{braces}` - replace these with actual values
- HTML comments contain important instructions - read and follow them
- Each template enforces separation of concerns (PM vs Engineering perspective)
