# Pull Request & Branch Consolidation Plan

## Current State (2026-04-13)
- **Total branches**: 35
- **Protected branches**: 1 (main)
- **Open PRs**: 28+
- **Target state**: Only `main` and `dev` as long-lived branches (`feature/*` branches are short-lived and deleted after merging)

## Analysis

### Valuable PRs to Keep/Merge
1. **PR #38** - Dependabot security updates
   - Updates: hono 4.12.12, flatted 3.4.2, kysely 0.28.15
   - Status: Open, ready to merge
   - Action: **MERGE TO MAIN**

### Duplicate PRs to Close (Security Headers)
All these PRs implement the same OWASP security headers in `next.config.ts`:
- PR #40, #39, #37, #36, #35, #34, #33, #32, #31, #30, #29, #28
- 12+ nearly identical "Sentinel" PRs from automated security scanning

**Recommended Action**:
- Keep **PR #40** (most recent, includes CI fixes)
- Close all other security header PRs as duplicates

### Branches to Delete
All `sentinel/*` and feature branches except:
- `main` (protected)
- `dev` (to be created from main)
- `dependabot/npm_and_yarn/npm_and_yarn-376d8c2b56` (active PR #38)

**Branches for deletion** (32 branches):
- `sentinel/add-security-headers-*` (multiple)
- `sentinel/fix-*` (multiple)
- `sentinel-*` (multiple)
- `jules/sentinel-*`
- `fix/sentinel-*`
- `cursor-dev/development-environment-setup-6513`
- `dev-local` (will be replaced by `dev`)
- `claude/consolidate-pull-requests` (this working branch, after completion)

## Action Plan

### Phase 1: Merge Valuable Work
- [ ] Merge PR #38 (Dependabot updates) to main
- [ ] Optionally merge PR #40 (security headers + CI fixes) to main

### Phase 2: Create Dev Branch
- [ ] Create `dev` branch from latest `main`
- [ ] Set up branch protection rules for `dev`

### Phase 3: Close Duplicate PRs
- [ ] Close PRs #28-37 and #39; keep PR #40 open unless/until it has been merged in Phase 1
- [ ] Add comment explaining consolidation

### Phase 4: Delete Obsolete Branches
- [ ] Delete all `sentinel/*` branches
- [ ] Delete `dev-local`, `cursor-dev/*`, `jules/*`, `fix/*` branches
- [ ] Keep only `main` and `dev`

### Phase 5: Verification
- [ ] Confirm only `main` and `dev` branches exist
- [ ] Update CLAUDE.md to reflect new branch strategy
- [ ] Document in `.agent/progress.md`

## Rationale

**Why consolidate?**
- Reduces cognitive overhead
- Eliminates duplicate work
- Establishes clear `main`/`dev` workflow
- Makes CI/CD more reliable (fewer preview environments)

**Why keep PR #38?**
- Important security updates for dependencies
- No conflicts with main
- Well-documented changes

**Why choose PR #40 for security headers?**
- Most recent implementation
- Includes CI/Neon branch fixes
- Comprehensive OWASP headers

## Branch Strategy Going Forward

```
main (protected, production)
  └── dev (integration branch)
       └── feature/* (short-lived feature branches)
```

**Rules:**
- Direct commits to `main` only for hotfixes
- All development work branches from `dev`
- PRs merge to `dev` for testing
- Periodic `dev` → `main` merges for releases
