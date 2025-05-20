import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiRotateCw } from "react-icons/fi";

export default function Flashcard({ q, a }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const flip = {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { rotateY: 0, opacity: 1 },
  };

  return (
    <div
      className="perspective-[1000px] cursor-pointer select-none"
      onClick={() => setShowAnswer((s) => !s)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!showAnswer ? (
          <motion.div
            key="question"
            variants={flip}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4 }}
            className="glass p-8 h-48 flex flex-col justify-center items-center"
          >
            <p className="text-lg font-semibold">{q}</p>
            <p className="mt-3 text-primary-600 flex items-center gap-1">
              Click to reveal <FiRotateCw className="inline" />
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            variants={flip}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4 }}
            className="glass p-8 h-48 flex flex-col justify-center items-center"
          >
            <p className="text-primary-600 mb-2 uppercase tracking-wide text-sm">
              Answer
            </p>
            <p className="text-lg leading-snug text-center whitespace-pre-wrap">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
