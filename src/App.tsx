import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "components/ui/toaster";
import { AreaProvider } from "contexts/AreaContext";
import { AuthProvider } from "contexts/AuthContext";
import { UserProvider } from "contexts/Usercontext";
import { useArea } from "hooks/useArea";
import PageMetadata from "routes/meta/pageMetaData";
import AppRoutes from "routes/routes";
import theme from "utils/theme";

function App() {
  const { area } = useArea();
  
  return (
    <>
      <ChakraProvider value={theme}>
        <AuthProvider>
          <UserProvider>
          <AreaProvider>
            <PageMetadata title={area?.title || "Nexly Members"} faviconUrl={area?.icon || ""} />
            <AppRoutes />
            <Toaster />
          </AreaProvider>
          </UserProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
