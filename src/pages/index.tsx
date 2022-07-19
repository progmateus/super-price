import { Box, Button, Flex, Heading, HStack, Icon, Img, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";



export default function Home() {


    // if (typeof window) {

    //     const header = document.querySelector("#header")

    //     window.onscroll = () => {
    //         let top = window.scrollY;
    //         if (top > 100) {
    //             console.log("Teste")
    //         }
    //     }
    // }

    return (
        <Box bg="white">
            <Box
                position="fixed"
                w="100%"
                bg="brand.600"
                h={["16", "20"]}
                mx="auto"
                px={["3", "6"]}
                py="4"
                zIndex={1}
            >
                <Flex align="center">
                    <Text
                        fontSize={["2xl", "3xl"]}
                        fontWeight="bold"
                        letterSpacing="tight"
                        w="64"> Superprice
                        <Text as="span" ml="1" color="pink.500">.</Text>
                    </Text>

                    <Flex ml="auto">
                        <HStack spacing="12">

                            <Link href="/signin" textDecoration="none" >

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
                            <Link href="/signup" textDecoration="none">
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
                    </Flex>
                </Flex>
            </Box>
            <Flex as="section" color="gray.900" minHeight="100vh">

                <Box mt="auto" >
                    <Img w="45rem" src="/images/hands.png" />
                </Box>


                <Box mr="auto" my="auto">
                    <Heading mb="4" size="3xl" >
                        Preços em <br />
                        Supermercados
                    </Heading>
                    <Text mb="4" fontSize={28}>
                        Consulte, Compare e Economize<br />
                        nas suas Compras em <br />
                        Supermercados da sua cidade
                    </Text>

                    <Box textAlign="center">
                        <Button
                            color="white"
                            bg="#EB86C3"
                            _hover={{
                                bgColor: "#CA61AB"
                            }}
                            size="lg"
                            borderRadius={100}
                            w="60"
                        > COMEÇAR JÁ
                        </Button>
                    </Box>
                </Box>
            </Flex>

            <Box as="section" bg="#2C6A7C" minHeight="100vh" pt="12" >

                <Box textAlign="center" >
                    <Text fontWeight="bold" mb="4" opacity={0.7}> S O B R E</Text>
                    <Heading size="lg">
                        O que é o <br />
                        Super Price?
                    </Heading>
                </Box>


                <Flex justify="center" align="center" mt="8">
                    <Flex align="center" >
                        <Box fontSize={14}>
                            <Text mb="4">
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry. <br />
                                Lorem Ipsum has been the industry's
                                standard dummy text ever since the <br />
                                1500s, when an unknown printer took a galley of type and scrambled it to <br />
                                make a type specimen book. It has survived not only five centuries, but also <br />
                                the leap into electronic typesetting, remaining essentially unchanged. It was <br />
                                popularised in the 1960s with the release of Letraset sheets containing <br />
                                Lorem Ipsum passages, and more recently with desktop publishing <br />
                                software like Aldus PageMaker including versions of Lorem Ipsum. <br />
                            </Text>
                            <Text>
                                Why do we use it? < br />
                                It is a long established fact that a reader will be distracted by the readable <br />
                                content of a page when looking at its layout. The point of using Lorem <br />
                                Ipsum is that it has a more-or-less normal distribution of letters, as <br />
                                opposed to using 'Content here, content here', making it look like readable <br />
                                English. Many desktop publishing packages and web page editors now use <br />
                                Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will <br />
                                uncover many web sites still in their infancy. Various versions have evolved <br />
                                over the years, sometimes by accident, sometimes on purpose (injected <br />
                                humour and the like).
                            </Text>
                        </Box>
                        <Icon ml="20" as={AiOutlineInfoCircle} fontSize={300} opacity={0.3} />
                    </Flex>
                </Flex>

            </Box>

            <Box as="section" bg="#20546A" minHeight="100vh" pt="12" >
                <Flex justify="center">
                    <Box>
                        <Flex align="center">
                            <Heading size="lg">
                                Um jeito inteligente e econômico <br /> de fazer compras!
                            </Heading>
                            <Text ml="18rem" fontSize={16}>
                                O Superprice é a melhor ferramenta colaborativa de <br />
                                decisão de compras. Consulte, compare e economize!
                            </Text>
                        </Flex>
                        <SimpleGrid minChildWidth="360px" w="100%">
                            <Box w="14rem" h="15rem" borderWidth={2} borderColor="white" bg="#20546A" >
                                a
                            </Box>
                            <Box w="14rem" h="15rem" borderWidth={2} borderColor="white" bg="#20546A" >
                                a
                            </Box>
                            <Box w="14rem" h="15rem" borderWidth={2} borderColor="white" bg="#20546A" >
                                a
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Flex>
            </Box>
        </Box >
    )
}