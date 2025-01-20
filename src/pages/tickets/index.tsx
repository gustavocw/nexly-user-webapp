import {
  Flex,
  HStack,
  Separator,
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
      <VStack py={3} align="flex-start" px={20} w="100%">
        <Text color="neutral" fontSize="20px">
          Meus tickets
        </Text>
        <HStack justify="space-between" py={2} align="flex-start" w="100%">
          <Flex gap="10px">
            <SearchBar placeholder="Pesquisar ticket" />
            <Btn bg="transparent" label="Não respondidos" w="200px" />
          </Flex>
          <CreateTicket />
        </HStack>
        <VStack w="100%" align="flex-start">
          <TicketCard />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Tickets;
