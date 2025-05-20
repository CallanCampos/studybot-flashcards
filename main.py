import argparse
import json
from parser_utils import parse_document
from flashcard_generator import generate_flashcards

def main():
    parser = argparse.ArgumentParser(description="Generate flashcards from a document using a QA model.")
    parser.add_argument("-f", "--file", required=True, help="Path to the input document (PDF, DOCX, or TXT).")
    parser.add_argument("-o", "--output", help="Output file to save flashcards (JSON format).")
    args = parser.parse_args()

    # Parse the document to extract raw text
    try:
        text = parse_document(args.file)
    except Exception as e:
        print(f"Error: {e}")
        return

    if not text or text.strip() == "":
        print("No text could be extracted from the document. Please check the file content.")
        return

    # Generate flashcards from the text
    flashcards = generate_flashcards(text)

    if not flashcards:
        print("No flashcards were generated from the document. It may not contain identifiable factual statements.")
        return

    # Output the flashcards
    if args.output:
        # Save to a JSON file
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(flashcards, f, indent=2)
        print(f"Flashcards saved to {args.output}")
    else:
        # Print to console
        print("\nGenerated Flashcards:\n")
        for i, qa in enumerate(flashcards, start=1):
            print(f"{i}. Q: {qa['question']}\n   A: {qa['answer']}\n")

if __name__ == "__main__":
    main()