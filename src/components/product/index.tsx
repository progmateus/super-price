import { Box, Button, Flex, Img, Link, Text } from "@chakra-ui/react";
interface ProductProps {
    product: {
        id: string;
        name: string;
        gtin: string;
        brand: string;
        thumbnail: string;
    }
}

export function Product(props: ProductProps) {
    return (
        <Flex w="70" bg="#FFFFFF" p="2" h="4vh" minHeight={["14vh", "17vh"]} borderRadius={6}>
            <Box
                w={["21%", "10%"]}
                h="20"
                m="1"
                maxWidth="95px"
            >
                <Img
                    maxWidth="100%"
                    maxHeight="100%"
                    mx="auto"

                    src={props.product.thumbnail}
                />
            </Box>
            <Box
                w="55%"
                p="2"
            >
                <Text
                    fontSize={["xs", "1rem"]}
                    color="gray.900"
                    lineHeight="1.1"
                    textAlign="left"
                    fontWeight="bold"
                >
                    {props.product.name}
                </Text>

                <Text
                    color="gray.500"
                    mt={["2", "5"]}
                    fontSize={["sm", "sm"]}
                >
                    {props.product.brand}
                </Text>
            </Box>
            <Flex
                w="35%"
                p="5"
            >
                <Link
                    href={`/prices?gtin=${props.product.gtin}`}
                    alignSelf="center"
                    ml="auto">
                    <Button as="a"
                        size="sm"
                        fontSize={["xs", "sm"]}
                        bg="purple.500"
                    > Buscar preços
                    </Button>
                </Link>
            </Flex>
        </Flex>
    )
}