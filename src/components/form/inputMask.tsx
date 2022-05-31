import { FormControl, FormErrorMessage, FormLabel, forwardRef, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { ForwardRefRenderFunction, useCallback } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
    mask?: "currency"
}

export function currency(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

    e.currentTarget.value = value;
    return e;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ mask, name, label, error = null, ...rest }, ref) => {

    const handleKeyUp = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            currency(e);
        },
        [mask]
    );

    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name} color="gray.900">{label}</FormLabel>}

            <ChakraInput
                name={name}
                id={name}
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                    bgColor: "gray.900"
                }}
                size="lg"
                onKeyUp={handleKeyUp}
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

export const InputMask = forwardRef(InputBase);