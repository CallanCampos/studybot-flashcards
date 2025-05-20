# StudyBot Flashcards

Generate interactive study flashcards from your own notes in seconds.  
Upload a **PDF, DOCX, or TXT** file → StudyBot extracts the text, runs an AI question-answer model, and returns a deck of Q-A flashcards you can flip through in a sleek web UI with light/dark themes.

---

## ✨  Features

| Backend (FastAPI) | Front-End (React + Tailwind) |
| ----------------- | ---------------------------- |
| 🔍 Parses PDF, Word, and plain-text files | 🎨 Modern glassmorphism design & theme toggle |
| 🧠 Uses `bert-large-uncased-whole-word-masking-finetuned-squad` to build Q-A pairs | 🌙 Smooth dark-mode cross-fade animation |
| 🔌 Single **POST /flashcards** endpoint returns JSON | 🃏 Flashcards flip with 3-D animation (Framer Motion) |
| 🐳 One-command Docker build | ⚡️ Vite dev server for instant reloads |

---

Upload a file, click **Generate flashcards**, and start studying!

---

## 🛠️  Local Development

### 1. Back-End (Python 3.11)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
cd flashcard-frontend
npm run dev
```

Dependencies:

* `transformers` 4.28
* `torch` 2.0
* `pdfplumber`, `python-docx`, `fastapi`, `uvicorn`

### 2. Front-End (Vite + React 18)

```bash
cd client
npm install
npm run dev
```

Tailwind config is already wired up; the dark-mode state syncs to `<html>`.

---

## 📑  API

| Method | Path          | Body                                | Response                                                            |
| ------ | ------------- | ----------------------------------- | ------------------------------------------------------------------- |
| `POST` | `/flashcards` | `multipart/form-data` with **file** | `{ "flashcards": [ { "question": "...", "answer": "..." }, ... ] }` |

* Supported file types: **.pdf**, **.docx**, **.txt**
* Returns **HTTP 422** if no flashcards could be generated.

---

## 🗂️  Project Structure

```
.
├── app.py                 # FastAPI entrypoint
├── flashcard_generator.py # BERT QA pipeline & heuristics
├── parser_utils.py        # PDF/DOCX/TXT text extraction
├── requirements.txt
├── Dockerfile
└── client/                # React front-end (Vite)
    ├── src/
    │   ├── App.jsx
    │   ├── Flashcard.jsx
    │   └── index.css
    └── ...
```

---

## Limitations

Currently, the study bot only looks for sentences that contain definitional phrases like "X is Y" or "X are Y". These often indicate a flashcard-worthy fact (where X is a concept and Y is an explanation or definition).

---

## 🤝  Contributing

1. Fork the repo and create your branch: `git checkout -b feature/my-idea`
2. Run `npm run lint && pytest` locally—no lint/test errors, please.
3. Commit with conventional commits (`feat: add …`, `fix: resolve …`).
4. Open a pull request describing **what** you changed and **why**.

We welcome issues and PRs that improve parsing accuracy, UI polish, or add features like spaced-repetition scheduling!

---

> Happy learning! 🎓
