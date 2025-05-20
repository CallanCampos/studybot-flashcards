import os
import pdfplumber
from docx import Document

def parse_document(file_path: str) -> str:
    """Read text content from a PDF, DOCX, or TXT file."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    ext = os.path.splitext(file_path)[1].lower()
    text = ""

    if ext == ".pdf":
        # Extract text from PDF using pdfplumber
        with pdfplumber.open(file_path) as pdf:
            text = "\n".join([page.extract_text() or "" for page in pdf.pages])
    elif ext == ".docx":
        # Extract text from Word (DOCX) using python-docx
        doc = Document(file_path)
        paragraphs = [para.text for para in doc.paragraphs]
        text = "\n".join(paragraphs)
    elif ext == ".txt":
        # Read text directly from a .txt file
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
    else:
        raise ValueError("Unsupported file format. Please use PDF, DOCX, or TXT.")

    return text