import { Box, Button, Flex, Icon, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { RiPencilLine } from "react-icons/ri";
import { usePriceModal } from "../../../contexts/PriceModalContext";

interface iPrice {
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

interface ITablePriceProps {
    prices: iPrice[]
}



export function TablePrices(props: ITablePriceProps) {


    const { handleOpenPriceModal, setPrice, setType } = usePriceModal();


    function handleEditPrice(price: any, type) {
        setPrice(price)
        setType(type)
        handleOpenPriceModal()
    }

    return (
        <Box borderRadius={8} mt="4" pb="3" w="100%">

            <Table color="gray.900" w="100%" size="sm" variant="striped" >
                <Thead >
                    <Tr >
                        <Th textAlign="center" >PREÇO</Th>
                        <Th textAlign="center" >SUPERMERCADO</Th>
                        <Th px="2" >ATUALIZAÇÃO</Th>
                        <Th px="2" textAlign="center" ></Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        props.prices && props.prices.length > 0 ? (
                            props.prices.map((price) => {
                                return (
                                    <Tr key={price.price.id} >
                                        <Td textAlign="center" fontWeight="bold" color="green.500"  > {price.price.price} </Td>
                                        <Td textAlign="center" color="black">{price.supermarket.name}</Td>
                                        <Td textAlign="center" px="2"  > {price.price.updated_at} </Td>
                                        <Td px="2" >
                                            <Button
                                                ml="auto"
                                                as="a"
                                                size="xs"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                onClick={() => handleEditPrice(price, "edit")}
                                            >
                                                <Icon as={RiPencilLine} fontSize={["12", "16"]} />
                                            </Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        ) :
                            <Tr>
                                <Td></Td>
                                <Td fontWeight="bold" color="black" textAlign="center"> NENHUM PREÇO ENCONTRADO </Td>
                                <Td></Td>
                            </Tr>
                    }
                </Tbody>
            </Table>
        </Box>
    )
}