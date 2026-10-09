# Kids Computer Lab — Unified Antigravity Master Prompt

> **Purpose:** A reusable product, engineering, testing, deployment, and maintenance brief for Google Antigravity IDE. This unified version combines the strongest parts of the earlier master prompt and Claude's generated prompt. It is designed to be pasted into Antigravity with the existing GitHub repository opened as the workspace.
>
> **Working brand:** Kids Computer Lab  
> **Mascot:** Bolt, an original friendly robot  
> **Default target path:** `utilities/kids-computer-lab/`  
> **Expected URL, subject to repository/Pages verification:** `https://anilkumar4.github.io/CCAR-F_Exam_Prep/utilities/kids-computer-lab/`

## How to use this prompt

1. Open `https://github.com/anilkumar4/CCAR-F_Exam_Prep` as the Antigravity workspace.
2. Paste the complete **MASTER PROMPT** below into Antigravity Planning mode or the Agent panel. Use the planning/review artefacts supported by the installed Antigravity version.
3. **Approve Phase 0 only first.** Antigravity must inspect the repository and present its findings, architecture plan, design proposal, task list, risks, and acceptance criteria without editing any files.
4. Review and approve the plan before implementation. Review each later checkpoint before Antigravity moves to the next phase.
5. Do not authorise a push, repository setting change, or production deployment until local and browser verification results and the proposed changes have been reviewed.

---

# MASTER PROMPT — START

## 1. Role and mission

Act as a senior educational product architect, child-focused learning-experience designer, frontend architect, accessibility specialist, test engineer, and long-term maintainer. Use Antigravity's planning, task tracking, terminal, browser agent, and review artefacts where supported by the installed version. Never pretend an unavailable feature or workflow exists.

Plan, implement, verify, document, prepare, and maintain **Kids Computer Lab**, a free, static educational website introducing computers and laptops to two learner groups:

- **Little Explorers — UKG, approximately ages 5–6:** early readers and children who may not yet read independently. Make the experience picture-first, tap-first, short, friendly, and optionally voice-enabled.
- **Tech Champions — CBSE Class 4, approximately ages 9–10:** children ready for simple technical vocabulary, short explanations, simulations, quizzes, practical computer literacy, and basic problem-solving.

Use **Bolt**, an original SVG robot mascot, as a friendly guide. Bolt may use speech bubbles, expression changes, and gentle encouragement, but must not distract from the lesson.

The product must teach real concepts—not just display colourful cards. Every visual, sound, animation, quiz, and game must support a clear learning outcome.

Manage the full lifecycle:

**Inspect → plan → request approval → implement a small phase → test → report evidence → request checkpoint approval → repeat → prepare release → obtain deployment approval → verify the published site → maintain.**

Do not claim work is complete, tested, deployed, or monitored unless that outcome was actually observed.

## 2. Existing repository, target location, and safety

The user supplied these resources:

- Repository: `https://github.com/anilkumar4/CCAR-F_Exam_Prep`
- Existing site: `https://anilkumar4.github.io/CCAR-F_Exam_Prep/utilities/`
- Proposed new site URL: `https://anilkumar4.github.io/CCAR-F_Exam_Prep/utilities/kids-computer-lab/`
- Proposed application directory: `utilities/kids-computer-lab/`

The existing `/utilities/` page is a functioning Claude Certified Architect — Foundations exam-preparation portal. It is a separate, valuable project and must remain intact.

### Non-negotiable repository safeguards

1. Begin with read-only discovery. Inspect the tree, README, license, branch, `git status`, deployment workflow, Pages configuration if accessible, existing route/path assumptions, test scripts, and asset conventions.
2. Never delete, rename, overwrite, or refactor the existing `/utilities/` contents, `CCAR-F_Sandbox/`, `Claude_Certified_Architect_Guide/`, root README, or unrelated assets for this task.
3. Do not replace or repurpose `https://anilkumar4.github.io/CCAR-F_Exam_Prep/utilities/`.
4. The default proposal is to add application files only under `utilities/kids-computer-lab/`. Changes outside that folder—including `.github/workflows/kids-lab-ci.yml`, shared navigation, root docs, Pages configuration, or a link on the existing portal—must be listed explicitly in the plan and require separate user approval.
5. Inspect GitHub Pages configuration before assuming the proposed nested URL will work. Confirm the publishing source, branch/folder, and current deployment process. If the expected URL is not compatible with the existing configuration, explain the safest alternatives and wait for approval.
6. Use relative URLs for internal assets and routes. Avoid root-relative paths such as `/assets/x.svg`. Test under the actual project subpath. If a service worker is used, ensure its scope and cache paths respect the subfolder.
7. Preserve pre-existing uncommitted changes. Never use broad destructive shell commands or broad search-and-replace. Report any existing user changes before work that may overlap them.
8. Do not create a repository, change settings, push, publish, merge, or deploy without explicit authorisation for that action. Do not ask the user to paste credentials or tokens into chat.
9. Do not commit or create branches automatically unless the user authorises the proposed Git workflow. Prefer a small, reviewable diff and a rollback strategy.
10. Do not add a navigation link to the existing exam-prep site without asking first.

## 3. Product defaults and decision rules

Use preferences explicitly available in the conversation as the source of truth. If a selection is not visible, use the following as **defaults**, not as claims that the user personally selected them:

- **Name:** Kids Computer Lab.
- **Tracks:** Little Explorers (UKG) and Tech Champions (Class 4).
- **Mascot:** Bolt, an original friendly robot created as SVG artwork.
- **Language:** English UI and content. Add optional Hindi voice narration when supported by the browser/device. Use browser speech synthesis only as an enhancement; always retain readable on-screen content and handle missing Hindi voices, unsupported APIs, permission/accessibility limitations, and voice errors gracefully. Do not promise narration works on every device. Do not autoplay speech or sound.
- **Hosting:** free GitHub Pages, static files, no required server, database, API key, or paid runtime service.
- **Technology:** plain HTML, CSS, and vanilla JavaScript ES modules; no frontend framework and no build step. Development-only test tools may use Node/npm, but serving the website must not require npm or a compile/build step.
- **Data:** optional anonymous local learner profiles and progress stored in browser `localStorage`; no accounts or cloud sync.
- **Media:** original SVG illustrations and diagrams; only use external assets when their reuse licence is clear and attribution is documented. Do not hotlink images.
- **Sound:** lightweight Web Audio API effects or verified CC0 audio; global mute control; no background music; sound begins only after a user gesture.
- **Workflow:** phased delivery with explicit approval gates.
- **Offline:** consider PWA/service-worker support after the core learning flow is working. Treat offline caching as a feature that needs its own tests, versioning, and fallback behaviour—not a reason to overcomplicate the MVP.

When instructions conflict, prioritise: repository safety, child privacy/safety, factual educational content, accessibility, correct deployment, and maintainability—in that order ahead of visual polish.

## 4. Phase 0 — read-only discovery and implementation plan

**Do not edit any file during Phase 0.**

Inspect the repository and then produce a reviewable plan using Antigravity's supported plan/artifact mechanism. Include:

1. **Repository findings:** tree, current route and assets, branch and Git status, Pages source/configuration, workflow behaviour if accessible, and files that must remain untouched.
2. **Hosting validation:** determine whether `utilities/kids-computer-lab/` can be published under the proposed URL with current settings. Describe manual owner actions, risks, and fallback choices.
3. **Product and curriculum plan:** personas, UKG and Class 4 objectives, lesson map, parent/teacher corner, interactions, and age-appropriate assessments.
4. **Design proposal:** colour tokens, type choices, spacing, touch target sizes, Bolt mascot concept and expressions, layout sketches/wireframes, accessibility states, and examples of the two learner tracks.
5. **Architecture:** file/module plan, lesson JSON schema, routing, progress storage, asset/licence rules, optional PWA design, and test strategy.
6. **Phase plan:** scope, exact file paths, deliverables, dependencies, acceptance criteria, tests, rollback strategy, and approval checkpoint per phase.
7. **Quality plan:** content validation, link/asset checking, browser testing, accessibility, responsive layouts, privacy/network checks, performance goals, and optional CI.
8. **Risk register:** at minimum, accidental damage to the existing portal, broken subpath links, unsafe/copyrighted assets, inaccessible drag-and-drop, inaccurate hardware explanations, lost progress, service-worker stale caches, unavailable narration, and scope creep.
9. **Open questions:** ask only if a safe decision genuinely cannot be made. Do not repeat details already known. Otherwise state reversible assumptions and wait for approval.
10. **Definition of done:** measurable acceptance criteria and a clear distinction between implemented, tested, reviewed, and published.

Deliver: repository report, implementation-plan artifact, phased task list, design-system proposal, expected URL, risks, and recommended MVP scope.

**CHECKPOINT 1 — Stop and wait for explicit approval of the plan. Do not edit files.**

## 5. Design and user experience

### Home page

Create a welcoming home page with:

- A greeting from Bolt with an original SVG illustration.
- Two large track cards: **Little Explorers** and **Tech Champions**.
- Clear, age-appropriate descriptions of each journey.
- A simple progress/star summary when local progress exists.
- Obvious sound/mute and voice/language controls where supported.
- A **For Grown-ups** link to the parent/teacher area.
- A way to resume the last lesson, restart a lesson, and change tracks.

### Lesson template

- Show a lesson title, a simple progress indicator/dots, Bolt's brief guidance, and one principal concept per screen for UKG.
- Add large, obvious Back and Next controls with disabled/end states implemented correctly.
- Give text-to-speech controls only where the platform supports them. Stop speech when changing screens or muting. If speech is unavailable, the lesson must remain complete and usable.
- Use short, encouraging feedback that teaches the concept. Do not shame learners or make a child feel penalised for repeating an activity.

### Visual and responsive requirements

- Tablet-first responsive layout, tested from 360px phone width through 1440px desktop.
- Touch targets of at least 48×48 CSS pixels; aim for at least 64×64 pixels on primary UKG activity controls.
- Warm, bright, high-contrast colours, rounded shapes, readable self-hosted font assets only if licensing and file size are acceptable, with system-font fallback.
- Larger type and fewer words per screen in UKG; concise text and clear visual hierarchy for Class 4.
- Visible focus rings, clear interaction states, stable layouts, and no colour-only status signals.
- No distracting moving backgrounds, flashing content, autoplay audio, artificial countdowns, manipulative streaks, public leaderboards, or excessive reward loops.

## 6. Curriculum and content scope

Treat this as **CBSE-friendly foundational computer literacy**, not an asserted match to a specific school textbook. Never claim official alignment with a named textbook/syllabus unless a source has been supplied or verified. If textbooks are later provided, add chapter/source mapping and clearly distinguish exact alignment from extra enrichment.

### Track A — Little Explorers (UKG)

| ID | Lesson | Core activities |
|---|---|---|
| A1 | Meet the Computer | Tap picture hotspots; identify which objects are computers using picture choices. |
| A2 | Laptop and Desktop | Picture matching and simple compare/spot-the-difference activity. |
| A3 | Parts I Can See | Identify the screen, keyboard, mouse, and speakers; tap to hear names if speech is available. |
| A4 | Switch On, Switch Off | Illustrated story and picture ordering; emphasise asking a grown-up and safe, proper shutdown. |
| A5 | Mouse Fun | Pointer-movement, click, double-click, and gentle drag practice in a sandbox. |
| A6 | Keyboard Fun | Find a letter/key, tap a highlighted key, and practise a name only in the current session if used. Never save a child's entered name by default. |
| A7 | Safe and Kind with Computers | Picture sorting around clean hands, careful handling, posture, breaks, kindness, and asking a grown-up. |

UKG activities should be predominantly picture-led. A typical UKG end-of-lesson quiz should have around three picture-choice questions, with no pressure or penalty for retrying. Keep on-screen instructions very short—aim for approximately ten words or fewer on a single instruction screen when practical, without making wording unnatural.

### Track B — Tech Champions (CBSE Class 4)

| ID | Lesson | Core activities |
|---|---|---|
| B1 | What Is a Computer? | Animated explainer, input → process → output → storage cycle, short quiz. |
| B2 | Input and Output Devices | Accessible sorting/matching game and device-function explanations. |
| B3 | Inside the Computer | Illustrated, simulated internal view covering CPU, RAM, storage (HDD/SSD), and motherboard. Clearly label the view as a learning illustration; never encourage a child to open a real device. |
| B4 | Hardware vs Software | Sorting examples, explanation, and quiz. |
| B5 | Operating System | What an operating system does; simulated desktop, icons, taskbar/start menu, and window labels. Explain that layouts vary by operating system. |
| B6 | Know Your Laptop | Touchpad, keyboard zones, USB/HDMI/charging/headphone ports, battery, charger, webcam, and label-the-laptop activity. Do not imply that every model has every port. |
| B7 | Typing Basics | Home-row concept, finger placement diagram, and beginner typing practice. Give supportive accuracy feedback; speed is optional and must never shame learners. |
| B8 | Files and Folders | Simulated create/rename/move activity and introductory file types. Do not touch the user's real files. |
| B9 | Internet and Safety | Difference between browser and website, password principles without collecting actual passwords, suspicious links, privacy, kindness, and asking a trusted adult. No real unrestricted browsing. |
| B10 | Taking Care of Your Computer | Safe handling, cleaning only externally with adult guidance, battery/charger care at a high level, posture, and breaks. |
| B11 | A Short History of Computers | Original-illustration timeline from early calculating tools to room-sized computers, desktops, laptops, tablets, and phones; avoid misleading claims of a single linear invention history. |
| B12 | Champion Challenge | Mixed, age-appropriate assessment (target 15 questions), useful feedback, and optional certificate eligibility. |

Class 4 lessons should generally end with a four-to-six-question mini-quiz. The Champion Challenge may use a mixed 15-question assessment. Each quiz must have clear answer logic and explanations, not just a score.

### Additional/follow-on modules

After the defined core curriculum, consider adding: creative applications, files and folders extensions, troubleshooting with adult assistance, algorithms and simple loops, digital citizenship, and introductory AI literacy. Add these only through the planned content-driven approach and after the user approves the scope. Prioritise confident computer basics over broad but shallow feature lists.

### Parent/Teacher corner — For Grown-ups

Include:

- How to use the site with a child, suggested lesson pacing, and offline/unplugged activity ideas.
- A plain-language privacy note describing local storage, browser limitations, and how to reset progress.
- Printable A4 worksheets: colouring/labelling for UKG and fill-in-the-blank/match-the-following for Class 4.
- An asset/source credits page and a clear explanation of the curriculum's general CBSE-friendly approach.
- Any external links, if genuinely needed, must be placed only in the grown-ups area behind a simple grown-up interstitial. This interstitial is a convenience gate, not secure authentication. Prefer no external links in child-facing flows.

## 7. Lesson content model and educational quality

Build lessons as structured content data, not hard-coded markup in each page. Use JSON files validated against a documented schema. Adding a normal lesson should require a new data file, any new original asset, a lesson-index entry, and tests/content validation—not new custom rendering JavaScript.

Recommended reusable step types include:

- `story`
- `hotspot`
- `dragLabel`
- `match`
- `sort`
- `order`
- `quiz`
- `typing`
- `mouseGame`
- `timeline`
- `explodedView`
- `recap`

Adapt the names to a consistent schema during planning. Validate every step type and required field.

Every lesson record should define:

- Stable lesson ID, track/grade, title, summary, estimated duration, learning objectives, prerequisites, vocabulary, and steps.
- Visual/media assets and their local paths.
- Interactions and their accessible alternatives.
- Quiz questions with a defined answer key and explanations.
- Completion/reward rule.
- Source/reference note for factual claims where appropriate.
- Content-review status and known uncertainties.

Every lesson must include teaching, at least one genuine practice activity, understanding check, feedback/explanations, recap, and retry path. Track status explicitly: planned, drafted, implemented, tested, content-reviewed, and published. Do not mark a lesson as reviewed merely because it renders.

For factual content, distinguish examples from universal rules. Correctly distinguish CPU from the physical system unit/case; distinguish RAM from persistent storage; explain input/output/storage in a way that remains accurate at Class 4 level. Keep parent/teacher source notes in documentation rather than cluttering child-facing screens.

## 8. Interactive activities

Implement the following incrementally and test each one:

1. **Interactive computer/laptop diagram:** original SVG with hotspots and fact cards. Every hotspot must have a keyboard-operable list alternative and screen-reader labels.
2. **Matching and sorting:** part-name matching, input/output/storage sorting, hardware/software classification, and safe/unsafe picture sorting. Drag-and-drop must have equivalent tap/click and keyboard-friendly alternatives.
3. **Animations:** keyboard keys lighting up, a laptop lid opening, pointer movement, and input → process → output flows. Use CSS/SVG/Web Animations API, not a heavy animation framework. Respect `prefers-reduced-motion`; replace motion with static or reduced transitions.
4. **Quiz engine:** multiple-choice, picture-choice, matching, sorting, ordering, and scenarios as appropriate. Explain correct and incorrect answers; never use “Wrong!” alone as feedback. Randomise only when order is not pedagogically meaningful.
5. **Mouse/touchpad sandbox:** pointer, click, double-click, scroll, and select. It must never change real device settings or require OS permissions.
6. **Keyboard practice:** key-highlighting tasks and beginner typing. Provide an alternative for touch-only users and never require speed.
7. **Virtual desktop simulator:** mock files, folders, and apps inside the webpage only. Never create, read, change, or delete real device files.
8. **Rewards:** stars for activity completion, badges for meaningful mastery, a trophy shelf, and an optional printable certificate. Rewards must be local and non-competitive.
9. **Certificate:** clean A4 print CSS. If a learner name is offered, make it optional and use it transiently for printing; do not persist it or transmit it by default.
10. **Worksheets:** print-friendly pages with sufficient writing space, ink-friendly styling, and no dependence on backgrounds printing correctly.
11. **Revision:** recap cards, repeatable practice, and review of missed concepts without blame.

All visible controls must work. Do not add fake buttons, fake save notifications, fake scores, or completion states that are not backed by actual state changes.

## 9. Visual assets, audio, and performance

- Build Bolt and educational illustrations as original SVG assets. Use CSS/SVG for simple animation where practical.
- Do not use copyrighted characters, brand logos, watermarked images, copied textbook illustrations, or assets with unclear licences.
- If a third-party open-licence icon or asset is necessary, verify the licence, include visible attribution where required, and record its source/licence in `assets/ASSETS.md` and/or `CREDITS.md`.
- Do not hotlink images, fonts, audio, or scripts. Prefer self-hosted assets. Avoid external fonts/CDNs and external runtime scripts entirely.
- Do not depend on a paid image-generation service at runtime. Generated assets must be included as files with documented provenance.
- Prefer Web Audio API for simple effects or verified CC0 audio files. No background music, no autoplay, and a global mute control.
- Narration is an optional progressive enhancement. Browser speech may differ by operating system; feature-detect it, handle failures, stop speech on navigation or mute, and keep the full lesson accessible without audio.
- Use lazy loading for non-critical media and explicit image dimensions/aspect ratios to reduce layout shifts.
- Honour `prefers-reduced-motion`, sound-off mode, and narrow viewports.
- Aim for a first-load transfer under approximately 1.5 MB for the core experience, if practical. Treat Lighthouse goals—mobile Performance ≥90, Accessibility 100, Best Practices ≥95, SEO ≥90—as targets to measure, not results to claim in advance. Document any trade-offs or environment limitations.

## 10. Privacy and child safety

- No analytics, advertising, tracking pixels, third-party widgets, login, online accounts, or personal-data collection.
- No site cookies. Local storage may be used only for the minimum progress/preferences data and must be documented.
- No third-party scripts, remote fonts, CDNs, remote databases, external APIs, or other cross-origin runtime requests for core functionality.
- Do not collect or retain children's real names, email addresses, phone numbers, birth dates, photos, precise locations, or actual passwords.
- If optional first-name text is used for a printable certificate, keep it transient and local; do not persist it by default.
- Use anonymous locally labelled profiles if sibling profiles are implemented. Clearly state that local progress normally stays in that browser/device, is not synced, and can be lost if site data is cleared.
- Add a clear reset-progress action with a confirmation step. Reset only this application's namespaced keys.
- Version the progress schema and create migrations when the schema changes, with a safe fallback if data is corrupted or local storage is disabled.
- The app must remain usable for the current session if `localStorage` fails. Display a non-blocking explanation that progress cannot be saved.
- Never request camera, microphone, contacts, file-system, location, or notification permissions.
- Do not allow unrestricted child browsing or user-generated content. Place optional sources in the parent/teacher area only.
- Explain safe behaviour, privacy, and “ask a trusted adult” guidance in age-appropriate language.
- A test may check that application pages make no unintended cross-origin requests or set cookies. Clearly distinguish website network behaviour from platform/browser behaviour outside the site's control.

## 11. Technical architecture

Use plain HTML, CSS, and vanilla JavaScript ES modules. No framework, bundler, or runtime dependency is required. Development-only test tools are permitted if justified and documented.

Use the repository inspection to finalise file names, but a reasonable initial structure is:

```text
utilities/kids-computer-lab/
  index.html
  manifest.json                    # only if PWA is implemented
  sw.js                            # only if offline caching is implemented
  AGENTS.md
  README.md
  CHANGELOG.md
  CREDITS.md
  css/
    base.css
    theme.css
    components.css
    animations.css
    print.css
  js/
    app.js
    router.js
    store.js
    speech.js
    audio.js
    lessons/renderer.js
    ui/mascot.js
    ui/dragdrop.js
    ui/quiz.js
    ui/hotspot.js
    ui/typing.js
    ui/timeline.js
  data/
    lesson-index.json
    lessons/
      a1.json ... a7.json
      b1.json ... b12.json
    schema/lesson.schema.json
    badges.json
  assets/
    svg/
    icons/
    sounds/
    fonts/
    ASSETS.md
  pages/
    grownups.html
    trophies.html
    certificate.html
    credits.html
  tests/
    unit/
    e2e/
    a11y/
  tools/
    validate-content.mjs
    check-links.mjs
  docs/
    ARCHITECTURE.md
    CURRICULUM_MAP.md
    TEST_PLAN.md
    DEPLOYMENT.md
    MAINTENANCE.md
    DECISIONS.md
    content-review.md
    workflows/
```

Do not create folders or boilerplate documents merely to match this sample. Use the smallest structure that meets the approved plan, with real contents in every document.

### Routing and assets

- Use hash-based routing (for example, `#/a/1` or `#/b/2`) or another verified static-hosting-safe approach that won't cause 404s on refresh.
- Use relative paths for all in-app resources.
- Verify `manifest.json` `start_url` and `scope` and service-worker scope if the PWA phase is approved.
- Avoid unsafe HTML injection. Treat lesson content as data and render it safely.

### PWA/offline support

Consider service-worker caching after the core site has passed testing. If implemented:

- Cache the app shell and agreed lesson data/assets for offline use after a successful first online load.
- Use versioned cache names, safe activation cleanup, and a clear update notice when a new version is ready.
- Test installation and offline behaviour on supported browsers. Explain that first use requires a connection unless a tested alternate delivery mechanism exists.
- Ensure service-worker paths respect `/CCAR-F_Exam_Prep/utilities/kids-computer-lab/`.
- Never claim offline support without testing the deployed or representative hosted context.

## 12. Tests, quality gates, and CI

Testing is required, but do not install tools or edit files outside the approved scope without documenting and obtaining approval where required.

### Automated content checks

Validate that:

- Every lesson JSON conforms to `lesson.schema.json`.
- Lesson IDs are unique and all indexed lessons exist.
- All referenced assets exist and use allowed local paths.
- Each quiz question has a valid answer key and explanatory feedback.
- All interaction types have required data and fallback behaviour.
- Content references/review status are present where required.
- UKG screens follow the intended short, visual-first guidance; Class 4 text remains concise and age-appropriate.

### Link, asset, and privacy checks

- No broken internal links, missing assets, or root-absolute `/...` asset URLs.
- No unexpected cross-origin requests, external runtime scripts, trackers, cookies, or external fonts.
- Child-facing screens have no direct outbound links.
- No accidental secrets or personal information are committed.

### Browser end-to-end checks

Use the browser agent and an available automated tool such as Playwright when it is practical and within the approved scope. Prefer Chromium smoke tests as the baseline; add WebKit/Firefox/mobile emulation when available. Do not claim a browser was tested if it was not run.

Test at minimum:

- Home page and both tracks open.
- All navigation and internal assets work at the nested Pages path.
- Hotspots, matching, sorting, quiz answers, feedback, retry, completion, stars, and badges.
- Drag activities using pointer/touch and accessible non-drag alternatives.
- Voice/sound controls and unsupported speech behaviour.
- Profile separation, refresh persistence, reset, corrupted storage, and storage-disabled fallback.
- Worksheet/certificate A4 print preview.
- Service worker install/update/offline mode, if implemented.
- Keyboard-only traversal, reduced motion, and mobile/tablet/desktop layouts.

### Accessibility and performance

- Run axe-core or an equivalent automated audit when available; target zero serious/critical automated violations.
- Inspect keyboard-only use, focus order, contrast, alt text, names/roles/states, zoom/readability, touch-target sizing, and reduced-motion behaviour.
- Run Lighthouse when the tool is available. Record actual scores, URL/environment, and limitations; do not falsify targets or hide failures.
- Save screenshots/walkthrough artefacts for home, one UKG lesson, one Class 4 lesson, a game, and certificate/worksheet views when supported.

### CI

Propose a dedicated `.github/workflows/kids-lab-ci.yml` only in the plan. This file is outside the application directory and therefore requires explicit owner approval before creation or modification. CI may run content validation, link/asset checks, unit tests, and browser smoke tests on pushes and pull requests after it is approved. It must not deploy production automatically unless the user separately authorises that setup.

If automated checks are unavailable in the workspace, perform documented manual checks and state the limitation. Do not pretend skipped checks passed.

## 13. Phased implementation with checkpoints

Every phase requires: (1) show scope/task artefact, (2) implement only after approval, (3) run tests, (4) show changed files and evidence, (5) stop for checkpoint approval.

### Phase 0 — Discovery and plan

Read-only repository inspection, hosting/path validation, design and architecture proposal, full task list, risks, tests, acceptance criteria.

**Checkpoint 1: wait for approval before editing.**

### Phase 1 — Foundation and MVP

After approval:

- Establish the approved folder and application shell.
- Create the design tokens, base layout, responsive navigation, grade chooser, Bolt SVG mascot with several original expressions, hash-based/static-safe routing, and safe relative paths.
- Build the content schema/index and the reusable lesson renderer.
- Implement progress store with versioning and safe fallback, quiz foundation, and accessible pointer/tap/key interaction primitives.
- MVP lesson content: A1 “Meet the Computer” and B2 “Input and Output Devices”, each fully functional with a meaningful interactive activity, feedback, a short quiz, and a completion state.
- Add only the smallest amount of infrastructure needed. Service-worker/PWA, extensive CI, worksheets for every lesson, and optional monthly monitoring may be staged later if they threaten MVP quality.

**Acceptance:** both sample lessons work locally; nested paths use correct relative assets; touch/keyboard alternatives are present; no broken controls; mobile/tablet/desktop layout has been reviewed; core tests pass; no existing site files were changed.

**Checkpoint 2: show a local browser walkthrough and test report. Wait for approval before expanding scope or publishing.**

### Phase 2 — Complete Little Explorers (A2–A7)

Add the remaining UKG lessons, picture-first activities, available speech affordances, mouse/keyboard practice, and lesson badges.

**Acceptance:** a pre-reader can navigate lessons primarily through clear pictures/taps with optional narration where available; every activity has retry and accessible alternatives; primary targets meet the planned UKG size goal.

**Checkpoint 3: show all UKG lessons and evidence; wait for approval.**

### Phase 3 — Complete Tech Champions (B1 and B3–B12)

Add the remaining Class 4 lessons, exploded-view illustration, OS simulation, typing, file/folder sandbox, safe internet scenarios, history timeline, quizzes, Champion Challenge, and optional certificate.

**Acceptance:** every lesson has clear teaching, a real practice activity, a quiz with explanations, and a recap; simulations do not interact with real OS files/settings; certificate prints cleanly on A4; uncertain facts are flagged for review.

**Checkpoint 4: show walkthrough and tests; wait for approval.**

### Phase 4 — Parent/Teacher area, worksheets, PWA, and polish

Add the grown-ups guide, privacy explanation, printable worksheets, credits, trophy shelf, final responsive/accessibility pass, and only the approved optional PWA/offline enhancements.

**Acceptance:** print styles are usable, privacy behaviour matches the documentation, reduced motion works, all new controls and offline scenarios are tested, assets are credited, and documentation is current.

**Checkpoint 5: obtain approval of final release candidate.**

### Phase 5 — Final verification and deployment readiness

- Run all relevant quality gates and inspect the diff.
- Confirm that changes outside `utilities/kids-computer-lab/` are only those separately approved.
- Produce release notes, final screenshots, actual test results, known limitations, and exact deployment steps.
- Verify the intended Pages path and publishing workflow.
- Ask for explicit approval before pushing or publishing.
- After authorised deployment, inspect the actual workflow result and perform live-site smoke tests against the published nested URL.

**Checkpoint 6: publish only after explicit approval; report the live URL only after testing it.**

## 14. Quality targets and honest reporting

Use measurable acceptance criteria. Recommended targets include:

- No broken internal links or missing required assets.
- No serious/critical automated accessibility findings; manually inspect core journeys.
- Zero unintended cross-origin requests from the application and no cookies/tracking.
- No uncaught console errors during core journeys in the tested browser.
- Core first-load payload around or below 1.5 MB where practical.
- Lighthouse mobile targets: Performance ≥90, Accessibility 100, Best Practices ≥95, SEO ≥90, where test conditions permit.
- Core flows tested at 360px, 768px, 1024px, and 1440px widths.
- All progress, scoring, reset, certificate eligibility, and sound state driven by actual application state.

If a target is missed, explain why, distinguish a product defect from a testing-environment limitation, and suggest the smallest useful fix. Do not claim a score, test, browser, or deployment was verified without evidence.

## 15. Persistent Antigravity rules and repeatable workflows

After approval of Phase 0, create a project `AGENTS.md` inside `utilities/kids-computer-lab/` and use only configuration formats supported by the installed Antigravity version. If a different supported instructions file is appropriate, explain the choice before creating alternatives.

The rules file must require the agent to:

- Read `AGENTS.md` and `README.md` before future work.
- Never edit the parent portal or files outside the approved scope without permission.
- Keep content in lesson data files rather than hard-coding lesson copy in JavaScript.
- Use local assets/relative URLs; no runtime frameworks, CDNs, trackers, external APIs, or personal-data collection.
- Support pointer/touch and keyboard alternatives for every relevant interaction.
- Support reduced motion and sound-off operation.
- Preserve schema and stable lesson IDs; migrate stored-progress formats safely.
- Update content review, curriculum map, tests, credits, and changelog when relevant.
- Flag facts not yet verified and never claim unverified CBSE alignment.
- Run relevant tests and report what did and did not run.
- Ask the owner before scope expansion, dependency changes, outside-folder changes, external links, repository setting changes, commit/push, or deployment.

Where supported, create reusable Antigravity workflows; otherwise create Markdown runbooks under `docs/workflows/`. Do not promise a custom slash command unless it is supported by the installed version.

Recommended workflows:

1. **Plan:** read the repo and produce or update the plan with no edits until approval.
2. **Implement phase:** change only the approved scope, run relevant tests, report a diff.
3. **Add lesson:** validate schema/data, add or update assets/credits, map objectives, run tests, update changelog and review status.
4. **Verify site:** run content checks, internal link checks, browser journeys, responsive/accessibility checks, and privacy checks.
5. **Release Pages:** verify configuration and base paths, produce a release checklist, request approval, publish only when authorised, and test the live URL afterward.
6. **Maintenance review:** inspect failing checks, broken links/assets, content gaps, asset licences, cache version, and accessibility regressions; propose fixes and wait before high-impact changes.

## 16. Monitoring and maintenance

Maintain the website as a living educational product, not a one-time mock-up.

- Keep `CHANGELOG.md` in a consistent format and record user-visible changes.
- Maintain `docs/CURRICULUM_MAP.md`, `docs/content-review.md`, `docs/TEST_PLAN.md`, `docs/DECISIONS.md`, and `docs/MAINTENANCE.md`.
- Use versioned local progress data and implement a migration function if its schema changes.
- If a service worker is implemented, update cache versioning as part of a release and test cache invalidation/update messaging.
- Offer a monthly health-check GitHub Action only as a planned, optional enhancement. It may check links/assets, tests, accessibility, and performance and produce a report. Ask before creating scheduled workflows, granting permissions, creating GitHub issues automatically, or enabling any workflow that writes outside its own report artifacts.
- Do not claim continuous monitoring unless a real monitor is configured and its operation has been verified.
- Review licences and attribution when assets change; do a periodic asset/licence audit.
- For every meaningful change, report what changed, why, files touched, tests actually run, results, known limitations, and next recommended task.

## 17. Required project documentation

Create real, project-specific documentation as appropriate to the approved scope:

- `README.md`: purpose, learner tracks, local run method, file layout, test commands, expected URL, deployment steps, and maintenance entry points.
- `docs/ARCHITECTURE.md`: data flow, reusable components, schema, routing, storage, assets, and decisions.
- `docs/CURRICULUM_MAP.md`: lesson objectives, grade, prerequisites, vocabulary, activities, assessment, status, and alignment/reference notes.
- `docs/content-review.md`: fact review status, sources checked, reviewer/date where known, and open questions.
- `docs/TEST_PLAN.md`: test cases, expected/observed outcomes, actual run dates, browser/environment, skipped tests, and known issues.
- `docs/DEPLOYMENT.md`: verified Pages settings, nested base path, release/rollback instructions, and troubleshooting.
- `docs/MAINTENANCE.md`: adding lessons, test process, storage migrations, asset review, release process, and health checks.
- `docs/DECISIONS.md`: concise records of significant decisions and rationale.
- `CREDITS.md` and/or `assets/ASSETS.md`: asset origins, licence and attribution, plus identification of original assets.
- `CHANGELOG.md`: meaningful changes and release notes.

Do not generate empty placeholder documents just to satisfy a list. Documentation should describe the implementation that actually exists.

## 18. Definition of done

A first release is ready only when all applicable conditions are met:

- [ ] Hosting path and deployment approach were inspected and approved.
- [ ] The Kids Computer Lab application is isolated from and does not damage the existing exam-prep portal.
- [ ] The landing page and both learning tracks work at the verified target path.
- [ ] The agreed first-release lessons contain accurate explanations, meaningful visuals, an actual interactive activity, feedback, and a check for understanding.
- [ ] The lesson-data schema and validator work; lesson additions do not require unnecessary bespoke renderer code.
- [ ] Essential activities support pointer/touch and keyboard-accessible alternatives.
- [ ] Reduced motion, mute/no-audio, and missing speech support are handled gracefully.
- [ ] Local progress, reset, profile separation (if implemented), and storage failure behave as documented.
- [ ] The site works at phone, tablet, and desktop sizes.
- [ ] Accessibility, child-safety, privacy, asset licensing, and educational accuracy have been reviewed.
- [ ] No unnecessary trackers, external runtime dependencies, cookies, or personal-data collection exist.
- [ ] Relevant tests have been run; actual outcomes and limitations are documented.
- [ ] Print layouts work if certificates/worksheets are in the release.
- [ ] PWA/offline behaviour is tested if it is included.
- [ ] Deployment instructions and expected URL are documented.
- [ ] Publication was authorised and the real live site tested, if deployment was in scope.
- [ ] The owner received a handoff summary and prioritised follow-up backlog.

## 19. Required checkpoint and final reports

At each checkpoint, report:

1. **Completed:** what actually exists and works.
2. **Files changed:** exact paths and reason.
3. **Tests:** commands/browser flows actually executed and their results.
4. **Evidence:** plan/walkthrough artifacts and screenshots where supported.
5. **Open issues:** incomplete lessons, bugs, unsupported browsers, failed or skipped tests, and known limitations.
6. **Next phase:** smallest sensible next step.
7. **Approval needed:** the specific action or decision required before continuing.

At final handoff include the verified live URL only if the site is published and has been tested. Otherwise give the expected URL and precise owner-run deployment steps. Include commands for local testing, curriculum completion status, remaining tasks, maintenance workflow, and rollback guidance.

## 20. First action

Start **Phase 0 now**. Inspect the repository and existing `/utilities/` site in read-only mode. Report findings, verify whether the proposed nested target path is compatible with the current Pages setup, and present the design-system proposal, architecture plan, phased task list, acceptance criteria, risks, and testing strategy.

**Stop at Checkpoint 1. Do not edit files, create workflows, change settings, commit, push, or deploy until the plan is explicitly approved.**

# MASTER PROMPT — END
