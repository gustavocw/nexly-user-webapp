import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "components/header/header";
import BottomNav from "components/footer";

export const Root = ({ children }: { children: React.ReactNode }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <Flex
      fontFamily="Raleway"
      w="100%"
      minHeight="100vh"
      flexDirection="column"
      overflow="hidden"
    >
      <Header />
      <Box pb={28} zIndex={0} flex="1" overflowY="auto">
        {children}
      </Box>
      <Box display={{ base: "flex", md: "none", lg: "none" }} w="100%" position="fixed" bottom="0">
        <BottomNav />
      </Box>
    </Flex>
  );
};
