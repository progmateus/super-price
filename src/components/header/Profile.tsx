import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text mt="4" textAlign="right">Mateus Vieira</Text>
                    <Text color="gray.300" fontSize="small">mateusvieira@teste.com</Text>
                </Box>
            )}

            <Avatar size="md" name="Mateus Vieira" src="https://github.com/ninkua.png" />
        </Flex>
    )
}