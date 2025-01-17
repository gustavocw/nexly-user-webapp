import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "components/header/header";

export const Root = ({ children }: { children: React.ReactNode }) => {

  return (
    <Box fontFamily="Raleway" w="100%" height="100vh">
      <Header />
      <Box
        flex="1"
        transition="margin-left 0.2s ease"
        overflowY="auto"
        minHeight="100vh"
      >
        {children}
      </Box>
    </Box>
  );
};