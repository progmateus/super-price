import { Box, Flex, Text, Img } from "@chakra-ui/react";
import { titleCase } from "../../utils/titleCase";


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
        <Flex
            bg="#FFFFFF"
            borderRadius={4}
            align="center"
            w={["100%", "85%"]}
            h="6.8rem"
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
                    {...props.price.product.thumbnail ? (
                        { src: props.price.product.thumbnail }
                    ) :
                        { src: "https://cosmos.bluesoft.com.br/assets/product-placeholder-ce4926921923d1e9bc66cd0e1493b49b.png" }
                    }
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
                    fontWeight="bold">
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