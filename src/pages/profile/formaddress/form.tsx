import { Flex, Text, VStack } from "@chakra-ui/react";
import Input from "components/input/input";
import { stateOptions } from "./states";
import Select from "components/select/select";

interface FormProps {
  control: any;
  handle: any;
  onSubmit: any;
}

const FormAddress: React.FC<FormProps> = ({ control, handle, onSubmit }) => {
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
      <Text color="primary.40">Informações de endereço</Text>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        w="100%"
        alignItems="flex-start"
        justify="space-around"
        gap={2}
      >
        <VStack align="flex-start" w="100%">
          <Flex gap={4} w="100%" justify="space-between">
            <Input.Base
              name="codeStreet"
              maxLength={200}
              control={control}
              onBlurSubmit={() => handle(onSubmit)()}
              onEnterSubmit={() => handle(onSubmit)()}
              label="CEP"
            />
            <Select
              options={stateOptions}
              control={control}
              onOptionSelect={() => handle(onSubmit)()}
              label="UF"
              name="uf"
            />
          </Flex>
          <Input.Base
            name="street"
            maxLength={200}
            control={control}
            onBlurSubmit={() => handle(onSubmit)()}
            onEnterSubmit={() => handle(onSubmit)()}
            label="Rua"
          />
        </VStack>
        <VStack align="flex-start" w="100%">
          <Input.Base
            name="city"
            maxLength={200}
            control={control}
            onBlurSubmit={() => handle(onSubmit)()}
            onEnterSubmit={() => handle(onSubmit)()}
            label="Cidade"
          />
          <Flex gap={2} w="100%">
            <Input.Base
              name="number"
              maxLength={200}
              control={control}
              onBlurSubmit={() => handle(onSubmit)()}
              onEnterSubmit={() => handle(onSubmit)()}
              label="Número"
            />
            <Input.Base
              name="complement"
              maxLength={200}
              control={control}
              onBlurSubmit={() => handle(onSubmit)()}
              onEnterSubmit={() => handle(onSubmit)()}
              label="Complemento"
            />
          </Flex>
        </VStack>
        <VStack h="100%" w="100%">
          <Input.Base
            name="neighborhood"
            maxLength={200}
            control={control}
            onBlurSubmit={() => handle(onSubmit)()}
            onEnterSubmit={() => handle(onSubmit)()}
            label="Bairro"
          />
        </VStack>
      </Flex>
    </VStack>
  );
};

export default FormAddress;
