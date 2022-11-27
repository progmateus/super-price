import { Box, Flex, Icon } from "@chakra-ui/react";
import { RiBarcodeLine } from "react-icons/ri";
import { useScannerModal } from "../../contexts/ScannerModalContext";

export function ButtonBarCode() {

    const { onOpen } = useScannerModal();
    return (
        <Flex justify="center">
            <Box
                role="button"
                position="fixed"
                py="1.5"
                px="2"
                borderRadius="50%"
                alignItems="center"
                bg="brand.700"
                bottom="5"
                ///left="43%"
                onClick={onOpen}
            >
                <Icon as={RiBarcodeLine} fontSize="40" />
            </Box >
        </Flex>
    )
}