import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./styles/theme.css";
import { ModalRoot } from "./components/ui/Modal/ModalRoot.tsx";
import { ModalProvider } from "./components/ui/Modal/ModalProvider.js";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <ModalProvider>
        <App />
        <ModalRoot />
      </ModalProvider>
    </CartProvider>
  </StrictMode>
);
