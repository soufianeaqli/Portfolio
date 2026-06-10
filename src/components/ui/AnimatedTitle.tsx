"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  highlightText?: string;
  highlightWords?: string[];
}

export default function AnimatedTitle({ text, className = "", highlightText, highlightWords = [] }: AnimatedTitleProps) {
  const words = text.split(" ");

  const isHighlighted = (word: string) => {
    // Check clean words (removing punctuation if needed)
    const cleanWord = word.replace(/[.,!?]/g, "");
    if (highlightText && cleanWord.includes(highlightText)) return true;
    if (highlightWords.includes(cleanWord)) return true;
    return false;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.h2
      className={`font-bold text-white mb-6 ${className}`}
      style={{ perspective: "1000px" }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em]"
        >
          <motion.span
            variants={wordVariants}
            style={{ transformOrigin: "0% 50% -50px" }}
            className={`inline-block ${
              isHighlighted(word) ? "text-red-500" : ""
            }`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
