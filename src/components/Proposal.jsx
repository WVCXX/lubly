import { useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const noTexts = ["Нет", "Ты уверена?", "Подумай ещё", "Ну пожалуйста", "Блин"];

export default function Proposal({ onYes }) {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const playAreaRef = useRef(null);
  const noButtonRef = useRef(null);
  const isGone = attempts >= noTexts.length;

  const escape = () => {
    const area = playAreaRef.current;
    const button = noButtonRef.current;
    if (!area || !button || isGone) return;

    const areaRect = area.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const maxX = Math.max(0, areaRect.width - buttonRect.width);
    const maxY = Math.max(0, areaRect.height - buttonRect.height);
    const nextX = Math.random() * maxX;
    const nextY = Math.random() * maxY;
    const nextAttempt = attempts + 1;
    const centeredX = maxX / 2;
    const centeredY = maxY / 2;

    setPosition({
      x: Math.min(maxX, Math.max(0, nextX)) - centeredX,
      y: Math.min(maxY, Math.max(0, nextY)) - centeredY,
    });
    setAttempts(nextAttempt);
  };

  const accept = () => {
    confetti({
      particleCount: 220,
      spread: 100,
      startVelocity: 42,
      origin: { y: 0.62 },
      colors: ["#ff4d88", "#ff9ec4", "#ffd6e8", "#ffffff"],
    });
    onYes();
  };

  return (
    <section className="screen-content">
      <motion.div
        className="proposal-heart"
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        💖
      </motion.div>
      <p className="eyebrow">У меня есть один самый важный вопрос</p>
      <h2 className="font-serif proposal-title">Ты будешь моей девушкой?</h2>
      <button className="button button-yes glow-pulse" onClick={accept}>
        Да ❤️
      </button>
      <div className="no-play-area" ref={playAreaRef}>
        {!isGone ? (
          <motion.button
            ref={noButtonRef}
            className="button button-secondary no-button"
            style={{ left: "calc(50% - 72px)", top: "calc(50% - 24px)" }}
            initial={{ x: 0, y: 0 }}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            onMouseEnter={escape}
            onClick={escape}
          >
            {noTexts[Math.min(attempts, noTexts.length - 1)]}
          </motion.button>
        ) : (
          <motion.p
            className="no-gone-message"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Ладно, остался только один вариант 
          </motion.p>
        )}
      </div>
    </section>
  );
}
