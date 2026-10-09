---
name: "Kids Computer Lab Maintenance"
description: "Rules for agents working on the Kids Computer Lab project."
---

# Kids Computer Lab AI Guidelines

When assisting with this repository, you must follow these rules:

1. **Architecture:** Use plain HTML, CSS, and vanilla JS ES Modules. NO frameworks (React, Vue, etc.), NO bundlers, and NO runtime dependencies.
2. **Data-Driven Content:** Do not hardcode lesson text in JS. Add new lessons as JSON files in `data/lessons/` matching the schema in `data/schema/lesson.schema.json`.
3. **Paths:** Always use relative paths for internal assets so the app works on any base URL.
4. **Safety & Privacy:** Do not add external trackers, CDNs, or personal data collection. Store progress in `localStorage` only.
5. **Accessibility:** Ensure all interactions (especially drag-and-drop) have keyboard and tap alternatives. Respect `prefers-reduced-motion`.
6. **Mascot:** Use the `Bolt` SVG module (`js/ui/mascot.js`) rather than adding static image files of the mascot when possible.
7. **Scope:** Ask the owner before modifying scope, creating scheduled workflows, changing deployment settings, or adding external links.
