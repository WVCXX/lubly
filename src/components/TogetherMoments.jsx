import { motion } from "framer-motion";

export default function TogetherMoments({ title, intro, moments, onNext }) {
  return (
    <section className="screen-content together-content">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Я представляю наше завтра
      </motion.p>
      <motion.h2
        className="font-serif screen-title together-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="together-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {intro}
      </motion.p>
      <div className="together-grid">
        {moments.map((moment, index) => (
          <motion.article
            className="together-card"
            key={moment.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.09, duration: 0.45 }}
          >
            <span className="together-icon" aria-hidden="true">
              {moment.icon}
            </span>
            <div>
              <h3 className="font-serif">{moment.title}</h3>
              <p>{moment.text}</p>
            </div>
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
        Есть ещё кое-что важное <span aria-hidden="true">→</span>
      </motion.button>
    </section>
  );
}
