# Claude Code Instructions

**Note:** This file guides interactive Claude Code sessions. Automated workflow agents follow their own specialized prompts in `.factory/chart/`.

## Key Directories

- `.factory/chart/` - Argo Workflows and K8s resources
- `.factory/marketplace/` - Claude agents and skills
- `00-context/` - Project context (README, high-level goals, constraints)
- `01-features/` - Feature development (features → stories → tasks)
- `98-templates/` - Templates for features, stories, tasks
- `99-knowledge/` - Project patterns and learnings

## Feature Structure

Features use a 3-level hierarchy:
1. `01-features/{n}-{name}/feature.md`
2. `01-features/{n}-{name}/stories/story-{n}-{name}/story.md`
3. `01-features/{n}-{name}/stories/story-{n}-{name}/tasks/task-{n}-{name}.md`

See `docs/feature-structure.md` for full details.

## Guidelines for Interactive Development

**Before Starting:**
- Check `00-context/README.md` for project overview
- Review `99-knowledge/conventions.md` for established patterns
- Read relevant feature/story/task files for context

**When Creating Features/Stories/Tasks:**
- Follow templates in `98-templates/` exactly
- Use kebab-case: `001-name`, `story-001-name`, `task-001-name`
- Number sequentially: 001, 002, 003

**When Writing Code:**
- Keep changes minimal
- Follow existing patterns
- Write tests for new functionality
- Place code in appropriate project directories following the established structure

**When You Learn Something New:**
- Document patterns or gotchas in `99-knowledge/conventions.md`
- Update helps future work avoid repeated mistakes
