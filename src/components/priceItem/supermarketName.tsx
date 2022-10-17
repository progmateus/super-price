import { Flex, Text } from "@chakra-ui/react";
import { titleCase } from "../../utils/titleCase";


interface SupermarketNameProps {
    name: string;
}

export function SupermarketName(props: SupermarketNameProps) {
    return (
        <Flex
            w="18rem"
        >
            <Text
                m="auto"
                fontSize={[12, "1rem"]}
                fontWeight="bold"
                color="gray.700"
                textAlign="center"
            >
                {titleCase(props.name)}
            </Text>
        </Flex>
    )
}