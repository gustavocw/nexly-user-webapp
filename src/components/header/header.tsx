import { Flex, HStack, Icon, Image } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import AvatarUser from "./avatar/avatar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <HStack
      w="100%"
      bg="linear-gradient(180deg, #1F1D22 0%, rgba(16, 18, 26, 0) 100%)"
      justify="space-between"
      pt={{ base: "10px", md: "25px" }}
      px={{ base: "20px", md: "52px" }}
      position="fixed"
      zIndex={9999}
    >
      <Image
        cursor="pointer"
        onClick={() => navigate("/")}
        src="images/logo.png"
        objectFit="contain"
        w="100px"
        h="25px"
      />
      <Flex alignItems="center" gap="24px">
        <Icon fontSize="24px" color="neutral">
          <FiSearch />
        </Icon>
        <Icon fontSize="24px" color="neutral">
          <IoNotificationsOutline />
        </Icon>
        <AvatarUser />
      </Flex>
    </HStack>
  );
};

export default Header;
