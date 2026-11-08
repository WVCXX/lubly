const screens = ["intro", "gallery", "gratitude", "likes", "proposal"];

export default function ProgressDots({ currentScreen }) {
  const activeIndex = screens.indexOf(currentScreen);
  if (activeIndex === -1) return null;

  return (
    <nav className="progress-dots" aria-label="Прогресс истории">
      {screens.map((screen, index) => (
        <span
          key={screen}
          className={`progress-dot ${
            index === activeIndex
              ? "is-active"
              : index < activeIndex
                ? "is-complete"
                : ""
          }`}
          aria-current={index === activeIndex ? "step" : undefined}
        />
      ))}
    </nav>
  );
}
