import { Box, VStack, Icon, Text } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiNotification3Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { Avatar } from "components/ui/avatar";

const BottomNav = ({ user }: { user?: { photo?: string } }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Início", path: "/", icon: GoHomeFill },
    { name: "Notificações", path: "/notificacoes", icon: RiNotification3Fill },
  ];

  return (
    <Box
      position="fixed"
      bottom="0"
      w="100%"
      bg="neutral.70"
      color="white"
      py={3}
      zIndex={1}
      boxShadow="0 -2px 10px rgba(0,0,0,0.2)"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      borderTopWidth="1px"
      borderColor="neutral.40"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <VStack
            key={item.path}
            cursor="pointer"
            onClick={() => navigate(item.path)}
            color={isActive ? "purple.500" : "gray.400"}
            transition="0.2s"
            _hover={{ color: "purple.300" }}
          >
            <Icon as={item.icon} boxSize={6} />
            <Text fontSize="sm">{item.name}</Text>
          </VStack>
        );
      })}

      <VStack
        cursor="pointer"
        onClick={() => navigate("/perfil")}
        transition="0.2s"
        _hover={{ opacity: 0.8 }}
      >
        <Avatar src={user?.photo} w="26px" h="26px" border="2px solid white" />
        <Text fontSize="sm" color={location.pathname === "/perfil" ? "purple.500" : "gray.400"}>
          Perfil
        </Text>
      </VStack>
    </Box>
  );
};

export default BottomNav;
