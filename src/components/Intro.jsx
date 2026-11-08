import { motion } from "framer-motion";
import Typewriter from "./Typewriter.jsx";

export default function Intro({ herName, onNext }) {
  return (
    <section className="screen-content">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Маленькое путешествие для тебя
      </motion.p>
      <motion.h1
        className="font-serif gradient-text intro-title"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
      >
        {herName}, это для тебя
      </motion.h1>
      <motion.p
        className="intro-copy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Typewriter text="Любимая, я давно хотел сказать тебе кое-что важное..." />
      </motion.p>
      <motion.button
        className="button button-primary glow-pulse"
        onClick={onNext}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        Открыть <span aria-hidden="true">→</span>
      </motion.button>
    </section>
  );
}
