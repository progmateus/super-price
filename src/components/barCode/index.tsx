import { Box, Icon } from "@chakra-ui/react";
import { RiBarcodeLine } from "react-icons/ri";

export function BarCode() {
    return (
        <Box
            id="barcodediv"
            position="fixed"
            py="1.5"
            px="2"
            borderRadius="50%"
            alignItems="center"
            bg="brand.700"
            bottom="5"
            left="43%"
            onClick={() => console.log("test")}
        >
            <Icon as={RiBarcodeLine} fontSize="40" />
        </Box >
    )
}