import { Box, Button, Flex, Img, Link, Text } from "@chakra-ui/react";
interface ProductItemProps {
    product: {
        id: string;
        name: string;
        gtin: string;
        brand: string;
        thumbnail: string;
    }
}

export function ProductItem(props: ProductItemProps) {
    return (
        <Flex w={["90", "60vw"]} p="2" bg="#FFFFFF" h="24" borderRadius={4}>
            <Box
                w={["21%", "10%"]}
                h="20"
                m="1"
                maxWidth="95px"
            >
                {
                    props.product.thumbnail ? (
                        <Img
                            maxWidth="100%"
                            maxHeight="100%"
                            mx="auto"

                            src={props.product.thumbnail}
                        />
                    ) :
                        <Img
                            maxWidth="100%"
                            maxHeight="100%"
                            mx="auto"

                            src="https://cosmos.bluesoft.com.br/assets/product-placeholder-ce4926921923d1e9bc66cd0e1493b49b.png"
                        />
                }
            </Box>
            <Box
                w="55%"
                p="2"
            >
                <Text
                    fontSize={["xs", "1rem"]}
                    color="gray.900"
                    noOfLines={2}
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
                p={["2", "5"]}
            >
                <Link
                    href={`/prices?gtin=${props.product.gtin}`}
                    alignSelf="center"
                    ml="auto"
                    _hover={{ textDecoration: "none" }}
                >

                    <Button
                        size="sm"
                        fontSize={["xs", "sm"]}
                        bg="purple.500"
                        textDecoration="none"
                        _hover={{ bgColor: "purple.600", textDecoration: "none" }}

                    >
                        Buscar
                    </Button>
                </Link>
            </Flex>
        </Flex>
    )

}