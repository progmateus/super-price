import { Box, Button, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Text, Icon } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Input } from "../../components/form/Input";
import { Header } from "../../components/header";
import Sidebar from "../../components/sidebar";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { titleCase } from "../../utils/titleCase";
import { api } from "../../services/apiClient";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { CropperAvatarProfile } from "../../components/cropperAvatarProfile";


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
    const { user, setProfileUser } = useContext(AuthContext);
    const [success, setSuccess] = useState(false)
    const [formKey, setFormKey] = useState(0)


    const { register, handleSubmit, setError, formState, reset } = useForm(({
        defaultValues: useMemo(() => {
            return {
                name: user?.name,
                lastname: user?.lastname,
                email: user?.email
            };
        }, [user]),
        resolver: yupResolver(updateUserFormSchema)
    }));

    useEffect(() => {
        reset({
            name: titleCase(user?.name),
            lastname: titleCase(user?.lastname),
            email: user?.email
        });
    }, [user]);

    const { errors, isDirty } = formState;

    const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (values) => {
        try {
            await api.put("/users", {
                name: values.name,
                lastname: values.lastname,
                email: values.email,
            });

            setProfileUser();
            setFormKey(Math.random());
            setSuccess(true)
        } catch (err) {
            if (err.response.data.message === 'User already exists!') {
                setError("email", { message: "E-mail já está sendo ultilizado" })
            }
        }
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box
                    flex="1"
                    borderRadius={8}
                    bg="#FFFFFF"
                    p={["6", "8"]}
                >
                    <Box>
                        <Heading size="lg" fontWeight="normal" color="gray.900"> Atualizar informações </Heading>
                        <Divider my="6" borderColor="gray.700" />

                        <CropperAvatarProfile />

                        <Box
                            as="form"
                            onSubmit={handleSubmit(handleUpdateUser)}
                        >
                            <VStack spacing="8" >
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

                                <Button
                                    type="submit"
                                    bg="brand.700"
                                    _hover={{ bgColor: "brand.800" }}
                                    {...isDirty === false && ({ disabled: true })}
                                >
                                    Enviar
                                </Button>

                            </Flex>
                        </Box>
                        {
                            success && (
                                <Flex
                                    justify="center"
                                    color="green"
                                    mt={["8", "4"]}
                                    fontSize={18}
                                >
                                    <HStack spacing="1">

                                        <Icon as={BsFillCheckCircleFill} />
                                        <Text
                                            alignSelf="center">
                                            Informações atualizadas.
                                        </Text>
                                    </HStack>
                                </Flex>
                            )
                        }
                    </Box>

                </Box >
            </Flex >
        </Box >
    )
}

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}



export const getServerSideProps = withSSRAuth(async (ctx) => {

    // const apiClient = setupAPIClient(ctx);

    // const response = await apiClient.get("/users/profile")

    // const { id, name, lastname, email, avatar } = response.data;

    return {
        props: {
            // id,
            // name: titleCase(name),
            // lastname: titleCase(lastname),
            // email,
            // avatar,
        }
    }
});


