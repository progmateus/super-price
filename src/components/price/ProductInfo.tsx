import { Box, Text } from "@chakra-ui/react";


interface ProductInfoProps {
    product_name: string;
    price: number
}

export function ProductInfo({ product_name, price }: ProductInfoProps) {
    return (
        <Box
            w="55%"
            p="2"
        >
            <Text
                fontSize={["xs", "lg"]}
                lineHeight="1.1"
                textAlign="left"
                fontWeight="bold"
            >
                {product_name}
            </Text>

            <Text
                mt={["2", "15"]}
                fontSize={["lg", "2xl"]}
                fontWeight="bold"
            >
                R${price}
            </Text>

        </Box>
    )
}