import { Flex, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import TitlePage from "components/titlePage/titlePage";
import { Avatar } from "components/ui/avatar";
import FormProfile from "./formprofile/form";
import { useProfileController } from "./controller";
import FormAddress from "./formaddress/form";

const Profile = () => {
  const {
    control,
    handleProfileSubmit,
    onSubmitProfile,
    handleAddressSubmit,
    onSubmitAddress,
  } = useProfileController();
  return (
    <VStack w="100%">
      <VStack
        align="flex-start"
        gap="32px"
        py={12}
        m="auto"
        w={{ base: "98%", md: "60%" }}
      >
        <TitlePage title="Bem vindo, Nome" />
        <Flex
          justify="center"
          flexDirection={{ base: "column", md: "row" }}
          gap="32px"
          alignItems="flex-start"
          width={{ base: "90%", md: "100%" }}
          mx={{ base: "auto", md: 0 }}
        >
          <Avatar mx={{ base: "auto", md: 0 }} w="112px" h="112px" src="" />
          <Input.Text
            boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
            bg="neutral.60"
            name="bio"
            border="none"
            control={control}
            onBlurSubmit={() => handleProfileSubmit(onSubmitProfile)()}
            onEnterSubmit={() => handleProfileSubmit(onSubmitProfile)()}
          />
        </Flex>
        <FormProfile
          handle={handleProfileSubmit}
          onSubmit={onSubmitProfile}
          control={control}
        />
        <FormAddress
          handle={handleAddressSubmit}
          onSubmit={onSubmitAddress}
          control={control}
        />
      </VStack>
    </VStack>
  );
};

export default Profile;
