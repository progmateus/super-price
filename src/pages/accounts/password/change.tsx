import { Box, Button, Flex, Heading, Divider, VStack, SimpleGrid, HStack } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link";
import { Input } from "../../../components/form/Input";
import { Header } from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../services/apiClient";
import { setupAPIClient } from "../../../services/api";
import { titleCase } from "../../../utils/titleCase";
import { withSSRAuth } from "../../../utils/withSSRAuth";

type UpdateUserPasswordFormData = {
    password: string;
    last_password: string;
}

const updateUserPasswordFormSchema = yup.object().shape({
    password: yup.string().required("Senha Obrigatória"),
    password_confirmation: yup.string().oneOf([
        null, yup.ref("password")
    ], "As senhas precisam ser iguais"),
    last_password: yup.string().required("Senha atual obrigatória").min(6, "No mínimo 6 caracteres"),
})

export default function CreateUser(props) {


    const { register, handleSubmit, formState } = useForm(({
        resolver: yupResolver(updateUserPasswordFormSchema)
    }));

    const { errors } = formState;


    const handleUpdateUserPassword: SubmitHandler<UpdateUserPasswordFormData> = async (values) => {

        try {
            const response = await api.put("/users", {
                name: props.name,
                lastname: props.lastname,
                email: props.email,
                password: values.password,
                last_password: values.last_password
            });

            console.log(response)


        } catch (err) {
            console.log(err);
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
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleUpdateUserPassword)}
                >

                    <Heading size="lg" fontWeight="normal"> Alterar senha </Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Nova senha"
                                error={errors.password}
                                {...register("password")}
                                focusBorderColor="pink.500"
                                bgColor="gray.900"
                                variant="filled"
                                _hover={{ bgColor: "gray.900" }}
                                size="lg"
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da nova senha"
                                error={errors.password_confirmation}
                                {...register("password_confirmation")}
                                focusBorderColor="pink.500"
                                bgColor="gray.900"
                                variant="filled"
                                _hover={{ bgColor: "gray.900" }}
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
                                focusBorderColor="pink.500"
                                bgColor="gray.900"
                                variant="filled"
                                _hover={{ bgColor: "gray.900" }}
                                size="lg"
                            />
                        </SimpleGrid>

                    </VStack>

                    <Flex mt="8" justify="flex-end" >
                        <HStack spacing="4">

                            <Link href="/dashboard" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" colorScheme="pink">Alterar senha</Button>


                        </HStack>

                    </Flex>

                </Box>

            </Flex>

        </Box>
    )

}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/users/profile")

    const { id, name, lastname, email, avatar } = response.data;

    return {
        props: {
            id,
            name: titleCase(name),
            lastname: titleCase(lastname),
            email,
            avatar
        }
    }
});