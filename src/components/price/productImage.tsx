import { Box, Flex, Img } from "@chakra-ui/react";

interface ProductImageProps {
    product_image_url: string;
}

export function ProductImage({ product_image_url }: ProductImageProps) {
    return (
        <Box
            w={["21%", "10%"]}
            m="1"
            maxWidth="95px"
        >
            <Img
                maxWidth="100%"
                maxHeight="100%"
                mx="auto"

                src={product_image_url}
            />
        </Box>
    )
}