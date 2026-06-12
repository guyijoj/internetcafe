import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./styles/theme.css";
import { ModalRoot } from "./components/ui/Modal/ModalRoot.tsx";
import { ModalProvider } from "./components/ui/Modal/ModalProvider.js";

import { Provider } from "react-redux";
import { store } from "./stores/stores.ts";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
        <ModalRoot />
      </ModalProvider>
    </Provider>
  </StrictMode>,
);
