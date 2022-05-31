import * as React from "react";
import { Box, Button, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
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
    /// const [price, setPrice] = useState({})

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
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="#FFFFFF" p="8" >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" color="gray.900" fontWeight="normal"> Preços</Heading>

                        <Button
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

                    <Table colorScheme="blackAlpha">
                        <Thead>
                            <Tr>
                                <Th>
                                    Preço
                                </Th>
                                <Th>
                                    Supermercado
                                </Th>
                                <Th>
                                    Data de atualização
                                </Th>
                                <Th width="8">

                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {props.prices.map((price: PriceProps) => {

                                return (
                                    <Tr key={price.price.id}>
                                        <Td>

                                            <Text fontWeight="bold" color="green.500"> {price.price?.price} </Text>
                                        </Td>
                                        <Td>
                                            <Text color="gray.800"> {price.supermarket?.name} </Text>
                                        </Td>
                                        <Td>
                                            <Text as="em" color="gray.800"> {price.price?.updated_at} </Text>
                                        </Td>
                                        <Td>
                                            <Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                                onClick={() => handleSubmitEditPrice(price)}
                                            >
                                                Editar
                                            </Button></Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>

                    </Table>

                </Box>

                <PriceModal key={price.price?.id} price={price} />

            </Flex>
        </Box>
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

