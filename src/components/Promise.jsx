import { motion } from "framer-motion";

export default function Promise({ intro, promises, onNext }) {
  return (
    <section className="screen-content promise-content">
      <motion.span
        className="promise-heart"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        💌
      </motion.span>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        От меня — тебе
      </motion.p>
      <motion.h2
        className="font-serif screen-title promise-title"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Моё обещание
      </motion.h2>
      <motion.p
        className="promise-intro font-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {intro}
      </motion.p>
      <div className="promise-list">
        {promises.map((promise, index) => (
          <motion.p
            className="promise-item"
            key={promise}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.14 }}
          >
            <span aria-hidden="true">♡</span>
            {promise}
          </motion.p>
        ))}
      </div>
      <motion.button
        className="button button-primary glow-pulse"
        onClick={onNext}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        Можно задать вопрос <span aria-hidden="true">→</span>
      </motion.button>
    </section>
  );
}
