# Architecture Overview

## Design Principles
1. **Zero Dependencies:** Plain HTML, CSS, Vanilla JS.
2. **Offline-First / Static Hostable:** Hash routing (`#/home`) means it works perfectly out-of-the-box on GitHub Pages or local file protocols.
3. **Data-Driven:** Content is separated from logic. Lessons are defined as JSON.
4. **Local Privacy:** No cloud accounts; progress is stored locally in `localStorage`.

## File Structure
- `/index.html`: The SPA shell.
- `/js/app.js`: Main entry point.
- `/js/router.js`: Custom hash-based router.
- `/js/store.js`: LocalStorage wrapper.
- `/js/lessons/renderer.js`: The engine that renders JSON lessons.
- `/js/ui/`: UI components (Mascot, Quiz, Drag/Drop, Hotspot, Mouse Sandbox, Typing).
- `/data/`: Lesson JSON files and schema.
- `/css/`: Modular CSS (Tokens, Components, Theme).

## Expanding the App
To add a new lesson:
1. Create a JSON file in `/data/lessons/` following `/data/schema/lesson.schema.json`.
2. Add the lesson entry to `/data/lesson-index.json`.
