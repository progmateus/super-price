import { Box, Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { SidebarDrawerGuest } from "../components/guestPage/SidebarDrawerGuest";
import { HeaderGuest } from "../components/guestPage/HeaderGuest";
import { AboutGuest } from "../components/guestPage/AboutGuest";
import { BenefitsGuest } from "../components/guestPage/BenefitsGuest";
import { FooterGuest } from "../components/guestPage/FooterGuest";
import { CallToActionGuest } from "../components/guestPage/CallToActionGuest";


export default function Home() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const { isOpen, onClose, onOpen } = useDisclosure();


    return (
        <Box bg="white" w="100%">

            <HeaderGuest
                onOpen={onOpen}
            />

            <Flex
                as="section"
                color="gray.900"
                minHeight="100vh"

            >

                <CallToActionGuest />

            </Flex >

            <Box
                as="section"
                id="about"
                bg="#2C6A7C"
                minHeight="100vh"
                pt={["20", "20", "28", "20"]}
            >

                <AboutGuest />

            </Box >


            <Box
                as="section"
                id="benefits"
                bg="#20546A"
                minHeight="100vh"
                pt={["20", "12"]}
            >

                <BenefitsGuest />

            </Box>



            <Flex
                as="footer"
                id="contact"
                bg="#10324C"
                minHeight="5vh"
                textAlign="center"
                px={["2rem", "2rem", "2rem", "15rem"]}
                pt="4"
            >

                <FooterGuest />

            </Flex >

            < SidebarDrawerGuest
                isOpen={isOpen}
                onClose={onClose}
            />
        </Box >
    )
}