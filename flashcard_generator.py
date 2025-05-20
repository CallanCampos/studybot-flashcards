import re
from transformers import pipeline

# Initialize the Hugging Face QA pipeline with the SQuAD model
qa_pipeline = pipeline(
    "question-answering", 
    model="bert-large-uncased-whole-word-masking-finetuned-squad"
)

def generate_flashcards(text: str):
    """Generate flashcard Q&A pairs from the given text."""
    flashcards = []
    if not text:
        return flashcards

    # Split text into lines, then further split each line into sentences
    lines = text.splitlines()
    for line in lines:
        # Further split by sentence-ending punctuation if needed
        sentences = re.split(r'(?<=[.?!])\s+', line)
        for sentence in sentences:
            s = sentence.strip()
            if len(s) < 5:
                continue
            question = None
            answer_text = None
            if " is " in s:
                parts = s.split(" is ", 1)
                if len(parts) >= 2:
                    subject, predicate = parts[0].strip(), parts[1].strip()
                    if subject and predicate:
                        question = f"What is {subject}?"
                        answer_text = predicate
            elif " are " in s:
                parts = s.split(" are ", 1)
                if len(parts) >= 2:
                    subject, predicate = parts[0].strip(), parts[1].strip()
                    if subject and predicate:
                        question = f"What are {subject}?"
                        answer_text = predicate
            if question:
                try:
                    result = qa_pipeline(question=question, context=s)
                    answer = result.get('answer', '').strip()
                except Exception as e:
                    answer = answer_text.split('.')[0].strip() if answer_text else ''
                answer = answer.rstrip(". ")
                if answer:
                    flashcards.append({"question": question, "answer": answer})
    return flashcards