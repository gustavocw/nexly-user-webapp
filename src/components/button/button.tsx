import { Button, Box, Spinner, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import Text from "components/text/text";

interface BtnProps extends ChakraButtonProps {
  label: string;
  isLoading?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
}

const Btn = ({
  label,
  isLoading,
  iconLeft,
  iconRight,
  fontSize = "16px",
  ...buttonProps
}: BtnProps) => {
  const isTransparent = buttonProps.bg === "transparent";

  return (
    <Button
      {...buttonProps}
      color={isTransparent ? "#111111" : buttonProps.color ?? "#fff"}
      textTransform="capitalize"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      border={isTransparent ? "1px solid" : buttonProps.borderColor}
      borderColor={buttonProps.borderColor ? buttonProps.borderColor : "gray.600"}
      _hover={{
        bg: isTransparent ? "neutral.40" : buttonProps._hover?.bg ?? "primary.50",
      }}
    >
      {iconLeft && <Box color="neutral">{iconLeft}</Box>}
      <Text.Large
        color={buttonProps.color || (buttonProps.bg === "transparent" ? "#111111" : "#ffffff")}
        fontWeight={buttonProps.fontWeight}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Text.Medium
            textTransform="initial"
            fontWeight={buttonProps.fontWeight ?? "500"}
            fontSize={fontSize}
          >
            {label}
          </Text.Medium>
        )}
      </Text.Large>
      {iconRight && <Box>{iconRight}</Box>}
    </Button>
  );
};

export default Btn;