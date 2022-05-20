import { Box, Flex, Img } from "@chakra-ui/react";

interface ProductImageProps {
    thumbnail: string;
}

export function ProductImage(props: ProductImageProps) {
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

                src={props.thumbnail}
            />
        </Box>
    )
}