import * as React from "react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Flex, Icon, Img, SimpleGrid, Stack, StackDivider, Text } from "@chakra-ui/react"
import { Header } from "../components/header";
import { withSSRAuth } from "../utils/withSSRAuth";
import Sidebar from "../components/sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { titleCase } from "../utils/titleCase";

import { setupAPIClient } from "../services/api";
import encodeQueryData from "../utils/encodeURL";
import { PriceModal } from "../components/priceModal";
import { usePriceModal } from "../contexts/PriceModalContext";
import { Input } from "../components/form/Input";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { useState } from "react";

interface PriceProps {
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
const searchFormSchema = yup.object().shape({
    gtin: yup.string().required("Campo obrigatório"),
})
export default function Prices(props) {

    const { handleOpenPriceModal, price, setPrice, setType } = usePriceModal();

    const { register, handleSubmit, formState } = useForm(({
        resolver: yupResolver(searchFormSchema)

    }));

    const { errors } = formState;


    function handleSubmitPrice(price: any, type) {
        setPrice(price)
        setType(type)
        handleOpenPriceModal()
    }

    function handleSubmitSearch(value) {
        const urlEncoded = encodeQueryData(value);
        Router.push(`/prices/${urlEncoded}`)
    }
    return (
        < Box >
            <Header />
            <Flex my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    flex="1"
                    bg="#FFFFFF"
                    borderRadius={6}
                >
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
                                color="gray.900"
                                w="25"
                                label="Supermercado"
                                focusBorderColor="brand.500"
                                borderColor="gray.500"
                                bgColor="white"
                                variant="outline"
                                _hover={{ bgColor: "gray.100" }}
                                size="lg"
                                {...register("supermarket_name")}
                            />
                            <Button type="submit" mx="auto" mt={["0", "8"]} bg="purple" w="20" > Buscar </Button>

                        </SimpleGrid>

                        {
                            props.error?.message === "Product not found!" && (
                                <Text textAlign={["center", "left"]} color="#FF3B2D"> Produto não encontrado </Text>
                            )
                        }

                    </Box>

                    {
                        props.product ? (
                            <Flex>
                                <Box mx="auto" maxWidth="500px" textAlign="center" mt="2">
                                    <Text color="gray.900" fontWeight="bold" mb="2" fontSize={["sm", "lg"]} > {props.product.name} </Text>

                                    {props.product.thumbnail ? (
                                        <Box
                                            w={["15", "15"]}
                                            pt="2"
                                            mx="auto"
                                            maxWidth="200px"
                                            maxHeight="200px"
                                        >
                                            <Img
                                                h="40"
                                                mx="auto"
                                                src={props.product.thumbnail} />
                                        </Box>
                                    ) :
                                        <Box
                                            w={["15", "15"]}
                                            mx="auto"
                                            maxWidth="200px"
                                            maxHeight="200px"
                                        >
                                            <Img src="https://cosmos.bluesoft.com.br/assets/product-placeholder-ce4926921923d1e9bc66cd0e1493b49b.png" />
                                        </Box>
                                    }

                                    <Text color="gray.500" fontSize="lg" mt="2" w="100%"> {props.product.brand} </Text>
                                </Box>

                            </Flex>
                        ) :
                            props.error && props.error.message === "Product not found" && (
                                <Box mt="8">
                                    <Text textAlign="center" color="#FF3B2D"> Produto não encontrado </Text>
                                </Box>
                            )
                    }

                    <Box borderRadius={8} mt="2" pb="3">

                        <Flex mb="8" mt="10" align="center">
                            <Button
                                mx="auto"
                                onClick={() => handleSubmitPrice({}, "create")}
                                as="a"
                                size="sm"
                                fontSize="sm"
                                bg="brand.700"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Criar preço
                            </Button>
                        </Flex>

                        <Flex
                            w={["70vw", "65vw"]}
                            justify="space-between"
                            color="black"
                            fontWeight="bold"
                            fontSize={["12", "16"]}
                            mx={["4", "8"]}
                            mb="8"
                        >
                            <Text > PREÇO </Text>
                            <Text > SUPERMERCADO </Text>
                            <Text > ATUALIZAÇÃO </Text>

                        </Flex>

                        <Stack spacing="4" divider={<StackDivider borderColor='gray.200' />} >

                            {

                                props.prices.length > 0 && (
                                    props.prices.map((price: PriceProps) => {

                                        return (

                                            <Flex
                                                key={price.price?.id}
                                                mr="3"
                                                ml={["0", "5"]}
                                                alignItems="center"

                                            >

                                                <Flex
                                                    w={["70vw", "65vw"]}
                                                    justify="space-between"
                                                    alignItems="center"
                                                    textAlign="center"
                                                    fontSize={["12", "16"]}
                                                    color="gray.900"
                                                >
                                                    <Text ml="2" w={["16", "20"]} textAlign="left" fontWeight="bold" color="green.500" >{price.price.price}</Text>
                                                    <Text w={["24", "32"]} fontWeight="bold"> {price.supermarket?.name}</Text>
                                                    <Text w={["16", "20"]}  > {price.price?.updated_at}</Text>
                                                </Flex>


                                                <Button
                                                    ml="auto"
                                                    as="a"
                                                    size="xs"
                                                    fontSize="sm"
                                                    colorScheme="purple"
                                                    onClick={() => handleSubmitPrice(price, "edit")}
                                                >
                                                    <Icon as={RiPencilLine} fontSize={["12", "16"]} />
                                                </Button>
                                            </Flex>
                                        )
                                    })

                                )
                            }

                        </Stack>


                    </Box>
                </Box>


                <PriceModal key={price.price?.id} price={price} />

            </Flex >
        </Box >
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    const urlEncoded = encodeQueryData(ctx.query);
    const query = ctx.query;
    const apiClient = setupAPIClient(ctx);
    let error = null
    let prices = [];
    let product = null

    if (query.gtin) {

        try {

            const productResponse = await apiClient.get(`/products/${query.gtin}`)

            const data = productResponse.data;

            product = {
                id: data.id,
                name: data.name.toUpperCase(),
                gtin: data.gtin,
                brand: data.brand.toUpperCase(),
                thumbnail: data.thumbnail,
                created_at: data.created_at,
                updated_at: data.updated_at
            }

            const response = await apiClient.get(`/prices/${urlEncoded}`)
            const { data: pricesResponse } = response

            pricesResponse.map((price) => {
                price.supermarket.name = titleCase(price.supermarket.name);
                price.product.name = price.product.name.toUpperCase();
                price.price.price = new Intl.NumberFormat("pt-br", {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.price.price);
                price.price.updated_at = new Date(price.price.updated_at).toLocaleDateString
                    ("pt-br", {
                        day: "2-digit",
                        month: "2-digit",
                    });
            })

            prices = pricesResponse


        } catch (err) {
            error = err.response.data
        }

    }

    return {
        props: {
            error,
            product,
            prices,
            query
        }
    }

});

