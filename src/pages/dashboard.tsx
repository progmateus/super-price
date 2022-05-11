import { Box, Flex, Stack } from "@chakra-ui/react"
import Sidebar from "../components/sidebar"
import { Header } from "../components/header"
import { Price } from "../components/price"
import { withSSRAuth } from "../utils/withSSRAuth"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api"
import { type } from "os"
import { titleCase } from "../utils/titleCase"


type price = {
    name: "teste",
    gtin: "testando",
    brand: "string",
    thumbnail: "string",
}

export default function Dashboard(props) {

    console.log(props.data);

    return (
        <Flex direction="column" h="100vh">
            <Header
                userName=""
                userEmail=""
                userAvatar=""
            />

            <Flex w="100%" my={["4", "6"]} maxWidth={1480} mx="auto" px="1">
                <Sidebar />

                <Box>
                    <Stack spacing="2" >

                        {
                            props.data.map((price) => {
                                return (
                                    <Price key={price.id}
                                        product_image_url={price.thumbnail}
                                        product_name={price.name.toUpperCase()}
                                        price={7.99}
                                        supermarket_name={titleCase(price.brand)}
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

    const response = await apiClient.get("/products")

    const { data } = response;



    return {
        props: {
            data
        }
    }
});


