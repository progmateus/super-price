import { Box, Flex, Text, Img } from "@chakra-ui/react";
import { titleCase } from "../../utils/titleCase";
import { ProductImage } from "./productImage";
import { ProductInfo } from "./ProductInfo";
import { SupermarketName } from "./supermarketName";


interface PriceItemProps {
    price: {
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

}

export function PriceItem(props: PriceItemProps) {
    return (
        // <Flex w={["22rem", "50rem"]} p="2" bg="#FFFFFF" h="28" borderRadius={4} >
        //     <ProductImage thumbnail={props.price.product.thumbnail} />
        //     <ProductInfo name={props.price.product.name} price={props.price.price.price} />
        //     <SupermarketName name={props.price.supermarket.name} />
        // </Flex >

        <Flex
            bg="#FFFFFF"
            borderRadius={4}
            align="center"
            w={["100%", "85%"]}
        >
            <Box
                w={["7rem", "5rem"]}
                m="1"
                textAlign="center"

            >
                <Img
                    maxWidth={[55, 95]}
                    maxHeight={20}
                    mx="auto"
                    src={props.price.product.thumbnail}
                />
            </Box>

            <Box
                w={["20rem", "26rem"]}
                py="2"
            >
                <Text
                    fontSize={[11, 16]}
                    noOfLines={2}
                    color="gray.900"
                    lineHeight="1.1"
                    textAlign="left"
                    fontWeight="bold"
                /// bg="red.100"
                >
                    {props.price.product.name}
                </Text>

                <Text
                    mt={["1.2rem", "2rem"]}
                    color="green.500"
                    fontSize={["lg", "2xl"]}
                    fontWeight="bold"
                >
                    {props.price.price.price}
                </Text>
            </Box>

            <Flex
                align="center"
                justify="center"
                w="12rem"
                px={2}
            >
                <Text
                    fontSize={[10, 16]}
                    fontWeight="medium"
                    color="gray.700"
                    textAlign="center"
                >
                    {titleCase(props.price.supermarket.name)}
                </Text>
            </Flex>

            <Box>

            </Box>
        </Flex>
    )
}