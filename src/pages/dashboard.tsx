import { Box, Flex, Img, Stack, Text } from "@chakra-ui/react"
import Sidebar from "../components/sidebar"
import { Header } from "../components/header"
import { Price } from "../components/price"


export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my={["4", "6"]} maxWidth={1480} mx="auto" px="1">
                <Sidebar />

                <Box>
                    <Stack spacing="2" >
                        <Price
                            product_image_url="https://cdn-cosmos.bluesoft.com.br/products/7891910000197"
                            product_name="AÇUCAR REFINADO UNIÃO 1KG"
                            price={7.99}
                            supermarket_name="Supermercados Mundial"
                        />
                        <Price
                            product_image_url="https://cdn-cosmos.bluesoft.com.br/products/7896001001091"
                            product_name="SPANADOR BETTANIN MICROFIBRA 109"
                            price={7.99}
                            supermarket_name="cerrefour"
                        />
                        <Price
                            product_image_url="https://cdn-cosmos.bluesoft.com.br/products/7891910000197"
                            product_name="PACK BISCOITO INTEGRAL RECHEIO REQUEIJÃO CLUB SOCIAL PACOTE 106G 4 UNIDADES"
                            price={7.99}
                            supermarket_name="Supermercados Mundial"
                        />
                        <Price
                            product_image_url="https://cdn-cosmos.bluesoft.com.br/products/7899674027481"
                            product_name="DESOD ABOVE ELEMENTS OCEAN ACO 150ML/90G"
                            price={7.99}
                            supermarket_name="prezunic"
                        />
                    </Stack>
                </Box>

            </Flex>
        </Flex >

    )
}
