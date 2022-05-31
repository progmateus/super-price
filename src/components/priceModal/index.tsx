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
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePriceModal } from "../../contexts/PriceModalContext";
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

    const handleCreatePrice: SubmitHandler<CreatePriceFormData> = async (values) => {
        console.log(values)
    }

    const { handleClosePriceModal, isOpen, price } = usePriceModal();

    const { register, handleSubmit, setError, formState } = useForm(({
        defaultValues: {
            gtin: price.product?.gtin,
            supermarket_name: price.supermarket?.name,
            price: ''
        }
    }));

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
                                type="text"
                                label="Código do produto"
                                focusBorderColor="brand.500"
                                bgColor="white"
                                borderColor="gray.500"
                                variant="outline"
                                {...register("gtin")}
                                _hover={{ bgColor: "input" }}
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
                                {...register("supermarket_name")}
                                _hover={{ bgColor: "input" }}
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
                                    color="gray.900"
                                    ml="1"
                                    pl="7"
                                    w="40"
                                    type="text"
                                    label="Preço"
                                    mask="currency"
                                    focusBorderColor="brand.500"
                                    bgColor="white"
                                    borderColor="gray.500"
                                    variant="outline"
                                    {...register("price")}
                                    _hover={{ bgColor: "input" }}
                                    size="lg"
                                />
                            </InputGroup>
                        </Stack>

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


