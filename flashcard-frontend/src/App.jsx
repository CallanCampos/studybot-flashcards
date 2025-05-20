import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Flashcard from "./Flashcard";
import { FiUploadCloud, FiMoon, FiSun } from "react-icons/fi";

export default function App() {
  const [file, setFile] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  /* ── keep the <html> element in sync with dark mode ── */
  useEffect(() => {
    const root = document.documentElement; // <html>
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const { data } = await axios.post(
        "http://127.0.0.1:8000/flashcards",
        form
      );
      setCards(data.flashcards);
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center py-12 px-6">
      {/* ── background cross-fade ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dark ? "dark" : "light"}
          className={
            dark
              ? "fixed inset-0 -z-10 bg-zinc-900"
              : "fixed inset-0 -z-10 bg-gradient-to-b from-primary-50 via-purple-50 to-pink-50"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* ── top bar ───────────────────────────────────────── */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          StudyBot Flashcards
        </h1>

        <button
          aria-label="Toggle theme"
          onClick={() => setDark((d) => !d)}
          className="text-xl p-2 rounded-full glass hover:rotate-12 transition"
        >
          {dark ? <FiSun /> : <FiMoon />}
        </button>
      </header>

      {/* ── uploader panel ───────────────────────────────── */}
      <div className="glass w-full max-w-md p-8 mb-10">
        <label className="flex items-center gap-3 cursor-pointer">
          <FiUploadCloud className="text-2xl shrink-0" />
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <span className="truncate">
            {file ? file.name : "Choose a PDF, Word, or text file"}
          </span>
        </label>

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="mt-6 w-full bg-primary-600 hover:bg-primary-500 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-40 transition"
        >
          {loading ? "Generating…" : "Generate flashcards"}
        </button>

        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* ── flashcard grid ───────────────────────────────── */}
      {cards.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {cards.map((c, i) => (
            <Flashcard key={i} q={c.question} a={c.answer} />
          ))}
        </div>
      )}
    </div>
  );
}
