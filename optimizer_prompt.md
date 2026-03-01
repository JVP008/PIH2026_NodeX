# ROLE

Senior Full-Stack Engineer (Next.js + TypeScript + Supabase) specialized in code quality, readability, and production standards.

# CONTEXT

This project is a Next.js + TypeScript + Tailwind + Supabase web application.  
The app is functional but contains inconsistent formatting, weak comments, possible `any` types, debug logs, and prototype-level code quality.

The UI and functionality MUST remain unchanged. Only improve code quality.

# GOAL

Refactor and polish the entire codebase to make it:

- Clean
- Well-structured
- Fully typed
- Readable by humans
- Easy to understand for beginners
- Production-ready for judging and automation analysis

# CONSTRAINTS

- DO NOT change UI or design
- DO NOT change functionality or logic flow
- DO NOT remove working features
- DO NOT introduce new features
- ONLY improve code quality, structure, types, and comments

# TASKS

## 1. CODEBASE SCAN

- Identify:
  - `any` types
  - unused variables/imports
  - console logs / debug statements
  - mock or unused data
  - inconsistent naming
  - poorly structured files

## 2. FORMATTING & STRUCTURE

- Apply consistent formatting across all files
- Use Prettier standards
- Ensure clean indentation and spacing
- Organize imports properly
- Maintain consistent naming conventions

## 3. TYPESCRIPT IMPROVEMENT

- Replace all `any` types with proper types
- Create/update `/types` folder
- Define interfaces for:
  - User
  - Contractor
  - Job
  - Booking
  - Dispute
- Ensure strict typing across components and functions

## 4. COMMENTS & DOCUMENTATION (VERY IMPORTANT)

- Add meaningful comments across the project

- Write comments in a simple, human-friendly way using plain language so that even a 12-year-old can easily understand what the code does and why it is written that way

- Add:
  - JSDoc comments for all exported functions
  - Component-level descriptions (what it does)
  - Inline comments for complex logic

- Avoid technical jargon in comments
- Explain logic, not just code

## 5. CLEANUP

- Remove:
  - console.log / debug logs
  - unused code
  - unused files
- Clean up imports
- Remove dead logic

## 6. SMALL SAFE REFACTORING

- Extract repeated logic into helper functions
- Improve readability without changing behavior
- Ensure clean component structure

## 7. BEST PRACTICES

- Ensure proper React patterns
- Use "use client" only where needed
- Keep server/client separation clean
- Follow Next.js App Router conventions

## 8. BUILD VERIFICATION

- Ensure project runs:
  - npm run dev
  - npm run build
- Fix all TypeScript errors
- Fix linting issues

## 9. LINTING & TOOLING

- Add/update:
  - ESLint config
  - Prettier config
- Ensure project passes linting

# FINAL OUTPUT

Provide:

1. Summary of improvements
2. List of changed files
3. Remaining issues (if any)
4. Build status (success/fail)
5. Example of improved code (before → after)
6. Suggested next improvements

# COMMIT MESSAGE

chore: improve code quality, types, and human-readable comments
