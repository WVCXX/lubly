import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Gallery({ photos, onNext }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const photo = photos[photoIndex];

  const showPrevious = () => {
    setPhotoIndex((index) => Math.max(0, index - 1));
    setImageFailed(false);
  };

  const showNext = () => {
    if (photoIndex === photos.length - 1) {
      onNext();
      return;
    }
    setPhotoIndex((index) => index + 1);
    setImageFailed(false);
  };

  return (
    <section className="screen-content gallery-content">
      <p className="eyebrow">Несколько моментов, которые я храню</p>
      <div className="gallery-frame">
        <AnimatePresence mode="wait">
          <motion.figure
            className="gallery-figure"
            key={photo.src}
            initial={{ opacity: 0, scale: 1.1, x: 28 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -28 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {!imageFailed ? (
              <img
                className="gallery-photo"
                src={`${import.meta.env.BASE_URL}${photo.src.replace(/^\/+/, "")}`}
                alt={photo.caption}
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="photo-placeholder" role="img" aria-label={photo.caption}>
                <span aria-hidden="true">📷</span>
                <small>Добавь фото в public{photo.src}</small>
              </div>
            )}
            <figcaption className="gallery-caption font-serif">
              {photo.caption}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <p className="gallery-count" aria-live="polite">
        {photoIndex + 1} / {photos.length}
      </p>
      <div className="button-row">
        <button
          className="button button-secondary"
          onClick={showPrevious}
          disabled={photoIndex === 0}
          aria-label="Предыдущее фото"
        >
          ← <span className="button-label">Назад</span>
        </button>
        <button className="button button-primary" onClick={showNext}>
          {photoIndex === photos.length - 1 ? "Дальше" : "Дальше"}{" "}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
