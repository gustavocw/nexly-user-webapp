import {
  createListCollection,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "components/ui/select";
import { Link } from 'react-router-dom';

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const collection = createListCollection({
    items: statusOptions,
  });

  return (
    <VStack
      p={6}
      bg="neutral.60"
      borderWidth="1px"
      borderColor="neutral.40"
      w="100%"
      minH={{ base: "350px", md: "250px" }}
      h={{ base: "auto", md: "250px" }}
      borderRadius="12px"
      align="flex-start"
      justify="space-between"
    >
      <HStack w="100%">
        <Flex w="100%" alignItems="center" gap="10px">
          <VStack
            borderWidth="1px"
            borderColor="neutral.40"
            borderRadius="8px"
            color="neutral"
            alignItems="center"
            justify="center"
            w={{ base: "100%", md: "200px" }}
            h="32px"
            align="flex-start"
          >
            <Text>Ticket #{ticket.number}</Text>
          </VStack>
          <Text
            w={{ base: "100%", md: "200px" }}
            fontSize={{ base: "14px", md: "16px" }}
            color="neutral"
          >
            {ticket.category}
          </Text>
        </Flex>
      </HStack>
      <Stack
        flexDirection={{ base: "column-reverse", md: "row" }}
        w="100%"
        alignItems={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap="10px"
      >
        <Text fontSize="32px" color="neutral">
          {ticket.name}
        </Text>
        <Text color="neutral">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </Text>
      </Stack>
      <Text color="neutral">{ticket.description}</Text>
      <Flex gap="10px" w="100%" align="center">
      <Flex
          alignItems="center"
          justify="center"
          w={{ base: "100%", md: "120px" }}
          borderRadius="8px"
          p="10px"
          bg={getPriorityColor(ticket.priority)}
        >
          <Text color="primary.95" fontSize="14px">
            {ticket.priority}
          </Text>
        </Flex>
        <SelectRoot
          _icon={{
            color: "#fff",
          }}
          color="neutral"
          collection={collection}
          defaultValue={[ticket.status]}
        >
          <SelectTrigger
            display="flex"
            justifyContent="center"
            borderColor="neutral.40"
            cursor="pointer"
            w={{ base: "100%", md: "120px" }}
          >
            <SelectValueText m={2} placeholder="Status" />
          </SelectTrigger>
          <SelectContent
            border="1px solid"
            borderColor="neutral.40"
            h="100px"
            bg="neutral.60"
            color="neutral"
          >
            {statusOptions?.map((status) => (
              <SelectItem
                defaultValue={ticket.status}
                cursor="pointer"
                _hover={{
                  bg: "neutral.70",
                }}
                item={status}
                key={status.value}
              >
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        {!ticket?.room && (
          <Link 
            to={`/chat/${ticket._id}`} 
            state={{ room: ticket.room }}
          >
            <Text
              color="primary.50"
              fontSize="14px"
              textDecoration="underline"
              cursor="pointer"
              whiteSpace="nowrap"
            >
              Ver respostas
            </Text>
          </Link>
        )}
      </Flex>
    </VStack>
  );
};

export default TicketCard;

function getPriorityColor(priority: string): string {
  switch (priority) {
    case "ALTA":
      return "error.90";
    case "URGENTE":
      return "error.90";
    case "MEDIA":
      return "info.90";
    case "BAIXA":
      return "success.90";
    default:
      return "neutral.90";
  }
}

const statusOptions = [
  { value: "open", label: "Em aberto" },
  { value: "closed", label: "Resolvido" },
];
