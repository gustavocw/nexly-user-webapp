import { Flex, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import TitlePage from "components/titlePage/titlePage";
import { Avatar } from "components/ui/avatar";
import FormProfile from "./formprofile/form";
import { useProfileController } from "./controller";
import FormAddress from "./formaddress/form";
import { FileUploadRoot, FileUploadTrigger } from "components/ui/file-upload";
import { SkeletonCircle } from "components/ui/skeleton";
import { useUser } from "hooks/useUser";
import Btn from "components/button/button";
import { useAuth } from "hooks/useAuth";

const Profile = () => {
  const {
    controlAdress,
    controlProfile,
    loadingImage,
    mutateFile,
    handleProfileSubmit,
    onSubmitProfile,
    handleAddressSubmit,
    onSubmitAddress,
    fetchAddressByCEP,
    updatingProfile,
    updatingAddress,
    creatingAddress,
  } = useProfileController();
  const { user } = useUser();
  const { signout } = useAuth();

  return (
    <VStack h="100vh" w="100%">
      <VStack
        align="flex-start"
        gap="32px"
        py={{ base: 20, md: 12 }}
        m="auto"
        w={{ base: "98%", md: "60%" }}
      >
        <TitlePage title={`Bem vindo, ${user?.name}`} />
        <Flex
          justify="center"
          flexDirection={{ base: "column", md: "row" }}
          gap="32px"
          alignItems={{ base: "center", md: "flex-start" }}
          width={{ base: "90%", md: "100%" }}
          mx={{ base: "auto", md: 0 }}
        >
          <FileUploadRoot
            onFileChange={(file) => mutateFile(file.acceptedFiles[0])}
            w="100px"
            borderRadius="full"
          >
            <FileUploadTrigger borderRadius="full" cursor="pointer">
              <SkeletonCircle loading={loadingImage}>
                <Avatar
                  src={user?.photo}
                  mx={{ base: "auto", md: 0 }}
                  w="112px"
                  h="112px"
                />
              </SkeletonCircle>
            </FileUploadTrigger>
          </FileUploadRoot>
          <Input.Text
            boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
            bg="neutral.60"
            name="bio"
            border="none"
            control={controlProfile}
          />
        </Flex>
        <FormProfile
          handle={handleProfileSubmit}
          onSubmit={onSubmitProfile}
          control={controlProfile}
        />
        <FormAddress
          handle={handleAddressSubmit}
          onSubmit={onSubmitAddress}
          control={controlAdress}
          fetchAddressByCEP={fetchAddressByCEP}
        />
        <VStack
          display={{ base: "flex", md: "none" }}
          w="100%"
          justify="center"
        >
          <Btn
            w="200px"
            label="Salvar"
            onClick={() => handleProfileSubmit(onSubmitProfile)()}
            isLoading={updatingProfile || updatingAddress || creatingAddress}
          />
          <Btn
            w="200px"
            label="Sair"
            bg="transparent"
            onClick={() => signout()}
            isLoading={updatingProfile || updatingAddress || creatingAddress}
          />
        </VStack>
      </VStack>
      <Flex w="60%" justify="flex-end">
        <Btn
          w="200px"
          label="Salvar"
          onClick={() => handleProfileSubmit(onSubmitProfile)()}
          isLoading={updatingProfile || updatingAddress || creatingAddress}
        />
      </Flex>
    </VStack>
  );
};

export default Profile;
