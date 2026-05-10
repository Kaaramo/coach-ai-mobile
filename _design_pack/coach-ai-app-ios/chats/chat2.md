# Drawing Application

_Started 2026-04-29 17:11 UTC_

---

## User

Apply drawing

## Assistant

I'll look at the drawing and the current design to understand what to change.

_[tool: view_image]_

The user circled the "Semaine" (Week) view's activity ring section — specifically the donut chart area showing "39 h TOTAL ACTIF" with the segments breakdown. Let me look at the current file to understand the structure.

_[tool: list_files]_

_[tool: read_file]_

I see — the section header in `ActivitySection` is hardcoded as "Activité du jour" but should change based on the period. Looking at the drawing, the user circled the "Semaine" view's section, where the label still says "ACTIVITÉ DU JOUR" but should reflect the week period.

Let me fix the section header to be period-aware.

_[tool: str_replace_edit]_

_[tool: done]_

Fixed — the section header on the Semaine view now reads "ACTIVITÉ DE LA SEMAINE" (and "ACTIVITÉ DU MOIS" on Mois), instead of always saying "Activité du jour".

