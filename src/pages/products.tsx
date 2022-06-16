import { Box, Input, Button, Flex, Icon, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react"
import Router from "next/router";
import { useForm } from "react-hook-form";
import { RiSearchLine } from "react-icons/ri";
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

    const { register, handleSubmit, formState } = useForm(({}));


    function handleSearchProduct(data) {

        const payload = {
            product_name: data.product_name
        }

        const queryString = Object.keys(payload)
            .map(key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
            ).join("&")

        const urlEncoded = `?${queryString}`

        Router.push(`/products/${urlEncoded}`)
    }

    return (
        <Flex direction="column">
            <Header />

            <Flex my={["4", "6"]} maxWidth={1480} px="6">
                <Sidebar />

                <Box>
                    <Flex as="form" alignItems="center" py="3" onSubmit={handleSubmit(handleSearchProduct)}>

                        <Input
                            name="product_name"
                            type="text"
                            bg="white"
                            placeholder="Nome do produto"
                            w="60"
                            mr="2"
                            color="gray.900"
                            _focus={{
                                bgColor: "white",
                                borderColor: "brand.500"

                            }}
                            size="md"
                            {...register("product_name")}
                        />

                        <Button
                            type="submit"
                            colorScheme="purple"
                            size="sm"
                        >
                            Pesquisar
                        </Button>


                    </Flex>
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
                                <Box>
                                    <Text color="gray.900" > NENHUM RESULTADO ENCONTRADO </Text>
                                </Box>
                        }
                    </Stack>
                </Box>

            </Flex>
        </Flex >

    )
}
export const getServerSideProps = withSSRAuth(async (ctx) => {


    const apiClient = setupAPIClient(ctx);

    const query = ctx.query;

    let response;

    console.log(query);

    if (query.product_name) {

        response = await apiClient.get(`/products/name/?name=${query.product_name}`)

    }

    if (!query.product_name) {
        response = await apiClient.get("/products")
    }

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