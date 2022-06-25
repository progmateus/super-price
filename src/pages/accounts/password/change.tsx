import { Box, Button, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Icon, Text } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link";
import { Input } from "../../../components/form/Input";
import { Header } from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useState } from "react";

type UpdateUserPasswordFormData = {
    password: string;
    last_password: string;
}

const updateUserPasswordFormSchema = yup.object().shape({
    password: yup.string().required("Senha Obrigatória").max(80, "Limite de caracteres excedido."),
    password_confirmation: yup.string().oneOf([
        null, yup.ref("password")
    ], "As senhas precisam ser iguais").max(80, "Limite de caracteres excedido."),
    last_password: yup.string().required("Senha atual obrigatória").min(6, "No mínimo 6 caracteres").max(80, "Limite de caracteres excedido."),
})

export default function UpdateUserPassword() {

    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, setError, formState } = useForm(({
        resolver: yupResolver(updateUserPasswordFormSchema)
    }));

    const { errors } = formState;


    const handleUpdateUserPassword: SubmitHandler<UpdateUserPasswordFormData> = async (values) => {

        try {
            const response = await api.put("/users", {
                password: values.password,
                last_password: values.last_password
            });

            setSuccess(true)

        } catch (err) {

            if (err.response.data.message === "last password incorrect!") {
                setError('apiError', {
                    message: "Senha atual incorreta",
                });
            }
            else {
                setError('apiError', {
                    message: "Erro",
                });
            }
        }
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="#FFFFFF"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleUpdateUserPassword)}
                >

                    <Heading size="lg" fontWeight="normal" color="gray.900"> Alterar senha </Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="password"
                                color="gray.900"
                                type="password"
                                label="Nova senha"
                                error={errors.password}
                                {...register("password")}
                                focusBorderColor="brand.500"
                                bgColor="white"
                                borderColor="gray.500"
                                variant="outline"
                                _hover={{ bgColor: "input" }}
                                size="lg"
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da nova senha"
                                error={errors.password_confirmation}
                                {...register("password_confirmation")}
                                focusBorderColor="brand.500"
                                bgColor="white"
                                borderColor="gray.500"
                                variant="outline"
                                _hover={{ bgColor: "input" }}
                                size="lg"
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="last_password"
                                type="password"
                                label="Senha atual"
                                error={errors.last_password}
                                {...register("last_password")}
                                focusBorderColor="brand.500"
                                bgColor="white"
                                borderColor="gray.500"
                                variant="outline"
                                _hover={{ bgColor: "input" }}
                                size="lg"
                            />

                        </SimpleGrid>
                    </VStack>
                    {errors.apiError &&
                        <Box
                            mt="2"
                            color="#FF3B2D"
                        >{errors.apiError.message}
                        </Box>
                    }

                    <Flex mt="8" justify="flex-end" >
                        <HStack spacing="4">

                            <Link href="/dashboard" passHref>
                                <Button as="a" bg="gray.400" >Cancelar</Button>
                            </Link>
                            <Button
                                type="submit"
                                bg="brand.700"
                                _hover={{ bgColor: "brand.800" }}
                            >
                                Alterar senha
                            </Button>
                        </HStack>

                    </Flex>
                    {
                        success && (
                            <Flex
                                justify="center"
                                color="green"
                                mt="8"
                                fontSize={18}
                            >
                                <HStack spacing="1">

                                    <Icon as={BsFillCheckCircleFill} />
                                    <Text
                                        alignSelf="center">
                                        Senha atualizada.
                                    </Text>
                                </HStack>
                            </Flex>
                        )
                    }

                </Box>

            </Flex>

        </Box>
    )

}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    return {
        props: {
        }
    }
});