import { ChakraProvider } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "components/ui/toaster";
import { AreaProvider } from "contexts/AreaContext";
import { AuthProvider } from "contexts/AuthContext";
import { UserProvider } from "contexts/Usercontext";
import { useAuth } from "hooks/useAuth";
import PageMetadata from "routes/meta/pageMetaData";
import AppRoutes from "routes/routes";
import { getAreaLogin } from "services/area.services";
import useAuthStore from "stores/auth.store";
import { GlobalStyles } from "utils/global.styles";
import theme from "utils/theme";

function App() {
  const rawUrl = window.location.hostname;
  const url = rawUrl === "localhost" ? "costaweb.dev.br" : rawUrl;
  const { setAreaLogin } = useAuthStore();

  const { isLogged } = useAuth();
  const { data: areaLogin } = useQuery({
    queryKey: ["area-login", url],
    queryFn: async () => {
      const data = await getAreaLogin(url);
      setAreaLogin(data);
      return data;
    },
    enabled: !isLogged,
  });

  return (
    <>
      <ChakraProvider value={theme}>
        <AuthProvider>
          <UserProvider>
            <AreaProvider>
              <GlobalStyles color={areaLogin?.color} />
              <PageMetadata
                title={areaLogin?.title || "Nexly Members"}
                faviconUrl={areaLogin?.icon || ""}
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
