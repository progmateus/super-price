import * as React from "react";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react"
import { Header } from "../components/header";
import { withSSRAuth } from "../utils/withSSRAuth";
import { api } from "../services/apiClient";

export default function Prices(props) {
    const [prices, setPrices] = useState([])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        /*  const gtin = urlParams.get("gtin");
         const supermarket_name = urlParams.get("supermarket_name"); */
        try {
            const response = api.get(`/prices/${window.location.search}`).then((response) => {
                setPrices(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <Flex direction="column" w="100vw" >
            <Header />

        </Flex >
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    return {
        props: {
        }
    }
});