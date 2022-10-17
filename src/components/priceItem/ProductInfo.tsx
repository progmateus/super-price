import { Box, Flex, Text } from "@chakra-ui/react";


interface ProductInfoProps {
    name: string;
    price: number
}

export function ProductInfo(props: ProductInfoProps) {
    return (
        <Box
            w={["20rem", "26rem"]}
            p="2"
            h="100%"
        >
            <Text
                fontSize={["xs", "1rem"]}
                noOfLines={2}
                color="gray.900"
                lineHeight="1.1"
                textAlign="left"
                fontWeight="bold"
            >
                {props.name}
            </Text>

            <Text
                mt={["5", "15"]}
                color="green.500"
                fontSize={["lg", "2xl"]}
                fontWeight="bold"
            >
                {props.price}
            </Text>
        </Box>
    )
}