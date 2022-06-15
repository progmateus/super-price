import { Stack, Button, Text, Flex, Icon } from "@chakra-ui/react";
import { RiContactsLine, RiEditBoxLine, RiShoppingBag3Line, RiMoneyDollarCircleLine, RiHome3Line, RiLogoutBoxRLine, RiLogoutBoxLine } from "react-icons/ri";
import { AuthContext, signOut } from "../../contexts/AuthContext";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">

            <NavSection title="GERAL">
                <NavLink icon={RiHome3Line} href="/dashboard">Home</NavLink>
                <NavLink icon={RiShoppingBag3Line} href="/products">Produtos</NavLink>
                <NavLink icon={RiMoneyDollarCircleLine} href="/prices">Preços</NavLink>




            </NavSection>

            <NavSection title="CONFIGURAÇÕES">
                <NavLink icon={RiEditBoxLine} href="/accounts/edit">Editar perfil</NavLink>
                <NavLink icon={RiContactsLine} href="/accounts/password/change">Alterar senha</NavLink>
                <Flex alignItems="center" color="brand.900" onClick={() => signOut()} _hover={{
                    cursor: "pointer"
                }}>
                    <Icon as={RiLogoutBoxRLine} fontSize="20" />
                    <Text ml="4" fontWeight="medium" _hover={{ textDecoration: "underline", }}> Sair </Text>
                </Flex>
            </NavSection>

        </Stack >
    )
}