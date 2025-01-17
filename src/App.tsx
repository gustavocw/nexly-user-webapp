import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "components/ui/toaster";
import { AuthProvider } from "contexts/AuthContext";
import PageMetadata from "routes/meta/pageMetaData";
import AppRoutes from "routes/routes";
import theme from "utils/theme";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ChakraProvider value={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PageMetadata title={"Nome da área"} faviconUrl={"/vite.svg"} />
            <AppRoutes />
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
