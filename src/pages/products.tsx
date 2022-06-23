import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import dynamic from "next/dynamic"
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiAlertLine, RiSearchLine } from "react-icons/ri";
import { BarCode } from "../components/barCode";
import { Input } from "../components/form/Input";
import { Header } from "../components/header";
import { Product } from "../components/product";
import Sidebar from "../components/sidebar";
import { useScannerModal } from "../contexts/ScannerModalContext";
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

type SearchProductFormData = {
    product_name: string;
}

const SearchProductFormSchema = yup.object().shape({
    product_name: yup.string().required("Nome do produto obrigatório").max(100, "Limite de caracteres excedido."),
})

const ScannerModal = dynamic(() => {
    return import("../components/scannerModal/index").then(mod => mod.ScannerModal)
})

export default function Dashboard(props) {

    const { register, handleSubmit, formState } = useForm(({
        resolver: yupResolver(SearchProductFormSchema)
    }));

    const { errors } = formState;

    const { isOpen } = useScannerModal();


    const handleSearchProduct: SubmitHandler<SearchProductFormData> = async (values) => {

        const payload = {
            product_name: values.product_name
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

            <Flex my={["4", "6"]} px="6" maxWidth={1480}>
                <Sidebar />


                <Box mx={{ sm: "auto", lg: "auto", xl: "0", '2xl': "0" }}>
                    <Flex as="form" alignItems="center" pb="3" onSubmit={handleSubmit(handleSearchProduct)}>

                        <Input
                            name="product_name"
                            type="search"
                            bg="white"
                            placeholder="Nome do produto"
                            color="gray.900"
                            _focus={{
                                bgColor: "white",
                                borderColor: "brand.500"

                            }}
                            size="md"
                            {...register("product_name", { maxLength: 100, })}
                            error={errors.product_name}
                        />

                        <Button
                            ml="2"
                            type="submit"
                            colorScheme="purple"
                            size="sm"
                        >
                            <Icon as={RiSearchLine} />
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
                                <Flex
                                    w={["90", "60vw"]}
                                    bg="#b0fbf1"
                                    borderColor="#97fadc"
                                    h="24"
                                    borderRadius={6}
                                    alignItems="center"
                                    p="5"
                                    color="#09c7ac"
                                >
                                    <Icon color="#04898F" mr="1" as={RiAlertLine} />
                                    <Text > Nenhum Resultado Encontrado </Text>
                                </Flex>
                        }
                    </Stack>

                    <BarCode />

                    {
                        isOpen === true && (
                            <ScannerModal />

                        )
                    }
                </Box>

            </Flex>
        </Flex >

    )
}
export const getServerSideProps = withSSRAuth(async (ctx) => {


    const apiClient = setupAPIClient(ctx);

    const query = ctx.query;

    let response;

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