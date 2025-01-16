import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "components/ui/provider.tsx";
import { GlobalStyles } from "utils/global.styles.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <GlobalStyles />
      <App />
    </Provider>
  </StrictMode>
);
