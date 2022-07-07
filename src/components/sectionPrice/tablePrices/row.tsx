import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { usePriceModal } from "../../../contexts/PriceModalContext";

export function TableRow(props) {

    const { handleOpenPriceModal, setPrice, setType } = usePriceModal();


    function handleEditPrice(price: any, type) {
        setPrice(price)
        setType(type)
        handleOpenPriceModal()
    }

    return (
        <Flex
            mr="3"
            ml={["0", "5"]}
            alignItems="center"

        >

            <Flex
                w={["70vw", "65vw"]}
                justify="space-between"
                alignItems="center"
                textAlign="center"
                fontSize={["12", "16"]}
                color="gray.900"
            >
                <Text ml="2" w={["16", "20"]} textAlign="left" fontWeight="bold" color="green.500" >{props.price.price.price}</Text>
                <Text w={["24", "32"]} fontWeight="bold"> {props.price.supermarket?.name}</Text>
                <Text w={["16", "20"]}  > {props.price.price?.updated_at}</Text>
            </Flex>


            <Button
                ml="auto"
                as="a"
                size="xs"
                fontSize="sm"
                colorScheme="purple"
                onClick={() => handleEditPrice(props.price, "edit")}
            >
                <Icon as={RiPencilLine} fontSize={["12", "16"]} />
            </Button>
        </Flex>
    )
}