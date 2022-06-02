import { Box, Flex, Stack } from "@chakra-ui/react"
import { Header } from "../components/header";
import { Price } from "../components/price";
import { Product } from "../components/product";
import Sidebar from "../components/sidebar";
import { setupAPIClient } from "../services/api";
import { titleCase } from "../utils/titleCase";
import { withSSRAuth } from "../utils/withSSRAuth";

interface ProductProps {
    id: string;
    name: string;
    gtin: string;
    brand: string;
    thumbnail: string;

}

export default function Dashboard(props) {

    return (
        <Flex direction="column">
            <Header />

            <Flex my={["4", "6"]} maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box>
                    <Stack spacing="2" >
                        {

                            props.products.length > 0 ? (
                                props.products.map((product: ProductProps) => {
                                    return (
                                        <Product
                                            key={product.id}
                                            product={product}
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

    const { data: products } = response;

    products.map((product) => {
        product.name = product.name.toUpperCase()
        product.brand = titleCase(product.brand)
    })

    return {
        props: {
            products
        }
    }
});