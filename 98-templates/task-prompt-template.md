# Task Decomposition Guidance

## YOUR TASK
${TASK_NAME:+Implement the task specified in ${TASK_PATH}}${TASK_NAME:-Read the story at ${STORY_PATH}/story.md and generate technical tasks}

## Context
- Feature: ${FEATURE}
- Story: ${STORY_NAME}
- Story Path: ${STORY_PATH}${TASK_NAME:+
- Task: ${TASK_NAME}
- Task File: ${TASK_PATH}}

## File Structure

Save technical tasks in the tasks/ subdirectory under the story directory:

```
01-features/
└── feature-{number}-{name}/
    └── stories/
        └── story-{number}-{name}/
            ├── story.md                              # User story (already exists)
            └── tasks/                                # Create this directory
                ├── task-001-{kebab-case-name}.md     # Individual task files
                ├── task-002-{kebab-case-name}.md
                └── task-003-{kebab-case-name}.md
```

**Naming conventions:**
- Task files: `task-{number}-{kebab-case-name}.md` (e.g., `task-001-create-api-endpoint.md`)
- Numbers are zero-padded (001, 002, etc.)
- Use kebab-case (lowercase with hyphens)
- File names should be brief but descriptive of the technical work

## Task Files (task-{number}-{name}.md)

For each technical task:
1. Read ${CODE}/98-templates/task-template.md
2. Follow the template structure exactly
3. Replace all {placeholder} values with actual content
4. Follow the inline guidance in the template comments
5. Create the file in the tasks/ directory

## Workflow

1. Read the task template: ${CODE}/98-templates/task-template.md
2. Read the story.md file from the provided story path
3. Analyze the user story and acceptance criteria
4. Design the technical architecture and approach
5. Break down into specific, actionable technical tasks
6. Create the `tasks/` directory under the story directory
7. Write individual task files following the template (task-001-{name}.md, task-002-{name}.md, etc.)
8. Create tasks/README.md with implementation overview
9. Provide a summary with links to all created files

## Guidelines

- **Be specific and actionable** - Engineers should know exactly what to build
- **Include technical details** - Code changes, files, APIs, schemas
- **Show dependencies clearly** - What must be done first
- **Consider the full picture** - Testing, security, performance, monitoring
- **Right-size tasks** - Not too big (>2 days) or too small (<2 hours)
- **Link related tasks** - Help engineers navigate the implementation plan
- **Think about rollback** - What if we need to undo this?

## Execution Instructions for Task Generation

**STEP 1:** Read the story file at ${STORY_PATH}/story.md

**STEP 2:** Read the task template at ${CODE}/98-templates/task-template.md

**STEP 3:** Analyze the user story and break it down into technical tasks

**STEP 4:** For each task, create a file at ${STORY_PATH}/tasks/task-{number}-{kebab-case-name}.md

**STEP 5:** Also create ${STORY_PATH}/tasks/README.md with the implementation plan

For each task file, provide:
1. Full file path: ${STORY_PATH}/tasks/task-{number}-{kebab-case-name}.md
2. Complete markdown content following the task-template.md format

IMPORTANT:
- DO NOT ask for clarification - proceed immediately with task generation
- Generate at least 1 task, but create as many as needed to fully implement the story
- Break down the story into independently implementable technical tasks
- Use the task-template.md format exactly
- Format your response with clear markdown code blocks showing the file path and content
- Use task numbering: task-001, task-002, etc.

## Execution Instructions for Task Implementation

**STEP 1:** Read the task file at ${TASK_PATH}

**STEP 2:** Understand all requirements, dependencies, and technical details

**STEP 3:** Follow the implementation steps and code changes specified in the task

**STEP 4:** Write tests as specified in the Testing Requirements section

**STEP 5:** Update the task status in ${TASK_PATH} from 'Not Started' to 'Completed'

IMPORTANT:
- DO NOT ask for clarification - proceed immediately with implementation
- Work in the repository at ${CODE}
- Follow all implementation steps in the task file
- Ensure code quality and handle edge cases as described in the task
- If you encounter errors or cannot complete, update status to 'Failed' and document why in the Notes section of the task file
