from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from parser_utils import parse_document
from flashcard_generator import generate_flashcards

app = FastAPI(title="Flashcard Generator API")

# front-end will come from http://localhost:5173  (Vite default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.post("/flashcards")
async def make_flashcards(file: UploadFile = File(...)):
    """Accept a PDF, DOCX or TXT file and return flashcards as JSON."""
    try:
        contents = await file.read()
        tmp_path = f"/tmp/{file.filename}"
        with open(tmp_path, "wb") as f:
            f.write(contents)
        text = parse_document(tmp_path)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read file: {e}")

    cards = generate_flashcards(text)
    if not cards:
        raise HTTPException(status_code=422, detail="No flashcards generated.")
    return {"flashcards": cards}