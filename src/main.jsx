import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./styles/theme.css";
import { ModalRoot } from "./client/components/ui/Modal/ModalRoot.tsx";
import { ModalProvider } from "./client/components/ui/Modal/ModalProvider.js";

import { Provider } from "react-redux";
import { store } from "./stores/stores.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <App />
          <ModalRoot />
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
