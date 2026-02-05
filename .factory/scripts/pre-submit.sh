#!/bin/bash
# Pre-submit hook: Verify project context exists before workflow submission

if [ ! -f "00-context/README.md" ]; then
    echo ""
    echo "ERROR: Missing required file: 00-context/README.md"
    echo ""
    echo "Before submitting workflows, you must populate 00-context/README.md with"
    echo "project context for Claude agents to understand your codebase."
    echo ""
    exit 1
fi

exit 0
