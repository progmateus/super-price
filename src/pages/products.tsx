import Router from "next/router";
import * as yup from "yup"
import { List, ListRowRenderer, AutoSizer, WindowScroller, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import 'react-virtualized/styles.css';
import { Box, Button, Flex, Icon, useBreakpointValue } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { RiSearchLine } from "react-icons/ri";
import { ButtonBarCode } from "../components/buttonBarCode";
import { Input } from "../components/form/Input";
import { Header } from "../components/header";
import { ProductItem } from "../components/productItem";
import Sidebar from "../components/sidebar";
import { useScannerModal } from "../contexts/ScannerModalContext";
import { setupAPIClient } from "../services/api";
import { titleCase } from "../utils/titleCase";
import { withSSRAuth } from "../utils/withSSRAuth";
import { ScannerModal } from "../components/scannerModal/";
import { useRef } from "react";

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

export default function Products(props) {

    const { register, handleSubmit, formState } = useForm(({
        resolver: yupResolver(SearchProductFormSchema)
    }));

    const { errors } = formState;

    const { isOpen } = useScannerModal();

    const cache = useRef(new CellMeasurerCache({
        fixedHeight: true,
        defaultHeight: 102
    }))

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const rowRenderer: ListRowRenderer = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                <Box style={style}>
                    <ProductItem
                        product={props.products[index]}
                    />
                </Box>
            </CellMeasurer>
        )
    }


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

                <Box
                    mx={{ sm: "auto", lg: "auto", xl: "0", '2xl': "0" }}
                    w={["100%", "100%", "65%"]} h="100vh"
                >
                    <Flex
                        as="form"
                        alignItems="center"
                        pb="3"
                        onSubmit={handleSubmit(handleSearchProduct)}>

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


                    <WindowScroller>
                        {({ isScrolling, onChildScroll, scrollTop }) => (
                            <AutoSizer>
                                {({ height, width }) => (
                                    <List
                                        autoHeight
                                        height={height}
                                        isScrolling={isScrolling}
                                        onScroll={onChildScroll}
                                        rowCount={props.products.length}
                                        overscanRowCount={15}
                                        rowHeight={cache.current.rowHeight}
                                        deferredMeasurementCache={cache.current}
                                        rowRenderer={rowRenderer}
                                        scrollTop={scrollTop}
                                        width={width}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                </Box>

            </Flex>

            {
                !isWideVersion && (
                    <ButtonBarCode />
                )
            }

            {
                isOpen === true && (
                    < ScannerModal />
                )
            }

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