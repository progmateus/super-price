import { Box, Flex, Stack } from "@chakra-ui/react"
import Sidebar from "../components/sidebar"
import { Header } from "../components/header"
import { Price } from "../components/price"
import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"


export default function Dashboard() {

    const { user } = useContext(AuthContext)

    return (
        <Flex direction="column" h="100vh">
            <Header
                userName="Diego Fernandes"
                userEmail="DiegoFernandes@email.com"
                userAvatar="https://github.com/ninkua.png"
            />

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

export const getServerSideProps = withSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/users/profile");
    console.log(response);

    return {
        props: {}
    }
});


