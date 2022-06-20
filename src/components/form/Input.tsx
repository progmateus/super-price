import { FormControl, FormErrorMessage, FormLabel, forwardRef, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { ForwardRefRenderFunction, useCallback } from "react";
import { FieldError } from "react-hook-form";
interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
    mask?: "currency"
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name} color="gray.900">{label}</FormLabel>}

            <ChakraInput
                name={name}
                id={name}
                color="gray.900"
                focusBorderColor="brand.500"
                bgColor="white"
                _hover={{
                    bgColor: "white"
                }}
                variant="filled"
                size="lg"
                ref={ref}
                {...rest}
            />

            {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )

}

export const Input = forwardRef(InputBase);