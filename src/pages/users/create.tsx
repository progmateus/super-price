import { Box, Button, Flex, Heading, Divider, VStack, SimpleGrid, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/form/Input";
import { Header } from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function CreateUser() {
    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>

                    <Heading size="lg" fontWeight="normal"> Criar Usuário </Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="name" label="Nome" />
                            <Input name="email" type="email" label="E-mail" />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="password" type="password" label="Nova Senha" />
                            <Input name="confirmation_ password" type="password" label="Confirmação da Nova Senha" />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="last_ password" type="password" label="Senha Atual" />
                        </SimpleGrid>

                    </VStack>

                    <Flex mt="8" justify="flex-end" >
                        <HStack spacing="4">

                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button colorScheme="pink">Salvar</Button>


                        </HStack>

                    </Flex>

                </Box>

            </Flex>

        </Box>
    )

}