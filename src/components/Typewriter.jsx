import { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 60 }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, speed);

    return () => window.clearInterval(timer);
  }, [speed, text]);

  return (
    <span>
      {visibleText}
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
