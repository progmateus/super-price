import { Box, Button, Flex, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import Router from "next/router";
import { replaceBasePath } from "next/dist/server/router";
import { useEffect, useState } from "react";
import { appendErrors, SubmitHandler, useForm } from "react-hook-form";
import { usePriceModal } from "../../contexts/PriceModalContext";
import { api } from "../../services/apiClient";
import encodeQueryData from "../../utils/encodeURL";
import { Input } from "../form/Input"
import { InputMask } from "../form/inputMask";
import { useRouter } from "next/router";


interface PriceModalProps {
    product: {
        id: string;
        name: string;
        gtin: string;
        brand: string;
        thumbnail: string;
    }
    price: {
        id: string;
        price: number;
        user_id: string;
        created_at: string;
        updated_at: string;
    },
    supermarket: {
        id: string;
        name: string;
    }
}

type CreatePriceFormData = {
    gtin: string;
    supermarket_name: string;
    price: string;
}

const priceFormSchema = yup.object().shape({
    gtin: yup.string().required("Campo obrigatório").max(50, "Limite de caracteres excedido"),
    supermarket_name: yup.string().required("Campo obrigatório").max(50, "Limite de caracteres excedido"),
    price: yup.string().required("Campo obrigatório").max(12, "Limite de caracteres excedido").min(1)
})

export function PriceModal(props) {

    const { asPath } = useRouter();

    const { handleClosePriceModal, isOpen, price, type } = usePriceModal();

    const [apiError, setApiError] = useState("");


    const { register, handleSubmit, formState } = useForm(({
        defaultValues: {
            gtin: price.product?.gtin,
            supermarket_name: price.supermarket?.name,
            price: ''
        },
        resolver: yupResolver(priceFormSchema)
    }));

    const { errors } = formState;

    const handleCreatePrice: SubmitHandler<CreatePriceFormData> = async (values) => {

        let priceReplaced = values.price.replace(".", "")
        priceReplaced = priceReplaced.replace(",", ".")

        switch (type) {

            case "create":

                const urlEncoded = encodeQueryData(values);
                const getResponse = await api.get(`/prices/${urlEncoded}`)

                // if price does not exists, create
                if (getResponse.data.length !== 1) {

                    await api.post("/prices", {
                        gtin: values.gtin,
                        supermarket_name: values.supermarket_name,
                        price: Number(priceReplaced)
                    }).then(() => {
                        handleClosePriceModal();
                        window.location.reload();
                    }).catch((err) => {
                        setApiError(err.response.data.message)
                        console.log(err);
                    })

                    break;
                }

                // if price already exists, edit
                if (getResponse.data.length !== 0) {

                    await api.patch("/prices", {
                        price_id: getResponse.data[0].price.id,
                        price: Number(priceReplaced)
                    }).then(() => {
                        handleClosePriceModal();
                        Router.push(asPath)
                    }).catch((err) => {
                        console.log(err)
                        setApiError(err.response.data.message)
                    })

                    break;
                }

            case "edit":
                await api.patch("/prices", {
                    price_id: price.price?.id,
                    price: Number(priceReplaced)
                }).then(() => {
                    handleClosePriceModal();
                    window.location.reload();
                }).catch((err) => {
                    console.log(err)
                    setApiError(err.response.data.message)
                })

                break;
        }
    }

    return (

        <Modal isOpen={isOpen} onClose={handleClosePriceModal}>
            <ModalOverlay />

            <ModalContent my="auto" mx="5">

                <Box
                    as="form"
                    onSubmit={handleSubmit(handleCreatePrice)}>
                    {
                        type === "create" ? (
                            <ModalHeader
                                color="gray.900">
                                Cadastrar Preço
                            </ModalHeader>
                        ) :
                            < ModalHeader
                                color="gray.900">
                                Atualizar Preço
                            </ModalHeader>

                    }
                    <ModalCloseButton color="gray.900" />
                    <ModalBody>

                        <Stack spacing={4}>

                            <Input
                                name="gtin"
                                color="gray.900"
                                type="number"
                                label="Código do produto"
                                focusBorderColor="brand.500"
                                bgColor="white"
                                borderColor="gray.500"
                                variant="outline"
                                {...type === "edit" && { disabled: true }}
                                {...register("gtin")}
                                error={errors.gtin}
                                _hover={{ bgColor: "gray.100" }}
                                size="lg"
                            />
                            <Input
                                name="supermarket"
                                color="gray.900"
                                type="text"
                                label="Nome do Supermercado"
                                focusBorderColor="brand.500"
                                bgColor="white"
                                borderColor="gray.500"
                                variant="outline"
                                {...type === "edit" && { disabled: true }}
                                {...register("supermarket_name")}
                                error={errors.supermarket_name}
                                _hover={{ bgColor: "gray.100" }}
                                size="lg"
                            />

                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='green.500'
                                    fontSize='1.1em'
                                    mt="9"
                                    // eslint-disable-next-line react/no-children-prop
                                    children="R$"
                                />
                                <InputMask
                                    name="price"
                                    type="text"
                                    color="gray.900"
                                    ml="1"
                                    pl="7"
                                    w="40"
                                    label="Preço"
                                    mask="currency"
                                    focusBorderColor="brand.500"
                                    bgColor="white"
                                    borderColor="gray.500"
                                    variant="outline"
                                    {...register("price", { required: true })}
                                    error={errors.price}
                                    _hover={{ bgColor: "gray.100" }}
                                    size="lg"
                                />
                            </InputGroup>
                        </Stack>

                        {
                            apiError && apiError === "Product not found" && (
                                <Box mt="8">
                                    <Text textAlign="center" color="#FF3B2D"> produto não encontrado </Text>
                                </Box>
                            )
                        }

                    </ModalBody>

                    <ModalFooter>

                        <Button
                            type="submit"
                            bg='brand.600'
                            variant='ghost'
                            _hover={{ bgColor: "brand.500" }}
                            isLoading={formState.isSubmitting}
                        >
                            Enviar
                        </Button>
                    </ModalFooter>
                </Box >

            </ModalContent>
        </Modal >

    )
}


