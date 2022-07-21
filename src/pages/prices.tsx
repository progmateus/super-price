import * as React from "react";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "../components/header";
import { withSSRAuth } from "../utils/withSSRAuth";
import Sidebar from "../components/sidebar";
import { titleCase } from "../utils/titleCase";
import { setupAPIClient } from "../services/api";
import encodeQueryData from "../utils/encodeURL";
import { PriceModal } from "../components/priceModal";

import { ScannerModal } from "../components/scannerModal";
import { useScannerModal } from "../contexts/ScannerModalContext";
import { usePriceModal } from "../contexts/PriceModalContext";
import { FormSearchPrice } from "../components/sectionPrice/formSearchPrice";
import { TablePrices } from "../components/sectionPrice/tablePrices";
import { ProductInfo } from "../components/sectionPrice/productInfo";
import { BarCode } from "../components/barCode";

export default function Prices(props) {

    const { isOpen } = useScannerModal();

    const { price } = usePriceModal();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        < Flex direction="column" >
            <Header />
            <Flex w="100%" my={["2", "6"]} maxWidth={1480} mx="auto" px={["2", "6"]}>
                <Sidebar />

                <Box
                    flex="1"
                    bg="#FFFFFF"
                    borderRadius={6}
                >

                    <FormSearchPrice
                        query={props.query}
                        error={props.error}
                    />

                    {
                        props.product ? (
                            <ProductInfo
                                name={props.product.name}
                                brand={props.product.brand}
                                thumbnail={props.product.thumbnail}

                            />
                        ) :
                            props.error && props.error.message === "Product not found" && (
                                <Box mt="8">
                                    <Text textAlign="center" color="#FF3B2D"> Produto não encontrado </Text>
                                </Box>
                            )
                    }

                    {
                        props.product && (
                            <TablePrices
                                prices={props.prices}
                            />
                        )
                    }

                </Box>

                <PriceModal key={price.price?.id} price={price} />

            </Flex >

            {
                !isWideVersion && (
                    <BarCode />
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

    const urlEncoded = encodeQueryData(ctx.query);
    const query = ctx.query;
    const apiClient = setupAPIClient(ctx);
    let error = null
    let prices = [];
    let product = null

    if (query.gtin) {

        try {

            const productResponse = await apiClient.get(`/products/${query.gtin}`)

            const data = productResponse.data;

            product = {
                id: data.id,
                name: data.name.toUpperCase(),
                gtin: data.gtin,
                brand: data.brand.toUpperCase(),
                thumbnail: data.thumbnail,
                created_at: data.created_at,
                updated_at: data.updated_at
            }

            const response = await apiClient.get(`/prices/${urlEncoded}`)
            const { data: pricesResponse } = response

            pricesResponse.map((price) => {
                price.supermarket.name = titleCase(price.supermarket.name);
                price.product.name = price.product.name.toUpperCase();
                price.price.price = new Intl.NumberFormat("pt-br", {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.price.price);
                price.price.updated_at = new Date(price.price.updated_at).toLocaleDateString
                    ("pt-br", {
                        day: "2-digit",
                        month: "2-digit",
                    });
            })

            prices = pricesResponse


        } catch (err) {
            error = err.response.data
        }

    }

    return {
        props: {
            error,
            product,
            prices,
            query
        }
    }

});

