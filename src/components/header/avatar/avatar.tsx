import { Box } from "@chakra-ui/react";
import { Avatar } from "components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AvatarUser = () => {
  const navigate = useNavigate();
  const {signout} = useAuth();
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Box cursor="pointer">
          <Avatar w="38px" h="38px" />
        </Box>
      </MenuTrigger>
      <MenuContent bg="#00000099" gap="10px" padding="10px" borderRadius="12px">
        <MenuItem
          fontSize="18px"
          _hover={{ bg: "orange" }}
          color="neutral"
          borderRadius="8px"
          cursor="pointer"
          px="12px"
          py="6px"
          value="perfil"
          onClick={() => navigate("/profile")}
        >
          Perfil
        </MenuItem>
        {/* <MenuItem
          fontSize="18px"
          _hover={{ bg: "orange" }}
          color="neutral"
          borderRadius="8px"
          cursor="pointer"
          px="12px"
          py="6px"
          value="new-file"
          onClick={() => navigate("/comunity")}
        >
          Comunidade
        </MenuItem> */}
        <MenuItem
          fontSize="18px"
          _hover={{ bg: "orange" }}
          color="neutral"
          borderRadius="8px"
          cursor="pointer"
          px="12px"
          py="6px"
          value="favorites"
          onClick={() => navigate("/favorites")}
        >
          Favoritos
        </MenuItem>
        <MenuItem
          fontSize="18px"
          _hover={{ bg: "orange" }}
          color="neutral"
          borderRadius="8px"
          cursor="pointer"
          px="12px"
          py="6px"
          value="tickets"
          onClick={() => navigate("/tickets")}
        >
          Tickets
        </MenuItem>
        <MenuItem
          fontSize="18px"
          _hover={{ bg: "orange" }}
          color="neutral"
          borderRadius="8px"
          cursor="pointer"
          px="12px"
          py="6px"
          value="certificates"
          onClick={() => navigate("/certificates")}
        >
          Certificado
        </MenuItem>
        <MenuItem
          fontSize="18px"
          _hover={{ bg: "orange" }}
          color="neutral"
          borderRadius="8px"
          cursor="pointer"
          px="12px"
          py="6px"
          value="logou"
          onClick={() => signout()}
        >
          Sair
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default AvatarUser;
