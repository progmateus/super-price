import { Box, Button, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Text, Icon, Img, Avatar } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillCheckCircleFill, BsPencil } from "react-icons/bs";
import { Input } from "../../components/form/Input";
import { Header } from "../../components/header";
import Sidebar from "../../components/sidebar";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { titleCase } from "../../utils/titleCase";
import { api } from "../../services/apiClient";
import { AuthContext } from "../../contexts/AuthContext";
import { FormEvent, FormEventHandler, useContext, useState } from "react";
import { setTimeout } from "timers/promises";


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


    const { setProfileUser, user } = useContext(AuthContext);

    console.log(user)

    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, setError, formState } = useForm(({
        defaultValues: {
            name: props.name,
            lastname: props.lastname,
            email: props.email,
            apiError: null
        },
        resolver: yupResolver(updateUserFormSchema)
    }));

    const { errors, isDirty } = formState;

    const handleClickImage = async () => {
        const input: HTMLElement = document.querySelector("#input_upload_avatar");
        input.click();
    }


    const handleChangeInput = async (event) => {
        const file = event.target.files[0];

        let data = new FormData();

        data.append("avatar", file, file.name);

        console.log("file: ", file)

        try {
            const response = await api.patch("/users/avatar", data, {
                headers: {
                    "Content-Type": "multipart/form-data; boundary=MyBoundary"
                },
            });

            console.log(response)

            setProfileUser();
            // setSuccess(true)

        } catch (err) {
            console.log(err)
        }
    }


    const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (values) => {
        try {
            await api.put("/users", {
                name: values.name,
                lastname: values.lastname,
                email: values.email,
            });

            setProfileUser();
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
                    <Heading size="lg" fontWeight="normal" color="gray.900"> Atualizar informações </Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <Flex justify="center" mb="6">
                        <Box>
                            <Box>
                                <Input
                                    id="input_upload_avatar"
                                    name="avatar"
                                    type="file"
                                    accept="image/png, image/jpeg, image/pjpeg, image/jpg"
                                    hidden={true}
                                    onChange={(event) => handleChangeInput(event)}
                                />
                            </Box>

                            <Box role="button" onClick={handleClickImage}>
                                {/* <Img
                                    w={200}
                                    h={200}
                                    mx="auto"
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    borderRadius={100}
                                /> */}

                                <Flex justify="center">
                                    <Avatar
                                        w={["8rem", "12.5rem"]}
                                        h={["8rem", "12.5rem"]}
                                        size="xl"
                                        name={`${user?.name} ${user?.lastname}`}
                                        src={user?.avatar} />
                                </Flex>

                                <Box color="blue.500" mt="1" fontSize={18} textAlign="center"> Atualizar foto de perfil </Box>
                            </Box>

                        </Box>
                    </Flex>

                    <Box as="form" onSubmit={handleSubmit(handleUpdateUser)}>
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


