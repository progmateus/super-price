import { Flex, Link, Text } from "@chakra-ui/react";
import Router from "next/router";

export function Logo() {
    return (
        <Text
            fontSize={["2xl", "3xl"]}
            fontWeight="bold"
            letterSpacing="tight"
            w="64"
        >
            SuperPrice
            <Text as="span" ml="1" color="pink.500">.</Text>
        </Text>
    )
}