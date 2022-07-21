import { Box, Button, Flex, HStack, Icon, IconButton, Img, Link, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";

export function HeaderGuest(props) {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const { isOpen, onClose, onOpen } = useDisclosure();
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

                        <Link href="/">
                            <Img w="12rem" src="images/letters-white.png" />
                        </Link>
                    ) :
                        <Link href="/">
                            <Img w="2rem" src="images/icon-white.png" />
                        </Link>

                }

                {
                    isWideVersion && (

                        <HStack
                            spacing="8"
                            ml="auto"
                            w="15rem"
                            justify="center"
                            fontSize={16}
                            opacity={.9}

                        >
                            <Link href="#about" > Sobre</Link>
                            <Link href="#benefits" > Vantagens</Link>
                            <Link href="#contact" > Contato</Link>
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