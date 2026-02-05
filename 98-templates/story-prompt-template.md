# Story Generation Guidance

## YOUR TASK
Read the feature file(s) in ${FEATURE_PATH}/feature.md and generate user stories immediately.

## Context
- Feature ID: ${FEATURE_ID}
- Feature Directory: ${FEATURE_DIR}
- Feature Path: ${FEATURE_PATH}

## File Structure

Save files in this hierarchical structure under ${CODE}/:

```
01-features/
└── feature-{number}-{kebab-case-name}/
    ├── feature.md                          # Feature overview
    └── stories/
        ├── story-001-{kebab-case-name}/
        │   └── story.md                    # User story details
        ├── story-002-{kebab-case-name}/
        │   └── story.md
        └── story-003-{kebab-case-name}/
            └── story.md
```

**Naming conventions:**
- Feature directories: `feature-{number}-{kebab-case-name}` (e.g., `feature-001-user-authentication`)
- Story directories: `story-{number}-{kebab-case-name}` (e.g., `story-001-user-registration`)
- Numbers are zero-padded (001, 002, etc.)
- Use kebab-case (lowercase with hyphens)

## Context
1. Look at the files in 00-context for additional context

## Story Files (story.md)

For each story:
1. Read ${CODE}/98-templates/story-template.md
2. Follow the template structure exactly
3. Replace all {placeholder} values with actual content
4. Follow the inline guidance in the template comments
5. Create the file at: stories/story-{number}-{name}/story.md

## Guidelines

- **Focus on WHAT and WHY**, not HOW to build it
- Keep stories independent and vertically sliced when possible
- Acceptance criteria should be testable from a user perspective
- Each story should deliver incremental value
- Avoid technical implementation details (those come from the technical decomposer)
- Think about different user types and their needs
- Consider edge cases from a user experience perspective

Create multiple stories if the feature is complex, ensuring each delivers standalone value.

## Workflow

1. Read the story template: ${CODE}/98-templates/story-template.md
2. Determine the next feature number by checking existing features in 01-features/
3. Create feature directory: `01-features/feature-{number}-{name}/`
4. Write feature.md with overview and story list
5. Create stories/ subdirectory
6. For each story, create `story-{number}-{name}/` directory and write story.md following the template
7. Provide a summary of what was created

## Execution Instructions

**STEP 1:** Read the story template at ${CODE}/98-templates/story-template.md

**STEP 2:** Read the feature file(s) in ${FEATURE_PATH}/

**STEP 3:** Analyze the feature and break it down into user stories

**NOTE:** If feature.md includes a "PR Review Feedback" section, incorporate that feedback into your story generation:
- For story-level/requirements feedback: Update acceptance criteria to address the feedback
- Ensure stories align with any clarified requirements or corrected understanding
- Code-level fixes will be handled separately during implementation

**STEP 4:** For each story, create a file at ${FEATURE_PATH}/stories/story-{number}-{kebab-case-name}/story.md

For each user story, provide:
1. Full file path: ${FEATURE_PATH}/stories/story-{number}-{kebab-case-name}/story.md
2. Complete markdown content following the story-template.md format

IMPORTANT:
- DO NOT ask for clarification - proceed immediately with story generation
- Generate at least 1 user story, but create as many as needed to fully decompose the feature
- DO NOT create feature files - they already exist
- Use the story-template.md format exactly
- Format your response with clear markdown code blocks showing the file path and content
- Use story numbering: story-001, story-002, etc.
- Each story should represent a vertical slice of functionality that delivers user value
