import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, Link, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

interface NavSectionProps {
    title: string;
    children: ReactNode;
}

export default function Sidebar() {
    const { isOpen, onClose } = useSidebarDrawer();

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false
    })

    if (isDrawerSidebar) {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent bgColor="brand.600" p="4">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader ></DrawerHeader>
                        <DrawerBody>
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )

    }

    return (
        <Box as="aside" w="64" mr="8">
            <SidebarNav />
        </Box>
    )
}
