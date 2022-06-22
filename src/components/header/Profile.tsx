import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import { titleCase } from "../../utils/titleCase";

interface ProfileProps {
    showProfileData?: boolean;

    user: {
        id?: string;
        name?: string;
        lastname?: string;
        email: string;
        avatar?: string;
    }
}

export function Profile({
    showProfileData = true,
    user
}: ProfileProps) {

    return (
        <Flex align="center" >
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text mt="4" >{titleCase(`${user?.name} ${user?.lastname}`)}</Text>
                    <Text color="gray.300" fontSize="small">{user?.email}</Text>
                </Box>
            )}

            <Avatar size="md" name={`${user?.name} ${user?.lastname}`} src={user?.avatar} />

        </Flex >
    )
}