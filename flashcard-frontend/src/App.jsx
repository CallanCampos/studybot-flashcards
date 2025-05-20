import { useState } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";

export default function App() {
  const [file, setFile] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const { data } = await axios.post("http://127.0.0.1:8000/flashcards", form);
      setCards(data.flashcards);
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">StudyBot Flashcards</h1>

      <div className="bg-white shadow rounded-xl p-6 w-full max-w-md">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full
                     file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white
                     font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {cards.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 mt-8 w-full max-w-4xl">
          {cards.map((c, i) => (
            <Flashcard key={i} q={c.question} a={c.answer} />
          ))}
        </div>
      )}
    </div>
  );
}
