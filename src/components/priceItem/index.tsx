import { Flex } from "@chakra-ui/react";
import { ProductImage } from "./productImage";
import { ProductInfo } from "./ProductInfo";
import { SupermarketName } from "./supermarketName";


interface PriceItemProps {
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

export function PriceItem(props: PriceItemProps) {
    return (
        <Flex w={["90", "60vw"]} p="2" bg="#FFFFFF" h="28" borderRadius={4} >
            <ProductImage thumbnail={props.price.product.thumbnail} />
            <ProductInfo name={props.price.product.name} price={props.price.price.price} />
            <SupermarketName name={props.price.supermarket.name} />
        </Flex >
    )
}