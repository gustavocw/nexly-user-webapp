import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "components/ui/toaster";
import { AreaProvider } from "contexts/AreaContext";
import { AuthProvider } from "contexts/AuthContext";
import { useArea } from "hooks/useArea";
import PageMetadata from "routes/meta/pageMetaData";
import AppRoutes from "routes/routes";
import theme from "utils/theme";

function App() {
  const { area } = useArea();
  console.log(area);
  
  return (
    <>
      <ChakraProvider value={theme}>
        <AuthProvider>
          <AreaProvider>
            <PageMetadata title={area?.title || "Nexly Members"} faviconUrl={area?.icon || ""} />
            <AppRoutes />
            <Toaster />
          </AreaProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
