import { Flex } from "@chakra-ui/react";
import { ProductImage } from "./productImage";
import { ProductInfo } from "./ProductInfo";
import { SupermarketName } from "./supermarketName";


interface PriceProps {
    price: {
        product: {
            id: string;
            name: string;
            gtin: string;
            brand: string;
            thumbnail: string;
        }

        price: {
            id: string;
            price: number;
            user_id: string;
            created_at: string;
            updated_at: string;
        },

        supermarket: {
            id: string;
            name: string;
        }
    }

}

export function Price(props: PriceProps) {
    return (
        <Flex w={["100vw", "70vw"]} bg="#FFFFFF" p="2" h="17vh" minHeight={["14vh", "17vh"]} borderRadius={6}>
            <ProductImage thumbnail={props.price.product.thumbnail} />
            <ProductInfo name={props.price.product.name} price={props.price.price.price} />
            <SupermarketName name={props.price.supermarket.name} />
        </Flex>
    )
}