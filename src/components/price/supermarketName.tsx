import { Flex, Text } from "@chakra-ui/react";
import { titleCase } from "../../utils/titleCase";


interface SupermarketNameProps {
    name: string;
}

export function SupermarketName(props: SupermarketNameProps) {
    return (
        <Flex
            w="35%"
        >
            <Text
                m="auto"
                fontSize={["xs", "1rem"]}
                fontWeight="bold"
                textAlign="center"
            >
                {titleCase(props.name)}
            </Text>
        </Flex>
    )
}