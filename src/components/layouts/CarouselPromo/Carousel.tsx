import { useEffect, useRef, useState } from "react";
import styles from "./CarouselPromo.module.css";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

export type Slide = { src: string; alt?: string };

type CarouselProps = {
  slide: Slide[];
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
};

export const Carousel = ({
  slide,
  autoPlay = true,
  interval = 4000,
  loop = true,
}: CarouselProps) => {
  const autoplay = useRef(
    Autoplay({ delay: interval, stopOnFocusIn: false, stopOnMouseEnter: false })
  );

  const [viewportRef, embla] = useEmblaCarousel(
    {
      loop,
      align: "start",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      dragFree: false,
    },
    autoPlay ? [autoplay.current] : []
  );

  const [index, setIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!embla) return;

    const onSelect = () => setIndex(embla.selectedScrollSnap());
    const onInitOrReInit = () => setScrollSnaps(embla.scrollSnapList());

    embla.on("select", onSelect);
    embla.on("init", onInitOrReInit);
    embla.on("reInit", onInitOrReInit);

    onInitOrReInit();
    onSelect();

    if (autoPlay) autoplay.current.play();
    return () => {
      if (autoPlay) autoplay.current.stop();
      embla.off("select", onSelect);
      embla.off("init", onInitOrReInit);
      embla.off("reInit", onInitOrReInit);
    };
  }, [embla, autoPlay]);

  const goTo = (i: number) => embla?.scrollTo(i);

  return (
    <>
      <div className={styles.carousel_section}>
        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.container}>
            {slide.map((image, i) => (
              <div className={styles.slide} key={i}>
                <img
                  className={styles.img}
                  src={image.src}
                  alt={image.alt ?? ""}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {scrollSnaps.length > 1 && (
        <div
          className={styles.dots}
          role="tablist"
          aria-label="Carousel Pagination"
        >
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${
                i === index ? styles.dot_active : ""
              }`}
              onClick={() => goTo(i)}
              role="tab"
              aria-label={`Перейти к слайду ${i + 1}`}
              aria-selected={i === index}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </>
  );
};
