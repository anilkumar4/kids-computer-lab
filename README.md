# Kids Computer Lab

A free, static educational website introducing computers and laptops to young learners.

## Tracks
- **Little Explorers (UKG, ages 5–6):** Picture-first, tap-first, short, friendly, and voice-enabled basics.
- **Tech Champions (Class 4, ages 9–10):** Technical vocabulary, simulations, quizzes, practical computer literacy, and basic problem-solving.

## Getting Started (Local Development)

The project is built with plain HTML, CSS, and vanilla JS ES Modules. No build tools are required.

To run locally, you need a local web server (to avoid CORS issues with ES Modules). If you have Python installed:

```bash
# In the project root directory:
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## Architecture

- **No framework:** 100% vanilla JavaScript.
- **Routing:** Hash-based SPA routing (`#/home`, `#/lesson/a1`). Works on any static host.
- **Data:** Lessons are defined in JSON files (`data/lessons/`) and rendered dynamically.
- **Storage:** Progress is saved to `localStorage` (no cloud sync, completely private).

## Expected URL & Deployment

This is designed to be hosted on GitHub Pages or any static host.
- **Base path:** All internal links use relative paths (`./css/base.css`) so it can be deployed at the root or under a subpath like `/utilities/kids-computer-lab/`.

## Privacy Promise

- No accounts or login.
- No analytics or tracking pixels.
- No third-party ads.
- Progress is stored locally on the user's device.
