import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Envelope({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const openEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    confetti({
      particleCount: 120,
      spread: 78,
      startVelocity: 34,
      origin: { y: 0.58 },
      colors: ["#ff4d88", "#ff9ec4", "#ffd6e8"],
    });
    timeoutRef.current = window.setTimeout(onOpen, 1200);
  };

  return (
    <section className="screen-content envelope-screen">
      <p className="eyebrow">Для тебя есть ещё одно послание</p>
      <button
        className="envelope-button"
        onClick={openEnvelope}
        disabled={isOpen}
        aria-label="Открыть конверт"
      >
        <span className="envelope-back" />
        <motion.span
          className="envelope-flap"
          animate={{ rotateX: isOpen ? -140 : 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="envelope-letter"
          animate={{ y: isOpen ? -34 : 0 }}
          transition={{ duration: 0.6, delay: isOpen ? 0.2 : 0 }}
        >
          💌
        </motion.span>
        <span className="envelope-front" />
      </button>
      <p className="envelope-hint">
        {isOpen ? "С любовью..." : "Нажми, чтобы открыть"}
      </p>
    </section>
  );
}
