import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";

export default function YesScreen({ canGoBack }) {
  const cardRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const date = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const endAt = performance.now() + 3000;
    let frameId;
    const celebrate = () => {
      if (performance.now() >= endAt) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 45,
        origin: { x: 0, y: 0.72 },
        colors: ["#ff4d88", "#ff9ec4", "#ffd6e8"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 45,
        origin: { x: 1, y: 0.72 },
        colors: ["#ff4d88", "#ff9ec4", "#ffd6e8"],
      });
      frameId = window.requestAnimationFrame(celebrate);
    };

    frameId = window.requestAnimationFrame(celebrate);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const saveCard = async () => {
    if (!cardRef.current || isSaving) return;
    setIsSaving(true);
    setSaveError("");

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#1d0d20",
        scale: Math.max(2, window.devicePixelRatio || 1),
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = "nasha-istoriya.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Не удалось сохранить карточку:", error);
      setSaveError("Не получилось сохранить карточку. Попробуй ещё раз.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="screen-content yes-screen">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Самый счастливый ответ
      </motion.p>
      <motion.h1
        className="font-serif gradient-text yes-title"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Ты сказала «Да» 💖
      </motion.h1>
      <motion.div
        className="final-card"
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <span className="card-heart" aria-hidden="true">
          ♥
        </span>
        <p className="card-label">Наша история начинается</p>
        <p className="card-date">{date}</p>
        <p className="card-message font-serif">С сегодняшнего дня — мы.</p>
        <span className="card-sparkle" aria-hidden="true">
        </span>
      </motion.div>
      <button
        className="button button-primary"
        onClick={saveCard}
        disabled={isSaving}
      >
        {isSaving ? "Готовим карточку..." : "Сохранить карточку"}
      </button>
      {canGoBack && (
        <p className="swipe-back-hint final-swipe-hint">
          Проведи вверх или вправо, чтобы вернуться к предыдущему этапу
        </p>
      )}
      {saveError && (
        <p className="save-error" role="alert">
          {saveError}
        </p>
      )}
    </section>
  );
}
