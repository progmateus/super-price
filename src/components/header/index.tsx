import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { RiMenuLine } from "react-icons/ri"
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext"
import { withSSRGuest } from "../../utils/withSSRGuest"
import { Logo } from "./Logo"
import { NotificationsNav } from "./NotificationsNav"
import { Profile } from "./Profile"
import { SearchBox } from "./SearchBox"


type HeaderProps = {
    userName: string;
    userEmail: string;
    userAvatar: string;
}

export function Header({
    userName,
    userEmail,
    userAvatar }: HeaderProps) {

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
                    userName={userName}
                    userEmail={userEmail}
                    userAvatar={userAvatar}
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