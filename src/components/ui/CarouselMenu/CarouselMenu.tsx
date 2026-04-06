"use client";

import { useEffect, useState } from "react";
import styles from "./CarouselMenu.module.css";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { scrollToWithOffset } from "../../../../utils/scrollToWithOffset";
import { category } from "../../../types/cart";
// import { useMenu } from "../../../context/MenuContext";

type CarouselMenuProps = {
  onClick?: () => void;
  slidesPerView?: number;
  peek?: number;
  gap?: number;
  loop?: boolean;
  dragFree?: boolean;
  showArrows?: boolean;
  onSelectIndexChange?: (index: number, embla: EmblaCarouselType) => void;
  options?: EmblaOptionsType;
};

export default function CarouselMenu({
  slidesPerView = 4,
  peek = 12,
  gap = 12,
  loop = false,
  dragFree = true,
  showArrows = true,
  onSelectIndexChange,
  options,
  headerOffset = 72,
}: CarouselMenuProps & { headerOffset?: number }) {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    loop,
    dragFree,
    skipSnaps: false,
    ...options,
  });

  // const { categories } = useMenu();
  const [categories, setCategories] =useState<category[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!embla) return;

    const updateButtons = () => {
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
    };

    const onSelect = () => {
      updateButtons();
      onSelectIndexChange?.(embla.selectedScrollSnap(), embla);
    };

    embla.on("select", onSelect);
    embla.on("reInit", updateButtons);
    updateButtons();

    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", updateButtons);
    };
  }, [embla, onSelectIndexChange]);



  useEffect(()=>{
    async function loadCategories(){
      try{
        const response = await fetch("http://localhost:4000/api/categories")
        if(!response.ok) throw new Error("Ошибка загрузки каруселя меню - " + response.status)
        
        const data =await response.json()
        setCategories(data)

      }catch(e){
        console.error(e)
      }
    }

    loadCategories()
  }, [])

  const styleVars: React.CSSProperties = {
    // @ts-expect-error CSS var
    "--slides-per-view": String(slidesPerView),
    "--viewport-peek": `${peek}px`,
    "--slide-gap": `${gap}px`,
  };

  return (
    <div className={`${styles.wrapper} ${styles.sticky}`} style={styleVars}>
      {showArrows && (
        <button
          className={styles.arrow}
          aria-label="Назад"
          onClick={() => embla?.scrollPrev()}
          disabled={!canScrollPrev}
        >
          ‹
        </button>
      )}

      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.container}>
          {categories.map((category) => {
            const content = (
              <div className={styles.cardInner}>

                <span className={styles.label}>{category.category_name}</span>
              </div>
            );

            return (
              <div key={category.category_id} className={styles.slide}>
                <button
                  type="button"
                  className={styles.card}
                  onClick={() => scrollToWithOffset(category.category_id, headerOffset)}
                >
                  {content}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && (
        <button
          className={styles.arrow}
          aria-label="Вперёд"
          onClick={() => embla?.scrollNext()}
          disabled={!canScrollNext}
        >
          ›
        </button>
      )}
    </div>
  );
}
