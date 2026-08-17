import { Carousel } from "../CarouselPromo/Carousel";

const PromoSection = () => {
  const slides = [
    { src: "/example.webp", alt: "Реклама1" },
    { src: "/example2.webp", alt: "Реклама2" },
    { src: "/example3.webp", alt: "Реклама3" },
    { src: "/example4.webp", alt: "Реклама4" },
    { src: "/example5.webp", alt: "Реклама5" },
  ];
  return (
    <div>
      <Carousel slide={slides} autoPlay interval={4000} />
    </div>
  );
};
export default PromoSection;
