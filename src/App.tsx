import { ChakraProvider } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "components/ui/toaster";
import { AuthProvider } from "contexts/AuthContext";
import PageMetadata from "routes/meta/pageMetaData";
import AppRoutes from "routes/routes";
import { getArea } from "services/area.services";
import theme from "utils/theme";

function App() {
  const url = window.location.origin;
  const {data: area, isLoading} = useQuery({
    queryKey: ['area', url],
    queryFn: async () => {
      return getArea(url);
    }
  })

  if (isLoading) {
    return <div>Carregando área de membro...</div>;
  }

  return (
    <>
      <ChakraProvider value={theme}>
          <AuthProvider>
            <PageMetadata title={area[0]?.title} faviconUrl={area[0]?.icon} />
            <AppRoutes />
            <Toaster />
          </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
