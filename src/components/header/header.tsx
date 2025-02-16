import { Flex, HStack, Icon, Image } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import AvatarUser from "./avatar/avatar";
import { useNavigate } from "react-router-dom";
import useAuthStore from "stores/auth.store";
import Notifications from "./notifications";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "services/user.services";

const Header = () => {
  const navigate = useNavigate();
  const { area } = useAuthStore();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });
  
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
        src={area?.logo ?? "/images/logo.png"}
        objectFit="contain"
        w={area?.logo ? "100px50px" : "100px"}
        h={area?.logo ? "50px" : "25px"}
      />
      <Flex alignItems="center" gap="24px">
        <Icon cursor="pointer" fontSize="24px" color="neutral">
          <FiSearch />
        </Icon>
        <Notifications notifications={notifications} />
        <AvatarUser />
      </Flex>
    </HStack>
  );
};

export default Header;
