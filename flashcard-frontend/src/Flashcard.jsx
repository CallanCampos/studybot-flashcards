import { useState } from "react";

export default function Flashcard({ q, a }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer transform
                 hover:scale-[1.02] transition"
      onClick={() => setShow((s) => !s)}
    >
      <p className="font-semibold">{q}</p>
      {show && <p className="mt-2 text-gray-700">{a}</p>}
      {!show && <p className="mt-2 text-blue-500 italic">Click to reveal answer</p>}
    </div>
  );
}
