import { Box, Flex, Heading, Text, HStack, Icon, Link } from "@chakra-ui/react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";

export function FooterGuest() {
    return (
        <Box>
            <Heading size="2xl"> SuperPrice </Heading>
            <Text mt={["2", "4"]} fontSize={[12, 16]}> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book.
            </Text>
            <Flex justify="center" mt={["6", "4"]}>
                <HStack spacing="8">
                    <Link href="http://www.facebook.com/">
                        < Icon as={FaFacebookSquare} fontSize={[32, 40]} opacity={0.4} />
                    </Link>
                    <Link href="http://www.instagram.com.com/">
                        <Icon as={BsInstagram} fontSize={[32, 40]} opacity={0.4} />
                    </Link>
                    <Link href="http://www.twitter.com/">
                        <Icon as={BsTwitter} fontSize={[32, 40]} opacity={0.4} />
                    </Link>
                </HStack>
            </Flex>
        </Box>
    )
}