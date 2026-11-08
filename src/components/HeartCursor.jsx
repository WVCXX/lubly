import { useEffect, useState } from "react";

export default function HeartCursor() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none)");
    if (mediaQuery.matches) return undefined;

    let nextId = 0;
    const handleMove = (event) => {
      const heart = {
        id: nextId++,
        x: event.clientX,
        y: event.clientY,
      };
      setHearts((current) => [...current.slice(-11), heart]);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="cursor-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          className="cursor-heart"
          key={heart.id}
          style={{ left: heart.x, top: heart.y }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
