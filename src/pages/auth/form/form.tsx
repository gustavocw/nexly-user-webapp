import { Stack, VStack, Image, Flex, Link, HStack } from "@chakra-ui/react";
import Input from "components/input/input";
import Text from "components/text/text";
import { useLoginController } from "./form.controller";
import { CheckboxCard } from "components/ui/checkbox-card";
import Btn from "components/button/button";
import useAuthStore from "stores/auth.store";

const Form = () => {
  const {
    control,
    setEmail,
    setPassword,
    errors,
    handleSubmit,
    onSubmit,
    rememberMe,
    setRememberMe,
    loadingLogin,
  } = useLoginController();
  const { setStepLogin, areaLogin } = useAuthStore();

  return (
    <Stack justify="center" alignItems="center" h="100%" width="100%">
      <Image
        objectFit="contain"
        width="130px"
        h="100px"
        src={areaLogin ? areaLogin.logo : "images/logo.png"}
      />
      <VStack
        mb={40}
        spaceY={10}
        w={{ base: "90%", md: "70%", lg: "60%" }}
        lineHeight={1}
      >
        <Flex flexWrap="wrap" gap={2} justify="center" alignItems="center" w="100%">
          <Text.Base
            textWrap="nowrap"
            fontSize={{ base: "16px", md: "22px", lg: "28px" }}
          >
            Bem vindo a
          </Text.Base>
          <Text.Base
            textWrap="nowrap"
            fontSize={{ base: "16px", md: "22px", lg: "28px" }}
            color={areaLogin ? areaLogin?.color : "primary.50"}
          >
            {areaLogin?.title}
          </Text.Base>
        </Flex>
        <VStack w="100%" spaceY={5}>
          <Input.Base
            control={control}
            name="email"
            placeholder="Endereço de e-mail"
            errorText={errors.email?.message}
            isRequired
          />
          <Input.Base
            control={control}
            name="password"
            placeholder="Senha"
            errorText={errors.password?.message}
            isRequired
          />
          <HStack w="100%" justify="space-between">
            <Link
              onClick={() => setStepLogin(true)}
              textDecoration="none"
              color={areaLogin ? areaLogin?.color : "primary.50"}
            >
              Esqueceu a senha?
            </Link>
            <Flex>
              <CheckboxCard
                color="#fff"
                onCheckedChange={(e) => {
                  if (e.checked === true) {
                    setRememberMe("true");
                  } else {
                    setRememberMe("false");
                    setEmail("");
                    setPassword("");
                  }
                }}
                checked={rememberMe === "true"}
                indicatorPlacement="start"
                border="none"
                label="Lembrar de mim"
              />
            </Flex>
          </HStack>
          <Btn
            bg={areaLogin ? areaLogin?.color : "primary.50"}
            _hover={{
              bg: areaLogin ? areaLogin?.color : "primary.50"
            }}
            w="100%"
            isLoading={loadingLogin}
            label="Entrar"
            onClick={handleSubmit(onSubmit)}
          />
        </VStack>
      </VStack>
    </Stack>
  );
};

export default Form;
