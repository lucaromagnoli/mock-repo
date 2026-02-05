# Task: {Technical Task Name}

**Task ID:** task-{number}
**Story:** [{Parent story ID}](../story.md)
**Type:** [Backend / Frontend / Infrastructure / Database / API / Testing / DevOps]
**Complexity:** [S / M / L / XL]
**Status:** Not Started
**Created:** {YYYY-MM-DD}

## Description
[What needs to be built/changed technically. Be specific about the technical work required.]

## Dependencies
- [Link to other task files this depends on: task-XXX-name.md]
- [External dependencies or prerequisites]
- [Write "None" if no dependencies]

## Technical Details

### Components Affected
- [Specific services, modules, or components that will be modified]
- [Files or directories to modify]
- [System boundaries crossed]

### Implementation Approach
- [Key technical decisions and rationale - explain WHY this approach]
- [Patterns or approaches to use (e.g., Repository pattern, Factory pattern)]
- [Integration points with existing systems]
- [APIs or interfaces to implement/modify]

### Data Models / Schema Changes
- [Database schema changes with field descriptions]
- [Data structures or models to create/modify]
- [API contracts or interfaces - request/response formats]
- [Write "None" if no data model changes]

### Third-Party Integrations
- [External services or libraries to integrate]
- [API dependencies and versions]
- [Authentication/authorization requirements for external services]
- [Write "None" if no third-party integrations]

## Implementation Steps

1. [Concrete implementation step with specific actions]
2. [Concrete implementation step with specific actions]
3. [Concrete implementation step with specific actions]
4. [Continue numbering as needed]

## Code Changes

### Files to Create/Modify
- `path/to/file.ext` - [Specific changes needed in this file]
- `path/to/another/file.ext` - [Specific changes needed in this file]

### Configuration Changes
- [Environment variables to add/modify]
- [Config files to update]
- [Feature flags to add]
- [Write "None" if no configuration changes]

### Migration Steps
- [Database migrations if applicable - up and down scripts]
- [Data migration scripts for existing data]
- [Backwards compatibility considerations]
- [Write "None" if no migrations needed]

## Testing Requirements

### Unit Tests
- [Specific unit test scenarios - test what?]
- [Edge cases to cover]
- [Mock requirements]

### Integration Tests
- [Integration test scenarios - what system interactions to test?]
- [End-to-end flows to validate]

### Performance Considerations
- [Performance benchmarks or requirements]
- [Load testing needs and expected throughput]
- [Response time requirements]
- [Write "None" if no specific performance requirements]

## Security Considerations
- [Security implications of this change]
- [Authentication/authorization needs]
- [Data protection requirements (encryption, PII handling)]
- [Input validation and sanitization]
- [Write "None" if no special security considerations]

## Technical Risks
- [Potential issue or complication and likelihood]
  - Mitigation: [How to prevent or handle this risk]
- [Another potential issue]
  - Mitigation: [Mitigation strategy]

## Definition of Done
- [ ] Code implemented following project standards
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests written and passing
- [ ] Code reviewed and approved
- [ ] Documentation updated (inline comments and external docs)
- [ ] Performance benchmarks met (if applicable)
- [ ] Security review completed
- [ ] Deployed to staging environment
- [ ] Manual testing completed
- [ ] Story acceptance criteria validated

## Notes
[Any additional context, considerations, or follow-up items]

<!--
INSTRUCTIONS FOR AGENTS:
- Be specific and actionable - engineers should know exactly what to build
- Include technical details - code changes, files, APIs, schemas
- Show dependencies clearly - what must be done first
- Consider the full picture - testing, security, performance, monitoring
- Right-size tasks - not too big (>2 days) or too small (<2 hours)
- Link related tasks using relative paths
- Think about rollback - what if we need to undo this?
- Use {number} format for task numbering (e.g., 001, 002, 003)
- Complexity sizing:
  - S (Small): < 4 hours, straightforward implementation
  - M (Medium): 4-8 hours, moderate complexity
  - L (Large): 1-2 days, significant complexity
  - XL (Extra Large): > 2 days, needs to be broken down further
- Created date should be ISO format (YYYY-MM-DD)
-->
