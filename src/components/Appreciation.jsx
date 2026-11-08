import { motion } from "framer-motion";

export default function Appreciation({ intro, notes, onNext }) {
  return (
    <section className="screen-content appreciation-content">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Мне хочется, чтобы ты знала
      </motion.p>
      <motion.h2
        className="font-serif screen-title appreciation-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        За что я так тебя ценю
      </motion.h2>
      <motion.p
        className="appreciation-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {intro}
      </motion.p>
      <div className="appreciation-grid">
        {notes.map((note, index) => (
          <motion.article
            className="appreciation-card"
            key={note.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.1, duration: 0.45 }}
          >
            <span className="appreciation-icon" aria-hidden="true">
              {note.icon}
            </span>
            <h3 className="font-serif">{note.title}</h3>
            <p>{note.text}</p>
          </motion.article>
        ))}
      </div>
      <motion.button
        className="button button-primary"
        onClick={onNext}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        Теперь небольшой вопрос <span aria-hidden="true">→</span>
      </motion.button>
    </section>
  );
}
