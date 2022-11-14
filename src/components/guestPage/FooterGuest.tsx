import { Box, Flex, Heading, Text, HStack, Icon, Link } from "@chakra-ui/react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";

export function FooterGuest() {
    return (
        <Box p={["2", "4"]}>
            <Heading size="lg"> Superprice </Heading>
            <Text mt={["2", "2"]} fontSize={[12, 14]}> O SuperPrice é um aplicativo que permite á você,
                nosso usuário, buscar pelo menor preço entre os supermercados mais próximos. Tendo como maior
                objetivo aumentar as chances de passar todos os produtos da sua lista para o carrinho e assim
                para a sua casa


            </Text>
            <Flex justify="center" mt={["6", "4"]}>
                <HStack spacing="8">
                    <Link href="http://www.facebook.com/" _focus={{ outline: "none" }}>
                        < Icon as={FaFacebookSquare} fontSize={[18, 20]} opacity={0.4} />
                    </Link>
                    <Link href="http://www.instagram.com/" _focus={{ outline: "none" }}>
                        <Icon as={BsInstagram} fontSize={[18, 20]} opacity={0.4} />
                    </Link>
                    <Link href="http://www.twitter.com/" _focus={{ outline: "none" }}>
                        <Icon as={BsTwitter} fontSize={[18, 20]} opacity={0.4} />
                    </Link>
                </HStack>
            </Flex>
        </Box>
    )
}