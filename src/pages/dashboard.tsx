import { Box, Flex, Icon, Stack } from "@chakra-ui/react"
import Sidebar from "../components/sidebar"
import { Header } from "../components/header"
import { PriceItem } from "../components/priceItem"
import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"
import { titleCase } from "../utils/titleCase"
import { BarCode } from "../components/barCode"
import { ScannerModal } from "../components/scannerModal"
import { useScannerModal } from "../contexts/ScannerModalContext"


export default function Dashboard(props) {

    const { isOpen } = useScannerModal();

    return (
        <Flex direction="column" >
            <Header />

            <Flex w="100%" my={["4", "6"]} maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box mx={{ sm: "auto", lg: "auto", xl: "0", '2xl': "0" }}>
                    <Stack spacing="2" >
                        {
                            props.prices.length > 0 ? (
                                props.prices.map((price) => {
                                    return (
                                        <PriceItem
                                            key={price.price.id}
                                            price={price}
                                        />
                                    )
                                })

                            ) :
                                <Box> NENHUM PREÇO ENCONTRADO </Box>
                        }
                    </Stack>
                </Box>
            </Flex>

            <BarCode />

            {
                isOpen === true && (
                    < ScannerModal />
                )
            }

        </Flex >

    )
}
export const getServerSideProps = withSSRAuth(async (ctx) => {
    let formatter = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'BRL'
    })

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/prices")

    const { data } = response;

    data.map((price) => {
        price.supermarket.name = titleCase(price.supermarket.name);
        price.product.name = price.product.name.toUpperCase()
        price.price.price = formatter.format(price.price.price)
    })

    return {
        props: {
            prices: data
        }
    }
});


