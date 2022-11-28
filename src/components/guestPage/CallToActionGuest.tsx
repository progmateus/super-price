import { Box, Button, Heading, Text, Img, Link, useBreakpointValue } from "@chakra-ui/react";


export function CallToActionGuest() {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })
    return (
        <>
            {isWideVersion && (
                <Box mt="auto" ml="4rem" mr="12rem" >
                    <Img w="30rem" src="handsphone.png" />
                </Box>
            )}

            <Box
                mr="auto"
                mx={["auto", "auto", "auto", "0"]}
                my={["8rem", "8rem", "auto", "auto"]}
                w="27rem"
                px={["8", "0"]}
            >
                {!isWideVersion && (
                    <Box mt="0">
                        <Img w="12rem" mx="auto" src="logo-super-price-completed.png" />
                    </Box>
                )}

                <Box
                    mt={["10", "10", "16", "0"]}
                >
                    <Heading
                        size="2xl"
                    >
                        Preços em <br />
                        Supermercados
                    </Heading>
                    <Text
                        mt={["6", "6", "8", "15rem", "6"]}
                        fontSize={[22, 28]}
                    >
                        CONSULTE, compare e economize<br />
                        nas suas Compras em <br />
                        Supermercados da sua cidade
                    </Text>

                    <Box
                        textAlign="center"
                        mt={["10", "10", "16", "12"]}
                    >

                        <Link
                            href="/signin"
                            _hover={{
                                textDecoration: "none"
                            }}
                        >
                            <Button
                                color="white"
                                h="16"
                                bg="#E879AB"
                                _hover={{
                                    bgColor: "#C75895",
                                }}
                                _focus={{ outline: "none" }}
                                fontSize={24}
                                w={["16rem", "16rem", "20rem", "18rem"]}
                                borderRadius={100}

                            > COMEÇAR JÁ
                            </Button>
                        </Link>

                    </Box>
                </Box>
            </Box>
        </>
    )
}