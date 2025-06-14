import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import Select from "components/select/select";
import { MdOutlineModeEdit } from "react-icons/md";

interface FormProps {
  control: any;
  handle: any;
  onSubmit: any;
}

const FormProfile: React.FC<FormProps> = ({ control }) => {
  return (
    <VStack
      align="flex-start"
      w="100%"
      borderRadius="8px"
      p="20px"
      gap="20px"
      bg="neutral.60"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
    >
      <Text color="primary.40">Informações pessoais</Text>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        w="100%"
        justify="space-around"
        gap={2}
      >
        <VStack spaceY={3} align="flex-start" w="100%">
          <Flex gap={2} w="100%" justify="space-between">
            <Input.Base
              name="name"
              maxLength={200}
              control={control}
              label="Nome"
            />
            <Input.Base
              name="lastname"
              maxLength={200}
              control={control}
              label="Sobrenome"
            />
          </Flex>
          <Input.Base
            name="email"
            maxLength={200}
            control={control}
            label="E-mail"
          />
        </VStack>
        <VStack align="flex-start" spaceY={3} w="100%">
          <Input.Base
            name="phone"
            maxLength={200}
            control={control}
            label="Celular"
            mask="(99) 99999-9999"
          />
          <Flex position="relative" w="100%">
            <Input.Base
              name="password"
              maxLength={200}
              control={control}
              label="Senha"
              isDisabled
            />
            <Icon
              cursor="pointer"
              onClick={() => console.log("click")}
              top="37px"
              right="10px"
              position="absolute"
              color="#fff"
            >
              <MdOutlineModeEdit />
            </Icon>
          </Flex>
        </VStack>
        <VStack align="flex-start" spaceY={3} w="100%">
          <Select
            options={[
              { label: "Masculino", value: "m" },
              { label: "Feminino", value: "f" },
              { label: "Não informar", value: "sn" },
            ]}
            control={control}
            label="Gênero"
            name="sex"
          />
          <Input.Base
            name="cpf"
            maxLength={200}
            control={control}
            label="CPF"
            isDisabled
          />
        </VStack>
      </Flex>
    </VStack>
  );
};

export default FormProfile;
