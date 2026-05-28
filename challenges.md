# Dev Challenges Log

---

## 28 May 2025 — DeepWork OS UI (HTML/CSS)

**1. Hero card stuck at bottom**
- **Why:** `<main class="dashboard"></main>` was self-closing. The hero card was outside the dashboard, not inside it.
- **Fix:** Move `.hero-card` inside the `<main>` tag before closing it.

**2. Badge stretching full width**
- **Why:** `<div>` is block by default — takes full width.
- **Fix:** `display: inline-block` makes it shrink to content width.

**3. Resume Focus button wrapping to two lines**
- **Why:** `.hero-right` had no `flex-shrink: 0`, so it compressed.
- **Fix:** Add `flex-shrink: 0` and `white-space: nowrap` to the button.

**4. Streak items merging into one blob**
- **Why:** `.streak-item` had no layout — missing `display: flex`.
- **Fix:** Add `display: flex; align-items: center; justify-content: space-between`.

**5. Progress bar invisible**
- **Why:** `.progress-fill` had no width or color set.
- **Fix:** Add `width: 65%; background: #111827; height: 100%`.

**6. `flex: row` / `flex: column` not working**
- **Why:** These are invalid. `flex` is shorthand for grow/shrink/basis, not direction.
- **Fix:** Use `display: flex` + `flex-direction: row/column`.

**7. Timeline line not reaching next dot**
- **Why:** `height: 300%` on `::after` is relative to the dot's height (12px), not the gap.
- **Fix:** Use a fixed `height: 80px` matching the actual gap between entries.

**8. Broken HTML nesting (streak items, journal entries)**
- **Why:** Opening tags without matching closing tags at the right level.
- **Fix:** Every opening tag closes before its parent closes. Indent properly to see the structure.

---

## Template for future entries

**Issue:**
- **Why:**
- **Fix:**