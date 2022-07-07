import { Flex, Text } from "@chakra-ui/react";

export function HeadingTable() {
    return (
        <Flex
            w={["70vw", "65vw"]}
            justify="space-between"
            color="black"
            fontWeight="bold"
            fontSize={["12", "16"]}
            mx={["4", "8"]}
            mb="8"
            opacity={0.6}
        >
            <Text  > PREÇO </Text>
            <Text > SUPERMERCADO </Text>
            <Text > ATUALIZAÇÃO </Text>

        </Flex>
    )

}