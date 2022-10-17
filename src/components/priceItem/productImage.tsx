import { Box, Flex, Img } from "@chakra-ui/react";

interface ProductImageProps {
    thumbnail: string;
}

export function ProductImage(props: ProductImageProps) {
    return (
        <Box
            w={["10rem", "8rem"]}
            m="1"
            maxWidth="95px"
            textAlign="center"

        >
            {
                props.thumbnail ? (
                    <Img
                        maxWidth="100%"
                        maxHeight="100%"
                        mx="auto"
                        src={props.thumbnail}
                    />
                ) :
                    <Img
                        maxWidth="100%"
                        maxHeight="100%"
                        mx="auto"

                        src="https://cosmos.bluesoft.com.br/assets/product-placeholder-ce4926921923d1e9bc66cd0e1493b49b.png"
                    />
            }
        </Box>
    )
}