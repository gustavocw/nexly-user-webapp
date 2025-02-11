import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { BiPlus } from "react-icons/bi";
import Btn from "components/button/button";
import { HStack, VStack } from "@chakra-ui/react";
import Select from "components/select/select";
import useCreateTicketsController from "./modal.create.controller";
import { GoDotFill } from "react-icons/go";
import Input from "components/input/input";

const CreateTicket = () => {
  const {
    isValid,
    isOpen,
    setIsOpen,
    watch,
    reset,
    errors,
    control,
    setValue,
    handleSubmit,
    creatingTicket,
    onSubmit,
  } = useCreateTicketsController();
  const bgPriority = watch("priority");

  return (
    <HStack w="100%" justify={{ base: "flex-end" }} wrap="wrap" gap="4">
      <DialogRoot
        onOpenChange={(e) => setIsOpen(e.open)}
        open={isOpen}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogTrigger asChild>
          <Btn
            onClick={() => setIsOpen(true)}
            iconLeft={<BiPlus />}
            label="Novo ticket"
            w={{ base: "100%", md: "200px", lg: "200px" }}
          />
        </DialogTrigger>
        <DialogContent color="neutral" bg="neutral.60" borderRadius="20px">
          <DialogHeader
            py="20px"
            px="32px"
            borderBottomWidth="1px"
            borderColor="neutral.40"
          >
            <DialogTitle color="neurtal" fontSize="20px">
              Criar novo ticket
            </DialogTitle>
          </DialogHeader>
          <DialogBody py="20px" px="32px">
            <VStack spaceY={4} w="100%">
              <Input.Base
                maxLength={200}
                label="Título do problema"
                control={control}
                name="name"
                placeholder="Informe o problema problema"
                errorText={errors.name?.message}
              />
              <Select
                name="category"
                control={control}
                options={category}
                label="Categoria"
                onOptionSelect={(value) => setValue("category", value)}
              />
              <HStack justify="center" w="100%">
                <Btn
                  bg={bgPriority === "BAIXA" ? "neutral.40" : "transparent"}
                  _hover={{
                    bg: "neutral.60",
                  }}
                  iconLeft={<GoDotFill style={{ color: "#288C18" }} />}
                  w="32%"
                  label="Baixa"
                  onClick={() => setValue("priority", "BAIXA")}
                />
                <Btn
                  bg={bgPriority === "MEDIANA" ? "neutral.40" : "transparent"}
                  iconLeft={<GoDotFill style={{ color: "#182B8C" }} />}
                  w="32%"
                  label="Mediana"
                  onClick={() => setValue("priority", "MEDIANA")}
                />
                <Btn
                  bg={bgPriority === "URGENTE" ? "neutral.40" : "transparent"}
                  _hover={{
                    bg: "neutral.60",
                  }}
                  iconLeft={<GoDotFill style={{ color: "#8C1D18" }} />}
                  w="32%"
                  label="Urgente"
                  onClick={() => setValue("priority", "URGENTE")}
                />
              </HStack>
              <Input.Text
                maxLength={200}
                label="Descrição do problema"
                control={control}
                name="description"
                placeholder="Descrição do problema"
                errorText={errors.description?.message}
              />
            </VStack>
          </DialogBody>
          <DialogFooter p={4}>
            <DialogActionTrigger asChild>
              <Btn
                onClick={() => reset}
                bg="transparent"
                label="Cancelar"
                w="200px"
              />
            </DialogActionTrigger>
            <Btn
              onClick={() => handleSubmit(onSubmit)()}
              label="Salvar"
              w="200px"
              isLoading={creatingTicket}
              disabled={!isValid}
            />
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

export default CreateTicket;

const category = [
  { label: "Assistência Geral", value: "assistencia_geral" },
  { label: "Problemas Técnicos", value: "problemas_tecnicos" },
  { label: "Dúvidas sobre Pagamento", value: "duvidas_pagamento" },
  { label: "Solicitação de Reembolso", value: "reembolso" },
  { label: "Sugestões de Melhoria", value: "sugestoes" },
  { label: "Erro no Sistema", value: "erro_sistema" },
  { label: "Problemas com Login", value: "problemas_login" },
  { label: "Atualização de Cadastro", value: "atualizacao_cadastro" },
  { label: "Questões de Privacidade", value: "privacidade" },
  { label: "Outros", value: "outros" },
];
