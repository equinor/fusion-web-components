# Decision Tree

Order of design decisions for **new** apps, pages and views, plus the threshold check for existing UI. Each step names the reference that holds its rules.

## Scope first

| Task | Steps to run |
| --- | --- |
| New app | 1–7 |
| New page or view in an existing app | Threshold check, then 1, 3–7. Step 7 extends existing `DESIGN.md`; template is only for apps without one |
| Change to an existing page | Threshold check, then 4–6, and 7 when a threshold decision is made. Keep its layout, navigation, spacing tokens and components |

Never re-decide layout or navigation for existing UI unless the user asks or the threshold check finds a crossing. Report other differences from defaults as suggestions.

## Threshold check (existing UI)

Before changing existing UI, check whether the change crosses a navigation or layout threshold. Use recorded `Revisit when` conditions in `DESIGN.md` first; otherwise use this table:

| Current | Change that crosses the threshold | Candidate |
| --- | --- | --- |
| Tabs | 6th view; sub-navigation inside a tab; section unrelated to the tabs' shared entity | Sidemenu |
| Sidemenu | 5th navigation level | Rethink information architecture |
| A — Centered | Data grid or map becomes main content | C — Viewport-fill |
| A — Centered | Page becomes a list, search results or dashboard | B — Full-width |
| B — Full-width | Single grid or map fills the page | C — Viewport-fill |
| C — Viewport-fill | Other content added beside the grid or map | B — Full-width (bounded grid) |

On a crossing, **stop before writing any code** — even when the user explicitly asked for the change. A request for a 6th tab or a grid is not consent to exceed the threshold; never implement first and mention the threshold afterwards. Tell the user:

1. **What crosses** — e.g. "this is the 6th tab".
2. **Why it matters** — the rule and its effect, e.g. "tabs suit up to 5 views of one entity; beyond that they crowd, and a sidemenu supports more sections and hierarchy".
3. **Options + recommendation** — keep the current pattern and record a deviation with the reason; plan the switch as a separate change; or restructure (merge/regroup views).

Never switch navigation or layout as a side effect of another change. Record the user's choice in `DESIGN.md` so the same question is not repeated until the next threshold.

## 1. Classify the page → layout pattern

- Pick pattern and max-width from **Pattern selection** in `layout.md`; centered rules in `layout-centered-content.md`, spacing in `spacing.md`.
- One pattern per page; mixed pages take the pattern of their primary task.
- If the app has a shared page component (e.g. `AppPage`), use it and its defaults instead.

## 2. Choose the navigation model (new app only)

| App shape | Navigation | Breadcrumbs |
| --- | --- | --- |
| One page | None | No |
| 2–5 flat views of the **same** entity or context | Tabs | No |
| Exactly 2 **independent** sections | Open question — ask the user | — |
| 3+ **independent** sections, any hierarchy, or >5 views | Sidemenu | From depth 2 |

- For 2–5 views ask: "are these views of one thing?" Yes → tabs. No, with 3+ sections → sidemenu.
- **Exactly 2 independent sections:** guidelines conflict — sidemenu prefers tabs at 1–2 sections (less chrome), while tabs are for views of one entity. Ask the user before building navigation, present both options with these reasons, recommend from expected growth (tabs if staying at two, sidemenu if more sections are planned), and record the choice in `DESIGN.md`.
- Rules: `navigation-tabs.md`, `navigation-sidemenu.md`.

## 3. Page header

- Title: `Typography variant="h1"`, aligned to the content width.
- `?` help icon on `h1` only, and only when a help article exists (`contextual-help.md`).
- Tabs sit directly below the title, left-aligned.

## 4. Edit and action model

| Situation | Use |
| --- | --- |
| Editable page needing explicit Save | Optional action bar (`actions.md`), or app's existing save pattern |
| Small edit or detail without leaving page | Side sheet with Apply below content |
| Delete / remove / restore-to-default | Confirmation before executing (`actions.md`) |
| Auto-saving form | Status indicator, no action bar |

## 5. States for every data region

Decide loading, empty (first use and no filter results), error and no-access before implementing. Rules: `empty-states.md`, `error-messages.md`.

## 6. Verify EDS facts

Never write a token, prop or import from memory:

- **Tokens:** confirm the variable exists in installed `@equinor/eds-tokens/build/css/variables.css`.
- **Components/props:** check installed `@equinor/eds-core-react` types or Fusion MCP EDS search.
- **EDS beta apps** with `@equinor/eds-cli` installed: `npx --no-install eds show <Component>` and `npx --no-install eds tokens <words>`.

## 7. Record in `DESIGN.md`

- **No `DESIGN.md`:** create from `assets/DESIGN.md.hbs` covering steps 1–5. Add principles only when the user states them; never invent principles, owners or dates.
- **Existing `DESIGN.md`:** append new decisions in its own structure and wording; never reformat or restructure it.
- Record **Revisit when** on every navigation and layout decision (e.g. for tabs: "more than 5 views, sub-navigation, or an unrelated section").
- After a threshold question, record either the updated decision with a new **Revisit when**, or a deviation with its reason.
- **Precedence:** mandatory rules in `SKILL.md` → `DESIGN.md` → recommended defaults → judgement. `DESIGN.md` never overrides mandatory rules. List uncovered cases under open questions.
