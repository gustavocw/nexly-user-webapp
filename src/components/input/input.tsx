import React from "react";
import { Controller } from "react-hook-form";
import {
  Input as ChakraInput,
  Textarea as ChakraTextarea,
  Box,
} from "@chakra-ui/react";
import { Field } from "components/ui/field";
import { withMask } from "use-mask-input";

interface InputProps {
  bg?: string;
  border?: any;
  control: any;
  boxShadow?: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  isTextarea?: boolean;
  isRequired?: boolean;
  errorText?: string;
  width?: any;
  height?: string | number;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  autoComplete?: string;
  mx?: any;
  maxLength?: number;
  mask?: string;
  helperText?: string;
  onBlurSubmit?: (value?: string) => void;
  onEnterSubmit?: (value?: string) => void;
}

const InputBase: React.FC<InputProps> = ({
  control,
  mx,
  name,
  label,
  placeholder,
  type,
  isRequired,
  helperText,
  errorText,
  width,
  height,
  isReadOnly,
  isDisabled,
  autoComplete,
  maxLength,
  mask,
  onBlurSubmit,
  onEnterSubmit,
}) => (
  <Field
    helperText={helperText}
    color="white"
    label={label}
    errorText={errorText}
    required={isRequired}
  >
    <Box width={width || "100%"} height={height || "auto"}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ChakraInput
            {...field}
            type={type}
            mx={mx}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={(e) => {
              field.onBlur();
              if (onBlurSubmit) {
                onBlurSubmit(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onEnterSubmit) {
                e.preventDefault();
                onEnterSubmit(field.value);
              }
            }}
            ref={mask ? withMask(mask) : undefined}
            readOnly={isReadOnly}
            disabled={isDisabled}
            maxLength={maxLength}
            height="40px"
            borderColor="neutral.30"
            _placeholder={{ color: "#FFFFFF40" }}
            bg="transparent"
            px={2}
            color="#FFFFFF"
            borderRadius="4px"
            autoComplete={autoComplete}
          />
        )}
      />
    </Box>
  </Field>
);

const InputText: React.FC<InputProps> = ({
  control,
  name,
  label,
  placeholder,
  border,
  isRequired,
  errorText,
  mx,
  width,
  height,
  boxShadow,
  bg,
  isReadOnly,
  isDisabled,
  helperText,
  maxLength,
  mask,
  onBlurSubmit,
  onEnterSubmit,
}) => (
  <Field
    color="white"
    label={label}
    errorText={errorText}
    required={isRequired}
    helperText={helperText}
  >
    <Box
      bg={bg ?? "neutral.50"}
      boxShadow={boxShadow}
      width={width || "100%"}
      height={height || "200px"}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ChakraTextarea
            {...field}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={(e) => {
              field.onBlur();
              if (onBlurSubmit) {
                onBlurSubmit(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onEnterSubmit) {
                e.preventDefault();
                onEnterSubmit(field.value);
              }
            }}
            ref={mask ? withMask(mask) : undefined}
            readOnly={isReadOnly}
            maxH="200px"
            minH="200px"
            p={2}
            mx={mx}
            disabled={isDisabled}
            border={border}
            maxLength={maxLength}
            borderColor="neutral.30"
            _active={{
              borderColor: "primary.50",
            }}
            _focus={{
              borderColor: "primary.50",
            }}
            _placeholder={{ color: "#FFFFFF40" }}
            bg="transparent"
            borderRadius="4px"
          />
        )}
      />
    </Box>
  </Field>
);

const Input = {
  Base: InputBase,
  Text: InputText,
};

export default Input;
