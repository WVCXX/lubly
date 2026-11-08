import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DateIdeas({ intro, ideas, onNext }) {
  const [selectedIdea, setSelectedIdea] = useState(null);

  return (
    <section className="screen-content date-ideas-content">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Я кое о чём мечтаю
      </motion.p>
      <motion.h2
        className="font-serif screen-title date-ideas-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Однажды мы...
      </motion.h2>
      <motion.p
        className="date-ideas-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {intro}
      </motion.p>
      <div className="date-ideas-grid">
        {ideas.map((idea, index) => (
          <motion.button
            type="button"
            className={`date-idea-card ${
              selectedIdea?.title === idea.title ? "is-selected" : ""
            }`}
            key={idea.title}
            onClick={() => setSelectedIdea(idea)}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.08 }}
            aria-pressed={selectedIdea?.title === idea.title}
          >
            <span className="date-idea-icon" aria-hidden="true">
              {idea.icon}
            </span>
            <span className="date-idea-title">{idea.title}</span>
            <span className="date-idea-text">{idea.text}</span>
          </motion.button>
        ))}
      </div>
      <div className="date-idea-reply" aria-live="polite">
        <AnimatePresence mode="wait">
          {selectedIdea && (
            <motion.p
              key={selectedIdea.reply}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {selectedIdea.reply}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <motion.button
        className="button button-primary"
        onClick={onNext}
        disabled={!selectedIdea}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        Хочу ещё немного помечтать <span aria-hidden="true">→</span>
      </motion.button>
    </section>
  );
}
