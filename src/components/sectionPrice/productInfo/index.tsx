import { Box, Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";


interface IProductInfoProps {
    name: string;
    brand: string;
    thumbnail: string;
}

export function ProductInfo(props: IProductInfoProps) {
    return (
        <Flex>
            <Box mx="auto" maxWidth="500px" textAlign="center" mt="2" p="3">
                <Text color="gray.900" fontWeight="bold" mb="2" fontSize={["sm", "lg"]} > {props.name} </Text>

                {props.thumbnail ? (
                    <Box
                        w={["15", "15"]}
                        pt="2"
                        mx="auto"
                        maxWidth="200px"
                        maxHeight="200px"
                    >
                        <Img
                            h="40"
                            mx="auto"
                            src={props.thumbnail} />
                    </Box>
                ) :
                    <Box
                        w={["15", "15"]}
                        mx="auto"
                        maxWidth="200px"
                        maxHeight="200px"
                    >
                        <Img src="https://cosmos.bluesoft.com.br/assets/product-placeholder-ce4926921923d1e9bc66cd0e1493b49b.png" />
                    </Box>
                }

                <Text color="gray.500" fontSize="lg" mt="2" w="100%"> {props.brand} </Text>
            </Box>
        </Flex>
    )
}