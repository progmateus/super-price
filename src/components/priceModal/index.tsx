import { Box, Button, Flex, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { replaceBasePath } from "next/dist/server/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePriceModal } from "../../contexts/PriceModalContext";
import { api } from "../../services/apiClient";
import encodeQueryData from "../../utils/encodeURL";
import { Input } from "../form/Input"
import { InputMask } from "../form/inputMask";


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

export function PriceModal(props) {

    const { handleClosePriceModal, isOpen, price, type } = usePriceModal();

    const [apiError, setApiError] = useState("");


    const { register, handleSubmit, setError, formState } = useForm(({
        defaultValues: {
            gtin: price.product?.gtin,
            supermarket_name: price.supermarket?.name,
            price: ''
        }
    }));

    const handleCreatePrice: SubmitHandler<CreatePriceFormData> = async (values) => {

        const priceReplaced = values.price.replace(",", ".")

        switch (type) {

            case "create":
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

        // if (type === "create") {

        //     const urlEncoded = encodeQueryData({
        //         gtin: values.gtin,
        //         supermarket_name: values.supermarket_name
        //     });

        //     try {
        //         const response = await (await api.get(`/prices/${urlEncoded}`))

        //         const { data } = response

        //         console.log(data)

        //         if (data.length > 0) {

        //             await api.patch("/prices", {
        //                 price_id: data[0].price.id,
        //                 price: Number(priceReplaced)
        //             }).then(() => {
        //                 handleClosePriceModal();
        //                 window.location.reload();
        //                 console.log("editou")
        //             })
        //         }

        //         if (data.length === 0) {
        //             await api.post("/prices", {
        //                 gtin: data[0].price.id,
        //                 supermarket_name: values.supermarket_name,
        //                 price: Number(priceReplaced)
        //             }).then(() => {
        //                 handleClosePriceModal();
        //                 window.location.reload();
        //                 console.log("criou")

        //             })
        //         }
        //     } catch (err) {
        //         if (err.response?.data.message === "Product not found!") {
        //             alert("Produto não encontrado")
        //         }

        //         console.log(err);
        //     }

        // }

        // if (type === "edit") {

        //     await api.patch("/prices", {
        //         price_id: price.price.id,
        //         price: Number(priceReplaced)
        //     }).then(() => {
        //         handleClosePriceModal();
        //         window.location.reload();
        //     }).catch((err) => {
        //         console.log(err)

        //     })
        // }
    }

    return (

        <Modal isOpen={isOpen} onClose={handleClosePriceModal}>
            <ModalOverlay />

            <ModalContent>

                <Box
                    as="form"
                    onSubmit={handleSubmit(handleCreatePrice)}>
                    <ModalHeader
                        color="gray.900"> Cadastrar Preço</ModalHeader>
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
                                    {...register("price")}
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

                        <Button type="submit" bg='brand.600' variant='ghost'
                        >Enviar</Button>
                    </ModalFooter>
                </Box >

            </ModalContent>
        </Modal >

    )
}


