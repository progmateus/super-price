import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
    showProfileData?: boolean;
    userName: string;
    userEmail: string;
    userAvatar: string;
}

export function Profile({
    showProfileData = true,
    userName,
    userEmail,
    userAvatar }: ProfileProps) {

    const { user } = useContext(AuthContext)

    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text mt="4" textAlign="right">{`${user?.name} ${user?.lastname}`}</Text>
                    <Text color="gray.300" fontSize="small">{user?.email}</Text>
                </Box>
            )}

            <Avatar size="md" name={`${user?.name} ${user?.lastname}`} src={user?.avatar} />
        </Flex>
    )
}