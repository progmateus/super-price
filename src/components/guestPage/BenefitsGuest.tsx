import { Box, Text, Heading, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { AiOutlineLineChart } from "react-icons/ai";
import { BsCurrencyDollar, BsSearch } from "react-icons/bs";


export function BenefitsGuest() {
    return (
        <Flex justify="center">
            <Box pt={["0", "4rem"]}>
                <Flex
                    display={["block", "block", "flex", "flex"]}
                    align="center"
                    px={["4", "4", "6", "0"]}
                >
                    <Heading size="lg" textAlign={["left", "left"]}>
                        Um jeito inteligente e econômico
                        <br />
                        de fazer compras!
                    </Heading>

                    <Text
                        mt={["8", "8", "0", "0"]}
                        ml={["0", "0", "9rem", "14rem"]}
                        w={["18rem", "27rem"]}
                        fontSize={16}
                        textAlign={["left", "left"]}
                    >
                        O Superprice é a melhor ferramenta colaborativa de
                        decisão de compras. Consulte, compare e economize!
                    </Text>
                </Flex>

                <SimpleGrid
                    columns={3}
                    minChildWidth="320px"
                    px="4"
                    w="100%"
                    mt="4rem"
                >
                    <Box
                        mx={["auto", "auto", "auto", "0"]}
                        w="17rem"
                        h="19rem"
                        borderWidth={1}
                        borderRadius={10}
                        borderColor="white"
                        bg="#20546A"
                        p="6"
                    >
                        <Icon as={BsSearch} fontSize={60} />

                        <Heading size="md" mt="6"> Consulte </Heading>

                        <Text fontSize={14} mt="4" >
                            Conseguimos dizer para você por quanto um produto
                            está sendo vendido em um determinado supermercado
                            com base nas sugestões de outros usuários
                        </Text>
                    </Box>

                    <Box
                        mx={["auto", "auto", "auto", "0"]}
                        mt={["8", "8", "0", "0"]}
                        w="17rem"
                        h="19rem"
                        borderWidth={1}
                        borderRadius={10}
                        borderColor="white"
                        bg="#20546A"
                        p="6"
                    >
                        <Icon as={AiOutlineLineChart} fontSize={60} />
                        <Heading size="md" mt="6"> Compare </Heading>
                        <Text fontSize={14} mt="4" >
                            Compare o preço de um produto em outros supermercados da sua cidade
                        </Text>
                    </Box>

                    <Box
                        mx={["auto", "auto", "auto", "0"]}
                        mt={["8", "8", "12", "0"]}
                        mb="8"
                        w="17rem"
                        h="19rem"
                        borderWidth={1}
                        borderRadius={10}
                        borderColor="white"
                        bg="#20546A"
                        p="6"
                    >
                        <Icon as={BsCurrencyDollar} fontSize={60} />
                        <Heading size="md" mt="6"> Economize </Heading>
                        <Text fontSize={14} mt="4" >
                            Encontre o produto com o preço que mais cabe no seu bolso
                        </Text>
                    </Box>
                </SimpleGrid>
            </Box>
        </Flex>
    )
}