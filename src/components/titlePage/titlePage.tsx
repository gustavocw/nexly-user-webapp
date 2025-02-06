import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import Text from "components/text/text";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

interface TitlePageProps {
  title?: string;
  description?: string;
  py?: string;
  onClick?: () => void;
}

const TitlePage = ({ title, description, onClick, py }: TitlePageProps) => {
  const navigate = useNavigate();

  return (
    <Box py={py ?? 4}>
      <HStack w="100%" align="flex-start">
        <VStack mx={0} gap="10px">
          <HStack
            w="100%"
            onClick={() => {
              if (onClick) onClick();
              navigate(-1);
            }}
            cursor="pointer"
          >
            <Icon mt="1px" fontSize={{ base: "16px", md: "32px" }} color="neutral">
              <IoIosArrowBack />
            </Icon>
            <Text.Medium fontSize={{ base: "16px", md: "24px" }} fontWeight="medium" color="neutral">
              {title}
            </Text.Medium>
          </HStack>
          <Text.Medium ml="48px" fontSize="16px" color="neutral.10">
            {description}
          </Text.Medium>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TitlePage;