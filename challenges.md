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

## 30 May 2025 — DeepWork OS UI (Modal CSS)

**1. Modal card had no visual styling**
- **Why:** `.modal-card` was missing background, padding, border-radius, and max-width.
- **Fix:** Add `background: white; padding: 40px; border-radius: 20px; max-width: 480px`.

**2. Option cards stacking vertically instead of side by side**
- **Why:** Icon and text were in separate divs without a shared flex row container.
- **Fix:** Wrap icon and text in `.option-card` with `display: flex; align-items: center; gap: 14px`.

**3. Modal visible by default**
- **Why:** No `display: none` on `.modal-overlay`.
- **Fix:** Add `display: none` by default and `display: flex` on `.modal-overlay.active`.

---

## 31 May 2025 — DeepWork OS JS (Interactivity + localStorage)

**1. Sidebar active state not switching**
- **Why:** `script.js` was linked in `<head>` — ran before the DOM existed, so `querySelectorAll` returned nothing.
- **Fix:** Move `<script>` to just before `</body>` so HTML is fully parsed before JS runs.

**2. Active class not removing from other items**
- **Why:** `item.classList.remove('active')` inside the loop was removing from the clicked item, not the loop variable `i`.
- **Fix:** Change to `i.classList.remove('active')` so every item gets cleared before adding to the clicked one.

**3. `optionCards.forEach` throwing error**
- **Why:** Used `querySelector` instead of `querySelectorAll` — returns a single element, not a list. Single elements don't have `forEach`.
- **Fix:** Change to `querySelectorAll('.option-card')`.

**4. Typo in classList.add**
- **Why:** `newEntry.classList.add('.journal-entry')` — dot included, which is CSS selector syntax not a class name.
- **Fix:** Remove the dot — `classList.add('journal-entry')`.

**5. innerHTML missing opening tag**
- **Why:** First div in the template literal was missing the opening `<`.
- **Fix:** Always open template literals with a complete tag — `<div class="...">`.

**6. localStorage storing wrong key**
- **Why:** `localStorage.getItem(entry)` was passing the object as the key instead of a string.
- **Fix:** Use a fixed string key — `localStorage.getItem('entries')`.

**7. Previous entries wiped on each save**
- **Why:** Created a new empty array every time instead of reading existing entries first.
- **Fix:** `const entries = JSON.parse(localStorage.getItem('entries')) || []` — reads existing or falls back to empty array.

**8. New entry not appearing on page**
- **Why:** `timeline.appendChild(newEntry)` was missing — element was created in memory but never added to the DOM.
- **Fix:** Always call `appendChild` after setting `innerHTML`.

---
## 3rd Juhe 2026 — DeepWork OS JS (Habit checkbox)

**1. Habit checkbox not working properly; it increases the streak and updates the progress bar on every check and uncheck**
- **Why:** Initially the event listener only checked if the box was clicked or not and updated it.
- **Fix:** wrapped the function inside an if condition `if(checkbox.checked)`.




## Template for future entries

**Issue:**
- **Why:**
- **Fix:**