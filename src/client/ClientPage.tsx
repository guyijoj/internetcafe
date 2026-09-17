import Navigation from "./components/layouts/Navigation/Navigation";
import Footer from "./components/layouts/Footer/Footer.js";
import PromoSection from "./components/layouts/PromoSection/PromoSection.js";
import { MenuSection } from "./components/layouts/MenuSection/MenuSection.js";

const ClientPage = () => {
  return (
    <div>
      <Navigation />
      <PromoSection />
      <MenuSection />
      <Footer />
    </div>
  );
};

export default ClientPage;
