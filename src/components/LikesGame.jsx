import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LikesGame({ options, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <section className="screen-content">
      <p className="eyebrow">Маленький вопрос</p>
      <h2 className="font-serif screen-title">
        Что тебе во мне нравится больше всего?
      </h2>
      <div className="options-grid">
        {options.map((option, index) => (
          <motion.button
            key={option.label}
            className={`button option-button ${
              selectedOption?.label === option.label ? "is-selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
      <div className="reply-area" aria-live="polite">
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.p
              className="reply-message"
              key={selectedOption.reply}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {selectedOption.reply}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <button
        className="button button-primary"
        onClick={onNext}
        disabled={!selectedOption}
      >
        А теперь помечтаем <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
