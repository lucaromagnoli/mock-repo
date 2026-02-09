# Feature Development Structure

This document describes the hierarchical structure for organizing features, user stories, and technical tasks.

## Directory Structure

```
01-features/
└── {number}-{name}/
    ├── feature.md                              # Feature overview
    └── stories/
        ├── story-{number}-{name}/
        │   ├── story.md                        # User story
        │   └── tasks/
        │       ├── README.md                   # Implementation plan
        │       ├── task-{number}-{name}.md     # Technical task
        │       └── task-{number}-{name}.md     # Technical task
        └── story-{number}-{name}/
            ├── story.md
            └── tasks/
                ├── README.md
                └── task-{number}-{name}.md
```

## Naming Conventions

- **Features:** `{number}-{kebab-case-name}`
  - Example: `001-user-authentication`
- **Stories:** `story-{number}-{kebab-case-name}`
  - Example: `story-001-user-registration`
- **Tasks:** `task-{number}-{kebab-case-name}`
  - Example: `task-001-create-api-endpoint`
- Numbers are zero-padded: `001`, `002`, `003`, etc.
- Use kebab-case (lowercase with hyphens)

## File Hierarchy

### Level 1: Feature (`feature.md`)

**Purpose:** High-level feature description focusing on business value and user impact

**Contains:**
- Feature ID and status
- Business value proposition
- User impact description
- List of user stories
- Success metrics

**Created by:** `feature-story-generator` agent (Product Manager role)

### Level 2: User Stories (`story.md`)

**Purpose:** User-centric requirements defining WHAT users need and WHY

**Contains:**
- Story ID and priority (MoSCoW)
- User story format: "As a [user], I want [goal], so that [benefit]"
- Acceptance criteria (user-observable outcomes)
- Definition of done (user perspective)
- User value and notes

**Created by:** `feature-story-generator` agent (Product Manager role)

### Level 3: Technical Tasks (`task-{number}-{name}.md`)

**Purpose:** Technical implementation details defining HOW to build the story

**Contains:**
- Task ID, type (Backend/Frontend/etc), and complexity (S/M/L/XL)
- Technical description and dependencies
- Components affected and implementation approach
- Data models, APIs, and integrations
- Implementation steps and code changes
- Testing requirements and security considerations
- Technical definition of done

**Created by:** `story-technical-decomposer` agent (Technical Architect role)

### Level 3: Implementation Plan (`tasks/README.md`)

**Purpose:** Overview of technical implementation with architecture and sequencing

**Contains:**
- Architecture overview and decisions
- Task summary table
- Implementation sequence (phases)
- Dependency graph
- Cross-cutting concerns (performance, security, monitoring)
- Technical risks and estimates

**Created by:** `story-technical-decomposer` agent (Technical Architect role)

## Workflow

```
1. Feature Request
   ↓
2. feature-story-generator (PM Agent)
   ↓
   Creates: {number}-{name}/feature.md
   Creates: stories/story-{number}-{name}/story.md (multiple)
   ↓
3. story-technical-decomposer (Architect Agent)
   ↓
   Reads: stories/story-{number}-{name}/story.md
   Creates: tasks/README.md (implementation plan)
   Creates: tasks/task-{number}-{name}.md (multiple)
   ↓
4. Engineers implement tasks
```

## Example: User Authentication Feature

```
01-features/
└── 001-user-authentication/
    ├── feature.md
    └── stories/
        ├── story-001-user-registration/
        │   ├── story.md
        │   └── tasks/
        │       ├── README.md
        │       ├── task-001-create-registration-api.md
        │       ├── task-002-user-database-schema.md
        │       ├── task-003-registration-form-ui.md
        │       └── task-004-email-verification.md
        │
        ├── story-002-user-login/
        │   ├── story.md
        │   └── tasks/
        │       ├── README.md
        │       ├── task-001-jwt-authentication.md
        │       ├── task-002-session-management.md
        │       └── task-003-login-form-ui.md
        │
        └── story-003-password-reset/
            ├── story.md
            └── tasks/
                ├── README.md
                ├── task-001-reset-token-generation.md
                ├── task-002-email-reset-service.md
                └── task-003-reset-password-ui.md
```

## Separation of Concerns

| Aspect | Feature/Stories | Tasks |
|--------|-----------------|-------|
| **Created by** | Product Manager | Technical Architect |
| **Focus** | WHAT and WHY | HOW |
| **Perspective** | User-centric | System-centric |
| **Language** | Business value, user needs | Code, APIs, schemas, architecture |
| **Acceptance** | User-observable outcomes | Technical completeness |
| **Audience** | Stakeholders, users | Engineers, developers |

## Benefits of This Structure

✅ **Traceability** - Clear path from feature → story → task
✅ **Navigation** - Related artifacts live together
✅ **Separation** - Product and technical concerns are distinct
✅ **Scalability** - Easy to add new stories and tasks
✅ **Collaboration** - PM and architects work in their domains
✅ **Visibility** - Anyone can understand feature scope at any level

## Related Agents

- **feature-story-generator** - Creates features and user stories (PM role)
- **story-technical-decomposer** - Creates technical tasks and implementation plans (Architect role)
