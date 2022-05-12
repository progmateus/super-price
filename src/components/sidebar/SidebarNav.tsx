import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine, RiEditBoxLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">

            <NavSection title="GERAL">
                <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>


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