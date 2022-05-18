import { Box, Flex, Stack } from "@chakra-ui/react"
import { Header } from "../components/header";
import { Price } from "../components/price";
import Sidebar from "../components/sidebar";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";


export default function Dashboard(props) {

    return (
        <Flex direction="column" w="100vw" >
            <Header />

            <Flex w="100%" my={["4", "6"]} maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box>
                    <Stack spacing="2" >
                        {
                            props.products.length > 0 ? (
                                props.products.map((product) => {
                                    return (
                                        <Price
                                            key={product.id}
                                            price={product}
                                        />
                                    )
                                })

                            ) :
                                <Box> NENHUM PREÇO ENCONTRADO </Box>
                        }
                    </Stack>
                </Box>

            </Flex>
        </Flex >

    )
}
export const getServerSideProps = withSSRAuth(async (ctx) => {


    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/products")

    const { data } = response;

    data.map((product) => {
        product.name = product.name.toUpperCase()
    })

    return {
        props: {
            products: data
        }
    }
});