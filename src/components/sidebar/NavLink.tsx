import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import Link from "next/link"
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    children: string;
    href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex" alignItems="center" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium">{children}</Text>
            </ChakraLink>
        </ActiveLink>

    )

}