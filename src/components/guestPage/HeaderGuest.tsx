import { Box, Button, Flex, HStack, Icon, IconButton, Img, Link, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";

export function HeaderGuest(props) {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Box
            position="fixed"
            w="100%"
            bg="brand.600"
            h={["14", "16"]}
            mx="auto"
            px={["4", "6"]}
            py="2"
            zIndex={1}
        >
            <Flex align="center">
                {
                    isWideVersion ? (

                        <Link href="/" _focus={{ outline: "none" }}>
                            <Img w="12rem" src="logo-super-price-letters-white.png" />
                        </Link>
                    ) :
                        <Link href="/" _focus={{ outline: "none" }}>
                            <Img w="2rem" src="logo-super-price-icon-white.png" />
                        </Link>

                }

                {
                    isWideVersion && (

                        <HStack
                            color="white"
                            spacing="8"
                            ml="auto"
                            w="15rem"
                            justify="center"
                            fontSize={17}
                            opacity={0.95}

                        >
                            <Link href="#about" _focus={{ outline: "none" }} > Sobre</Link>
                            <Link href="#benefits" _focus={{ outline: "none" }} > Vantagens</Link>
                            <Link href="#contact" _focus={{ outline: "none" }} > Contato</Link>
                        </HStack>
                    )
                }



                <Flex ml="auto">
                    {isWideVersion && (
                        <HStack spacing="12">

                            <Link
                                href="/signin"
                                textDecoration="none"
                                _hover={{ fontStyle: "none" }}
                            >

                                <Button
                                    fontSize={14}
                                    size="sm"
                                    variant="unstyled"
                                    _hover={{
                                        fontStyle: "sublime"
                                    }}
                                    _focus={{ outline: "none" }}

                                >
                                    ENTRAR
                                </Button>
                            </Link>

                            <Link
                                href="/signup"
                                textDecoration="none"
                                _hover={{ fontStyle: "none" }}
                            >
                                <Button
                                    fontSize={14}
                                    size="sm"
                                    variant="outline"
                                    textDecoration="none"
                                    _hover={{
                                        bgColor: "#EB86C3",
                                        color: "white",
                                    }}
                                    _focus={{
                                        outline: "none"
                                    }}
                                >
                                    CRIAR CONTA
                                </Button>
                            </Link>


                        </HStack>
                    )}


                    {!isWideVersion && (
                        <IconButton
                            aria-label="open navegation"
                            icon={<Icon as={RiMenuLine} />}
                            fontSize="26"
                            variant="unstyled"
                            onClick={props.onOpen}
                            mr="2"
                        >
                        </IconButton>
                    )}
                </Flex>
            </Flex>
        </Box>
    )
}