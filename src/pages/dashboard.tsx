import { Box, Flex, Icon, Stack, useBreakpointValue } from "@chakra-ui/react"
import { List, ListRowRenderer, AutoSizer, WindowScroller, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import Sidebar from "../components/sidebar"
import { Header } from "../components/header"
import { PriceItem } from "../components/priceItem"
import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"
import { titleCase } from "../utils/titleCase"
import { BarCode } from "../components/barCode"
import { ScannerModal } from "../components/scannerModal/"
import { useScannerModal } from "../contexts/ScannerModalContext"
import { useRef } from "react";


export default function Dashboard(props) {

    console.log(props.prices)

    const { isOpen } = useScannerModal();

    const cache = useRef(new CellMeasurerCache({
        fixedHeight: true,
        defaultHeight: 118
    }))

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const rowRenderer: ListRowRenderer = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                <Box style={style}>
                    <PriceItem
                        price={props.prices[index]}
                    />
                </Box>
            </CellMeasurer>
        )
    }

    return (
        <Flex direction="column" >
            <Header />

            <Flex w="100%" my={["4", "6"]} maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box mx={{ sm: "auto", lg: "auto", xl: "0", '2xl': "0" }} w={["100%", "65%"]} h="100vh">
                    {/* <Stack spacing="2" >
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
                    </Stack> */}

                    <WindowScroller>
                        {({ isScrolling, onChildScroll, scrollTop }) => (
                            <AutoSizer>
                                {({ height, width }) => (
                                    <List
                                        autoHeight
                                        height={height}
                                        isScrolling={isScrolling}
                                        onScroll={onChildScroll}
                                        rowCount={props.prices.length}
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


