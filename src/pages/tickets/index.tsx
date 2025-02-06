import {
  Separator,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import ListIssues from "./issues/list";
import SearchBar from "components/search/search";
import Btn from "components/button/button";
import TicketCard from "./card/card";
import CreateTicket from "./create/modal.create.ticket";

const Tickets = () => {
  return (
    <VStack py={24} w="100%">
      <VStack align="center" w="100%">
        <ListIssues />
        <Separator borderColor="neutral.40" />
      </VStack>
      <VStack py={3} align="flex-start" w={{ base: "90%", md: "100%", lg: "75%" }}>
        <Text color="neutral" fontSize="20px">
          Meus tickets
        </Text>
        <Stack flexDirection={{ base: "column", md: "row" }} justify="space-between" py={2} align="flex-start" w="100%">
          <Stack w="100%" flexDirection={{ base: "column", md: "row" }} gap="10px">
            <SearchBar placeholder="Pesquisar ticket" />
            <Btn bg="transparent" label="Não respondidos" w={{ base: "100%", md: "200px", lg: "200px" }} />
          </Stack>
          <CreateTicket />
        </Stack>
        <VStack w="100%" align="flex-start">
          <TicketCard />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Tickets;
