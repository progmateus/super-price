import { Box, Button, Flex, Heading, Divider, VStack, SimpleGrid, HStack } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/form/Input";
import { Header } from "../../components/header";
import Sidebar from "../../components/sidebar";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { titleCase } from "../../utils/titleCase";
import { api } from "../../services/apiClient";


type UpdateUserFormData = {
    name: string;
    lastname: string
    email: string
}

const updateUserFormSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório").max(50, "Limite de caracteres excedido.").matches(/^[a-záàâãéèêíïóôõöúçñ]+$/i, "Apenas um nome é permitido"),
    lastname: yup.string().required("Sobrenome obrigatório").max(50, "Limite de caracteres excedido.").matches(/^[a-záàâãéèêíïóôõöúçñ]+$/i, "Apenas um sobrenome é permitido"),
    email: yup.string().required("E-mail obrigatório").max(80, "Limite de caracteres excedido.").matches(/^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i, "Somente letras (a - z), números (0 - 9), pontos ( . ) e símbolos ( _ e - ) são permitidos")
})

export default function UpdateUser(props) {

    const { register, handleSubmit, setError, formState } = useForm(({
        defaultValues: {
            name: props.name,
            lastname: props.lastname,
            email: props.email,
            apiError: null
        },
        resolver: yupResolver(updateUserFormSchema)
    }));

    const { errors } = formState;

    const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (values) => {

        try {
            await api.put("/users", {
                name: values.name,
                lastname: values.lastname,
                email: values.email,
            });

            window.location.reload();

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
                    bg="#FFFFFF"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleUpdateUser)}
                >

                    <Heading size="lg" fontWeight="normal" color="gray.900"> Atualizar informações </Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="name"
                                label="Nome"
                                color="gray.900"
                                error={errors.name}
                                {...register("name")}
                                focusBorderColor="brand.500"
                                bgColor="white"
                                borderColor="gray.500"
                                variant="outline"
                                _hover={{ bgColor: "input" }}
                                size="lg"
                            />
                            <Input
                                name="lastname"
                                color="gray.900"
                                label="Sobrenome"
                                error={errors.lastname}
                                {...register("lastname")}
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
                                name="email"
                                color="gray.900"
                                type="email"
                                label="E-mail"
                                error={errors.email}
                                {...register("email")}
                                focusBorderColor="brand.500"
                                bgColor="white"
                                borderColor="gray.500"
                                variant="outline"
                                _hover={{ bgColor: "input" }}
                                size="lg"
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end" >
                        <HStack spacing="4">

                            <Link href="/dashboard" passHref>
                                <Button bg="gray.400">Cancelar</Button>
                            </Link>
                            <Button
                                type="submit"
                                bg="brand.700"
                                _hover={{ bgColor: "brand.800" }}
                            >
                                Enviar
                            </Button>
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


