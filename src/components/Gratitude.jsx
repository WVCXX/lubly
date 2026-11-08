import { motion } from "framer-motion";

export default function Gratitude({ gratitudeText, onNext }) {
  return (
    <section className="screen-content">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        От всего сердца
      </motion.p>
      <motion.h2
        className="font-serif gratitude-text"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        {gratitudeText}
      </motion.h2>
      <motion.button
        className="button button-primary"
        onClick={onNext}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        И ещё кое-что...
      </motion.button>
    </section>
  );
}
