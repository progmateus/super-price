import * as React from "react";
import { Box, Button, Flex, Heading, HStack, Icon, Img, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { Header } from "../components/header";
import { withSSRAuth } from "../utils/withSSRAuth";
import Sidebar from "../components/sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { titleCase } from "../utils/titleCase";

import { setupAPIClient } from "../services/api";
import encodeQueryData from "../utils/encodeURL";
import { PriceModal } from "../components/priceModal";
import { usePriceModal } from "../contexts/PriceModalContext";
import { useEffect, useState } from "react";

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

export default function Prices(props) {

    const { handleOpenPriceModal, price, setPrice } = usePriceModal();

    function handleSubmitEditPrice(price: any) {
        setPrice(price)
        handleOpenPriceModal()
    }
    function handleSubmitCreatePrice() {
        setPrice({})
        handleOpenPriceModal()
    }
    return (
        <Box>
            <Header />
            <Flex my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    flex="1"
                    bg="#FFFFFF"
                    borderRadius={6}
                >
                    <Flex>
                        <Box mx="auto" maxWidth="500px" textAlign="center" mt="2">
                            <Text color="gray.900" fontWeight="bold" mb="2" fontSize={["sm", "lg"]} > PACK BISCOITO INTEGRAL RECHEIO REQUEIJÃO CLUB SOCIAL PACOTE 106G 4 UNIDADES </Text>
                            {props.prices[0].product.thumbnail && (
                                <Box
                                    w={["15", "15"]}
                                    mx="auto"
                                    maxWidth="200px"
                                    maxHeight="200px"
                                >
                                    <Img
                                        src={props.prices[0].product.thumbnail}
                                    />
                                </Box>

                            )}
                            <Text color="gray.800" fontSize="lg" mt="2" w="100%"> União </Text>
                        </Box>

                    </Flex>

                    <Box borderRadius={8} mt="2">

                        <Flex mb="8" mt="10" align="center">
                            <Button
                                mx="auto"
                                onClick={handleSubmitCreatePrice}
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

                                props.prices.length > 0 ? (
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
                                                    onClick={() => handleSubmitEditPrice(price)}
                                                >
                                                    <Icon as={RiPencilLine} fontSize={["12", "16"]} />
                                                </Button>
                                            </Flex>
                                        )
                                    })

                                ) :
                                    <Box> NENHUM PREÇO ENCONTRADO </Box>
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
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get(`/prices/${urlEncoded}`)

    const { data: prices } = response

    prices.map((price) => {
        price.supermarket.name = titleCase(price.supermarket.name);
        price.product.name = price.product.name.toUpperCase();
        price.price.price = new Intl.NumberFormat("pt-br", {
            style: 'currency',
            currency: 'BRL'
        }).format(price.price.price);
        price.price.updated_at = new Date(price.price.updated_at).toLocaleDateString
            ("pt-br", {
                day: "2-digit",
                month: "long",
            });
    })
    return {
        props: {
            prices
        }
    }

});

