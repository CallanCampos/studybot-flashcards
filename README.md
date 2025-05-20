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

## 🚀  Quick Start (Docker)

```bash
# clone the repo
git clone https://github.com/CallanCampos/studybot-flashcards.git
cd studybot-flashcards

# build and run (back-end + model included)
docker build -t studybot .
docker run -p 8000:8000 studybot
````

Visit **`http://localhost:5173`** in a second terminal:

```bash
cd client
npm install
npm run dev
```

Upload a file, click **Generate flashcards**, and start studying!

---

## 🛠️  Local Development

### 1. Back-End (Python 3.11)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
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

## 🤝  Contributing

1. Fork the repo and create your branch: `git checkout -b feature/my-idea`
2. Run `npm run lint && pytest` locally—no lint/test errors, please.
3. Commit with conventional commits (`feat: add …`, `fix: resolve …`).
4. Open a pull request describing **what** you changed and **why**.

We welcome issues and PRs that improve parsing accuracy, UI polish, or add features like spaced-repetition scheduling!

---

> Happy learning! 🎓
