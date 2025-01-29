import { HStack, Image, Stack, Box, Flex } from "@chakra-ui/react";
import FormLogin from "./form/form";
import useAuthStore from "stores/auth.store";

const Auth = () => {
  const { stepLogin } = useAuthStore();

  return (
    <HStack h="100vh" flex={1}>
      <Flex h="100%" w={{ base: "100%", md: "100%", lg: "50%" }}>
        {!stepLogin ? <FormLogin /> : <FormLogin />}
      </Flex>
      <Stack
        bg="#131313"
        display={{ base: "none", md: "none", lg: "flex" }}
        h="100vh"
        justify="center"
        width="50%"
      >
        <Box>
          <Image m="auto" objectFit="autoy" src="images/bglogin.png" />
        </Box>
      </Stack>
    </HStack>
  );
};

export default Auth;