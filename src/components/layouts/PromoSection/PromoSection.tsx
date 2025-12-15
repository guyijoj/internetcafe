import { Carousel } from "../CarouselPromo/Carousel";

const PromoSection = () => {
  const slides = [
    { src: "public/example.webp", alt: "Горы" },
    { src: "public/example2.webp", alt: "Озеро" },
    { src: "public/example3.webp", alt: "Лес" },
    { src: "public/example4.webp", alt: "Лес" },
    { src: "public/example5.webp", alt: "Лес" },
  ];
  return (
    <div>
      <Carousel slide={slides} autoPlay interval={4000} />
    </div>
  );
};
export default PromoSection;
