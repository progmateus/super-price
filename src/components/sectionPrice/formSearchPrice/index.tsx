import * as yup from "yup"

import Router from "next/router";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { ValidatorGTIN } from "../../../utils/validatorGTIN";
import encodeQueryData from "../../../utils/encodeURL";
import { Input } from "../../form/Input";

interface IFormSearchPrice {
    query: {
        gtin: string;
        supermarket_name: string;
    }

    error: {
        message: string;
    }
}

type searchProductFormData = {
    gtin: string;
    supermarket_name?: string;
}

const searchFormSchema = yup.object().shape({
    gtin: yup.string().required("Campo obrigatório").max(50, "Limite de caracteres excedido."),
    supermarket_name: yup.string().max(50, "Limite de caracteres excedido.")
})

export function FormSearchPrice(props: IFormSearchPrice) {

    const validatorGTIN = new ValidatorGTIN();

    const { register, handleSubmit, formState, setError, setValue } = useForm(({
        resolver: yupResolver(searchFormSchema)
    }));

    const { errors } = formState;

    useEffect(() => {

        setValue("gtin", props.query.gtin)
        setValue("supermarket_name", props.query.supermarket_name)

    }, [props.query])

    const handleSubmitSearch: SubmitHandler<searchProductFormData> = async (value) => {

        const isValidGTIN = validatorGTIN.validateGTIN(value.gtin);

        if (isValidGTIN === false) {
            setError("gtin", { message: "Código inválido" })
            return
        }

        const urlEncoded = encodeQueryData(value);
        Router.push(`/prices/${urlEncoded}`)
    }



    return (
        <Box as="form" m="6" onSubmit={handleSubmit(handleSubmitSearch)}>
            <SimpleGrid minChildWidth="240px" mx="auto" spacing={["4", "8"]} w="100%">
                <Input
                    name="gtin"
                    type="number"
                    label="Código do produto"
                    w={["25", "25"]}
                    color="gray.900"
                    focusBorderColor="brand.500"
                    borderColor="gray.500"
                    bgColor="white"
                    variant="outline"
                    _hover={{ bgColor: "gray.100" }}
                    size="lg"
                    {...register("gtin", { required: true })}
                    error={errors.gtin}

                />

                <Input
                    name="supermarket_name"
                    label="Supermercado"
                    color="gray.900"
                    w="25"
                    focusBorderColor="brand.500"
                    borderColor="gray.500"
                    bgColor="white"
                    variant="outline"
                    _hover={{ bgColor: "gray.100" }}
                    size="lg"
                    {...register("supermarket_name")}
                    error={errors.supermarket_name}
                />
                <Button
                    type="submit"
                    mx="auto"
                    mt={["0", "8"]}
                    bg="purple"
                    w="20"
                    isLoading={formState.isSubmitting}

                > Buscar
                </Button>

            </SimpleGrid>

            {
                props.error?.message === "Product not found!" && (
                    <Text textAlign={["center", "left"]} color="#FF3B2D"> Produto não encontrado </Text>
                )
            }

        </Box>
    )
}