import { memo, useMemo } from "react";
import { motion } from "framer-motion";

function HeartsBg() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        size: 12 + Math.random() * 20,
        duration: 9 + Math.random() * 11,
        delay: Math.random() * 10,
        drift: -35 + Math.random() * 70,
      })),
    [],
  );

  return (
    <div className="hearts-bg" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="floating-heart"
          style={{ left: heart.left, fontSize: heart.size }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-12vh",
            x: [0, heart.drift, 0],
            opacity: [0, 0.42, 0.42, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}

export default memo(HeartsBg);
