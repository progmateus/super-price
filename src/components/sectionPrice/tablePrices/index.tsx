import { Box, Button, Flex, Icon, Stack, StackDivider, Text } from "@chakra-ui/react"
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { usePriceModal } from "../../../contexts/PriceModalContext";
import { HeadingTable } from "./heading";
import { TableRow } from "./row";


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


interface ITablePriceProps {
    product: {
        id: string;
        name: string;
        gtin: string;
        brand: string;
        thumbnail: string;
    },
    prices: PriceProps[]
}


export function TablePrices(props) {

    return (
        <Box borderRadius={8} mt="2" pb="3">

            {
                props.product && (
                    <HeadingTable />
                )
            }
            <Stack spacing="4" divider={<StackDivider borderColor='gray.200' />} >

                {

                    props.prices.length > 0 && (
                        props.prices.map((price: PriceProps) => {

                            return (
                                <TableRow
                                    key={price.price.id}
                                    price={price}
                                />
                            )
                        })

                    )
                }

            </Stack>
        </Box>
    )
}