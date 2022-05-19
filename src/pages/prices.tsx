import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { Header } from "../components/header";
import { withSSRAuth } from "../utils/withSSRAuth";
import { api } from "../services/apiClient";
import Sidebar from "../components/sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { titleCase } from "../utils/titleCase";



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
    const [prices, setPrices] = useState([])

    useEffect(() => {
        /// const urlParams = new URLSearchParams(window.location.search);

        try {
            api.get(`/prices/${window.location.search}`).then((response) => {

                response.data.map((price) => {
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
                setPrices(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8" >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal"> Preços</Heading>

                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                        >
                            Criar preço
                        </Button>

                    </Flex>

                    <Table colorScheme="whiteAlpha">
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
                            {
                                prices.map((price: PriceProps) => {
                                    console.log(price)
                                    return (
                                        <Tr key={price.price.id}>
                                            <Td>

                                                <Text fontWeight="bold"> {price.price?.price} </Text>
                                            </Td>
                                            <Td>
                                                <Text > {price.supermarket?.name} </Text>
                                            </Td>
                                            <Td>
                                                <Text as="em"> {price.price?.updated_at} </Text>
                                            </Td>
                                            <Td><Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                            >
                                                Editar
                                            </Button></Td>


                                        </Tr>
                                    )
                                })
                            }
                        </Tbody>

                    </Table>

                </Box>
            </Flex>
        </Box>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    return {
        props: {
        }
    }
});

