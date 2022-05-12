import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { useContext } from "react"
import { RiMenuLine } from "react-icons/ri"
import { AuthContext } from "../../contexts/AuthContext"
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext"
import { withSSRGuest } from "../../utils/withSSRGuest"
import { Logo } from "./Logo"
import { NotificationsNav } from "./NotificationsNav"
import { Profile } from "./Profile"
import { SearchBox } from "./SearchBox"


export function Header() {

    const { user } = useContext(AuthContext);

    const { onOpen } = useSidebarDrawer();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })


    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h={["16", "20"]}
            mx="auto"
            mt={["2", "4"]}
            px="6"
            align="center"
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
            <Logo />

            {isWideVersion && <SearchBox />}

            <Flex align="center" ml="auto" >
                <NotificationsNav />
                <Profile
                    showProfileData={isWideVersion}
                    user={user}
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