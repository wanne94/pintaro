# CLAUDE.md

This file guides Claude Code when working in this repository.

## Workflow (MUST FOLLOW)

1) **Plan**
   - Read the codebase and locate relevant files.
   - Write or update **projectplan.md** (in the repo root) with a clear TODO list.

2) **Approval**
   - Post the plan in chat and **WAIT for approval** before making any changes.

3) **Execution**
   - Work through TODOs **one by one**.
   - **Before writing any files**, show the **unified diff (patch)** you intend to apply and wait for “APPROVED”.
   - Use a task branch: `claude/<short-task-name>`. Commit in small, clean steps.
   - After finishing a TODO, mark it **done** in **projectplan.md** and add a short summary to **todo.md** under a **Review** section.

4) **Communication**
   - After each item, provide a brief “what changed and why” summary—high level, no noise.

## Guardrails

- **File creation:** Allowed **only** for `projectplan.md` and temporary/test content in `temp/`. Anything else requires explicit approval.
- **Minimal changes:** Avoid large refactors, mass renames, or broad file moves without approval. Keep changes as small and local as possible.
- **Diff first:** Always present a patch **before** writing to disk and wait for approval.
- **Stack rules:**
  - Language: **TypeScript (strict)**.
  - Frontend: **Next.js** (respect the existing `app/` or `pages/` structure), **Tailwind CSS**, **shadcn/ui**, **lucide-react**.
  - Tooling: Use existing **ESLint/Prettier** config. Follow the repo’s package manager (lockfile dictates: npm/yarn/pnpm).
  - **Build gates:** Run `lint`, `typecheck`, and `build` locally. If anything fails, stop and ask for guidance.
- **Assets/Uploads:** New images/files go to `server/uploads` (same path for dev and prod).
- **Database/Production:** No migrations, seeds, or destructive scripts without explicit approval. Don’t change production config without approval.
- **Component reuse:** Always look for an existing component first; prefer small extensions over new components.
- **Temporary files:** Put all temporary/test files in `temp/` and clean them up when done.

## Reminders

- Do exactly what is requested—nothing more, nothing less.
- Prefer editing existing files to creating new ones.
- Keep every change as simple as possible.
