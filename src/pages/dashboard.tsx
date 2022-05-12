import { Box, Flex, Stack } from "@chakra-ui/react"
import Sidebar from "../components/sidebar"
import { Header } from "../components/header"
import { Price } from "../components/price"
import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"
import { titleCase } from "../utils/titleCase"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function Dashboard(props) {

    return (
        <Flex direction="column" h="100vh">
            <Header />

            <Flex w="100%" my={["4", "6"]} maxWidth={1480} mx="auto" px="1">
                <Sidebar />

                <Box>
                    <Stack spacing="2" >
                        {
                            props.data.map((price) => {
                                return (
                                    <Price
                                        key={price.price.id}
                                        price={price}
                                    />
                                )
                            })
                        }
                    </Stack>
                </Box>

            </Flex>
        </Flex >

    )
}
export const getServerSideProps = withSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/prices")

    const { data } = response;

    data.map((price) => {
        price.supermarket.name = titleCase(price.supermarket.name);
        price.product.name = price.product.name.toUpperCase()
    })

    return {
        props: {
            data
        }
    }
});


