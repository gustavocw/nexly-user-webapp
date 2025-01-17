import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "utils/theme.ts";
import { GlobalStyles } from "utils/global.styles.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
      <GlobalStyles />
      <App />
    </ChakraProvider>
  </StrictMode>
);
