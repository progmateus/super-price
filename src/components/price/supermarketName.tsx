import { Flex, Text } from "@chakra-ui/react";


interface SupermarketNameProps {
    supermarket_name: string;
}

export function SupermarketName({ supermarket_name }: SupermarketNameProps) {
    return (
        <Flex
            w="35%"
        >
            <Text
                m="auto"
                fontSize={["xs", "2xl"]}
                fontWeight="bold"
                textAlign="center"
            >
                {supermarket_name}
            </Text>
        </Flex>
    )
}