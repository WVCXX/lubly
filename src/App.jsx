import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "./components/Envelope.jsx";
import Gallery from "./components/Gallery.jsx";
import Gratitude from "./components/Gratitude.jsx";
import HeartsBg from "./components/HeartsBg.jsx";
import HeartCursor from "./components/HeartCursor.jsx";
import Intro from "./components/Intro.jsx";
import LikesGame from "./components/LikesGame.jsx";
import ProgressDots from "./components/ProgressDots.jsx";
import Proposal from "./components/Proposal.jsx";
import YesScreen from "./components/YesScreen.jsx";
import { gratitudeText, herName, likesOptions, photos } from "./data.js";

const screenVariants = {
  initial: { opacity: 0, scale: 1.05, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(6px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const screenOrder = ["intro", "gallery", "gratitude", "likes", "proposal"];

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [history, setHistory] = useState(["intro"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [backNavigationEnabled, setBackNavigationEnabled] = useState(false);
  const pointerStart = useRef(null);
  const touchStart = useRef(null);
  const lastWheelNavigation = useRef(0);

  const navigateTo = (nextScreen) => {
    const nextHistory = [...history.slice(0, historyIndex + 1), nextScreen];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setScreen(nextScreen);
  };

  const advance = () => {
    const index = screenOrder.indexOf(screen);
    if (index >= 0 && index < screenOrder.length - 1) {
      navigateTo(screenOrder[index + 1]);
    }
  };

  const goBack = () => {
    if (!backNavigationEnabled || historyIndex === 0) return;
    const previousIndex = historyIndex - 1;
    setHistoryIndex(previousIndex);
    setScreen(history[previousIndex]);
  };

  const handlePointerDown = (event) => {
    if (event.isPrimary && event.pointerType === "mouse") {
      pointerStart.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handlePointerUp = (event) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || event.pointerType !== "mouse" || event.button !== 0) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (deltaX > 80 && deltaX > Math.abs(deltaY)) goBack();
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const swipedRight = deltaX > 80 && deltaX > Math.abs(deltaY);
    const swipedUp = deltaY < -80 && Math.abs(deltaY) > Math.abs(deltaX);
    if (swipedRight || swipedUp) goBack();
  };

  const handleWheel = (event) => {
    const now = Date.now();
    if (
      backNavigationEnabled &&
      event.deltaY < -40 &&
      now - lastWheelNavigation.current > 600
    ) {
      lastWheelNavigation.current = now;
      goBack();
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "intro":
        return <Intro herName={herName} onNext={advance} />;
      case "gallery":
        return <Gallery photos={photos} onNext={advance} />;
      case "gratitude":
        return <Gratitude gratitudeText={gratitudeText} onNext={advance} />;
      case "likes":
        return <LikesGame options={likesOptions} onNext={advance} />;
      case "proposal":
        return <Proposal onYes={() => navigateTo("envelope")} />;
      case "envelope":
        return (
          <Envelope
            onOpen={() => {
              setBackNavigationEnabled(true);
              navigateTo("yes");
            }}
          />
        );
      case "yes":
        return <YesScreen canGoBack={backNavigationEnabled && historyIndex > 0} />;
      default:
        return <Intro herName={herName} onNext={advance} />;
    }
  };

  return (
    <main className="app-shell">
      <HeartsBg />
      <HeartCursor />
      <div
        className="screen-wrap"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
        onWheel={handleWheel}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="screen"
            key={screen}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
      <ProgressDots currentScreen={screen} />
    </main>
  );
}
