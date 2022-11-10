import * as yup from "yup"
import Router from "next/router";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Flex, Icon, SimpleGrid, Text, useBreakpointValue } from "@chakra-ui/react";
import { ValidatorGTIN } from "../../../utils/validatorGTIN";
import encodeQueryData from "../../../utils/encodeURL";
import { Input } from "../../form/Input";
import { usePriceModal } from "../../../contexts/PriceModalContext";
import { AiOutlineSearch } from "react-icons/ai";


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

    const { handleOpenPriceModal, price, setPrice, setType } = usePriceModal();


    async function handleCreatePrice(price: any, type) {
        setPrice(price)
        setType(type)
        handleOpenPriceModal()
    }

    useEffect(() => {

        setValue("gtin", props.query.gtin)
        setValue("supermarket_name", props.query.supermarket_name)

    }, [props.query])

    const isWideVersion = useBreakpointValue({
        base: false,
        md: true,
        lg: true
    })

    const handleSubmitSearch: SubmitHandler<searchProductFormData> = async (value) => {

        const isValidGTIN = validatorGTIN.validateGTIN(value.gtin);


        const xssRegex = /(\b)(on\S+)(\s*)=|javascript|<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/ig

        const isInvalidSupermarket_name = xssRegex.test(value.supermarket_name)

        if (isInvalidSupermarket_name === true) {
            setError("supermarket_name", { message: "Caracteres inválidos" })

        }

        if (isValidGTIN === false) {
            setError("gtin", { message: "Código inválido" })
            return
        }

        const urlEncoded = encodeQueryData(value);
        Router.push(`/prices/${urlEncoded}`)
    }

    return (
        <Box as="form" m="6" onSubmit={handleSubmit(handleSubmitSearch)}>
            <SimpleGrid
                minChildWidth="240px"
                spacing={["2", "4"]}
                templateColumns={["10rem, 8rem", "10rem, 8rem", "32rem auto"]}
            >
                <SimpleGrid
                    minChildWidth="240px"
                    spacing={["4", "6"]}
                >
                    <Input
                        name="gtin"
                        type="number"
                        label="Código do produto"
                        w={{
                            xs: "20rem",
                            md: "20rem",
                            lg: "14rem",
                            xl: "25rem",
                            '2xl': '25rem',
                        }}
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
                        w={{
                            xs: "20rem",
                            md: "20rem",
                            lg: "25rem",
                            xl: "15rem",
                            '2xl': '25rem',
                        }}
                        focusBorderColor="brand.500"
                        borderColor="gray.500"
                        bgColor="white"
                        variant="outline"
                        _hover={{ bgColor: "gray.100" }}
                        size="lg"
                        {...register("supermarket_name")}
                        error={errors.supermarket_name}
                    />
                </SimpleGrid>

                <SimpleGrid
                    minChildWidth="400px"
                    spacing={["6", "6", "2"]}
                    templateColumns="4rem 6rem"
                    mx={["auto", "auto", "0"]}
                    mt={["4", "0"]}
                >
                    <Button
                        size="md"
                        type="submit"
                        mx="auto"
                        mt={["0", "8"]}
                        bg="purple"
                        isLoading={formState.isSubmitting}

                    >

                        {
                            !isWideVersion ? (
                                "Buscar"
                            ) : (
                                <Icon as={AiOutlineSearch} />
                            )

                        }
                    </Button>

                    <Button
                        w="25"
                        mx="auto"
                        mt={["0", "8"]}
                        onClick={() => handleCreatePrice({
                            price: {
                                id: Math.random()
                            }
                        }, "create")}
                        bg="pink.500"
                        _hover={{ bgColor: "pink.600" }}

                    >
                        Criar preço
                    </Button>
                </SimpleGrid>

            </SimpleGrid>

            {
                props.error?.message === "Product not found!" && (
                    <Text textAlign={["center", "left"]} color="#FF3B2D"> Produto não encontrado </Text>
                )
            }

        </Box >
    )
}