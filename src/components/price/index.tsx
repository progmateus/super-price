import { Flex } from "@chakra-ui/react";
import { ProductImage } from "./productImage";
import { ProductInfo } from "./ProductInfo";
import { SupermarketName } from "./supermarketName";


interface PriceProps {

    product_image_url: string;
    product_name: string;
    price: number
    supermarket_name: string;
}

export function Price({
    product_image_url,
    product_name,
    price,
    supermarket_name,
}: PriceProps) {
    return (
        <Flex w="100%" bg="gray.800" p="2" h={["14vh", "17vh"]} minHeight={["14vh", "17vh"]} borderRadius={6}>
            <ProductImage product_image_url={product_image_url} />
            <ProductInfo product_name={product_name} price={price} />
            <SupermarketName supermarket_name={supermarket_name} />
        </Flex>
    )
}