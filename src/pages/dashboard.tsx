import { Box, Flex, Img, Text } from "@chakra-ui/react"
import Sidebar from "../components/sidebar"
import { Header } from "../components/header"


export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="1">
                <Sidebar />

                <Flex w="100%" bg="gray.800" minHeight={["12vh", "5vh"]} h="17vh">

                    <Img
                        src="https://cdn-cosmos.bluesoft.com.br/products/7891910000197"
                        m="1"
                    >

                    </Img>
                    <Box
                        w="70%"
                        p="2"
                    >
                        <Text fontSize={["xs", "lg"]} textAlign="left" fontWeight="bold" >PACK BISCOITO INTEGRAL RECHEIO REQUEIJÃO CLUB SOCIAL PACOTE 106G 4 UNIDADES</Text>

                        <Text mt={["2", "15"]} fontSize={["xs", "2xl"]} >R$5,99 </Text>

                    </Box>

                    <Flex
                        w="30%"
                    >
                        <Text
                            m="auto"
                            fontSize={["xs", "2xl"]}
                            fontWeight="bold"
                            textAlign="center"
                        >
                            Supermercados Mundial
                        </Text>
                    </Flex>

                </Flex>
            </Flex>
        </Flex >

    )
}
