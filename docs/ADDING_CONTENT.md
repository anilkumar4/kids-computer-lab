# How to Add More Content

The Kids Computer Lab is built with a **Data-Driven Architecture**. This means you do NOT need to write complex JavaScript or HTML to add new lessons. You only need to create a simple JSON file!

## Step 1: Create a Lesson File
1. Go to the `data/lessons/` folder.
2. Create a new `.json` file (e.g., `a8.json`).
3. You can copy an existing file like `a1.json` as a starting point.
4. Fill in the required fields: `id`, `title`, `summary`, and `steps`.

## Step 2: Use the Available Step Types
Each lesson is made of a sequence of "steps". You can mix and match these types:
- **`story`**: Shows text, a picture, or bullet points.
- **`quiz`**: Multiple choice or picture-choice questions.
- **`sort`**: A drag-and-drop / click-to-match game.
- **`hotspot`**: An image with clickable points of interest.
- **`mouseGame`**: A sandbox for clicking and dragging practice.
- **`typing`**: A virtual keyboard for finding letters.
- **`recap`**: A summary of what was learned.

*(Tip: Look at `data/schema/lesson.schema.json` to see exactly what fields each step type supports!)*

## Step 3: Register the Lesson
1. Open `data/lesson-index.json`.
2. Find the track you want to add the lesson to (e.g., `"id": "explorers"`).
3. Add your new lesson to the `"lessons"` array:
```json
{
  "id": "a8",
  "title": "My New Lesson",
  "summary": "This is a brand new lesson.",
  "status": "published"
}
```

That's it! Refresh your browser and the new lesson will instantly appear in the app!
