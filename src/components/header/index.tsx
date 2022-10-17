import { Box, Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { useContext } from "react"
import { RiMenuLine } from "react-icons/ri"
import { Router } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext"
import { withSSRGuest } from "../../utils/withSSRGuest"
import { Logo } from "./Logo"
import { NotificationsNav } from "./NotificationsNav"
import { Profile } from "./Profile"
import { SearchBox } from "./SearchBox"


export function Header() {

    const { onOpen } = useSidebarDrawer();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Flex
            as="header"
            bg="brand.600"
            w="100%"
            maxWidth={1480}
            h={["16", "20"]}
            mx="auto"
            px={["3", "6"]}
            align="center"
            id="header"
        >

            {!isWideVersion && (
                <IconButton
                    aria-label="open navegation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                >

                </IconButton>
            )}
            <Flex>
                <Logo />
            </Flex>


            {isWideVersion && <SearchBox />}


            <Flex ml="auto" >
                {/* <NotificationsNav /> */}
                <Profile
                    showProfileData={isWideVersion}
                />
            </Flex>
        </Flex >
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {

    return {
        props: {}
    }
})