import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "components/ui/toaster";
import { AreaProvider } from "contexts/AreaContext";
import { AuthProvider } from "contexts/AuthContext";
import { UserProvider } from "contexts/Usercontext";
import PageMetadata from "routes/meta/pageMetaData";
import AppRoutes from "routes/routes";
import useAuthStore from "stores/auth.store";
import { GlobalStyles } from "utils/global.styles";
import theme from "utils/theme";

function App() {
  const { area } = useAuthStore();
  return (
    <>
      <ChakraProvider value={theme}>
        <AuthProvider>
          <UserProvider>
            <AreaProvider>
              <GlobalStyles color={area?.color} />
              <PageMetadata
                title={area?.title || "Nexly Members"}
                faviconUrl={area?.icon || ""}
              />
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
