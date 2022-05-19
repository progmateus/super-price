import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { titleCase } from "../../utils/titleCase";


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
        <Flex w={["100vw", "70vw"]} bg="gray.800" p="2" h="17vh" minHeight={["14vh", "17vh"]} borderRadius={6}>
            <Box
                w={["21%", "10%"]}
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
                    lineHeight="1.1"
                    textAlign="left"
                    fontWeight="bold"
                >
                    {props.product.name}
                </Text>
            </Box>
            <Flex
                w="35%"
            >
            </Flex>
        </Flex>
    )
}