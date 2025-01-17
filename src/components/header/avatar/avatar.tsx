import { Box, Button } from "@chakra-ui/react";
import { Avatar } from "components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";

const AvatarUser = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Box cursor="pointer">
        <Avatar w="38px" h="38px" />
        </Box>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="new-txt">New Text File</MenuItem>
        <MenuItem value="new-file">New File...</MenuItem>
        <MenuItem value="new-win">New Window</MenuItem>
        <MenuItem value="open-file">Open File...</MenuItem>
        <MenuItem value="export">Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default AvatarUser;
