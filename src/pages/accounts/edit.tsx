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
    name: yup.string().required("Nome obrigatório"),
    lastname: yup.string().required("Sobrenome obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
})

export default function CreateUser(props) {

    const { register, handleSubmit, formState } = useForm(({
        defaultValues: {
            name: props.name,
            lastname: props.lastname,
            email: props.email,
        },
        resolver: yupResolver(updateUserFormSchema)
    }));

    const { errors } = formState;


    const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (values) => {

        try {
            const response = await api.put("/users", {
                name: values.name,
                lastname: values.lastname,
                email: values.email,
                password: "priscilla321",
                last_password: "priscilla321"
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
                    onSubmit={handleSubmit(handleUpdateUser)}
                >

                    <Heading size="lg" fontWeight="normal"> Atualizar informações </Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="name"
                                label="Name"
                                error={errors.name}
                                {...register("name")}
                                focusBorderColor="pink.500"
                                bgColor="gray.900"
                                variant="filled"
                                _hover={{ bgColor: "gray.900" }}
                                size="lg"
                            />
                            <Input
                                name="lastname"
                                label="Sobrenome"
                                error={errors.lastname}
                                {...register("lastname")}
                                focusBorderColor="pink.500"
                                bgColor="gray.900"
                                variant="filled"
                                _hover={{ bgColor: "gray.900" }}
                                size="lg"
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                error={errors.email}
                                {...register("email")}
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
                            <Button
                                type="submit"
                                colorScheme="pink"
                            >Enviar</Button>


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
