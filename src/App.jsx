import { Navigation } from "./components/layouts/Navigation/Navigation";
import { Carousel } from "./components/layouts/CarouselPromo/Carousel.tsx";
import { MenuSection } from "./components/layouts/MenuSection/MenuSection.tsx";
import PromoSection from "./components/layouts/PromoSection/PromoSection.tsx";
import Footer from "./components/layouts/Footer/Footer.tsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navigation />
      <PromoSection />
      <MenuSection />
      <Footer />
    </div>
  );
}

export default App;
