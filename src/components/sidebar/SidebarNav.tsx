import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine, RiEditBoxLine, RiShoppingBag3Line, RiMoneyDollarCircleLine, RiHome3Line } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">

            <NavSection title="GERAL">
                <NavLink icon={RiHome3Line} href="/dashboard">Home</NavLink>
                <NavLink icon={RiShoppingBag3Line} href="/products">Produtos</NavLink>
                <NavLink icon={RiMoneyDollarCircleLine} href="/prices">Buscar preços</NavLink>




            </NavSection>

            <NavSection title="CONFIGURAÇÕES">
                <NavLink icon={RiEditBoxLine} href="/accounts/edit">Editar perfil</NavLink>
                <NavLink icon={RiContactsLine} href="/accounts/password/change">Alterar senha</NavLink>
                <NavLink icon={RiInputMethodLine} href="/forms">Formulários</NavLink>
                <NavLink icon={RiGitMergeLine} href="/automation">Automação</NavLink>
            </NavSection>

        </Stack>
    )
}