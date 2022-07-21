import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, Link, StackDivider, VStack } from "@chakra-ui/react";
import { SidebarNav } from "../sidebar/SidebarNav";
import { IoPersonOutline } from "react-icons/io5";


interface ISidebarDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SidebarDrawerGuest(props: ISidebarDrawerProps) {

    return (
        <Drawer isOpen={props.isOpen} placement="right" onClose={props.onClose}>
            <DrawerOverlay>
                <DrawerContent bgColor="brand.600" p="4">
                    <DrawerCloseButton mt="6" />
                    <DrawerHeader ></DrawerHeader>
                    <DrawerBody pt="12">
                        <VStack
                            divider={<StackDivider borderColor='gray.200' opacity={0.7} />}
                            spacing="4"
                            fontSize={18}
                            onClick={() => props.onClose()}

                        >
                            <Link href="#about"> Sobre</Link>
                            <Link href="#benefits"> Vantagens</Link>
                            <Link href="#contact"> Contato</Link>

                            <Link fontStyle="none" href="/signup" >
                                <Button
                                    w="15rem"
                                    bg="#E879AB"
                                    opacity={0.9}
                                    _hover={{
                                        bgColor: "#C75895"
                                    }}
                                    leftIcon={<Icon as={IoPersonOutline} />}
                                > Entrar
                                </Button>
                            </Link>

                            <Link fontStyle="none" href="/signup" >
                                <Button
                                    w="15rem"
                                    variant="outline"
                                    borderWidth={1.4}
                                    _hover={{
                                        bgColor: "#C75895"
                                    }}
                                > CADASTRAR
                                </Button>
                            </Link>


                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}