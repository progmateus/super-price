import { Box, Button, Flex, FormErrorMessage, Icon, Img, Link, Text, VStack } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { withSSRGuest } from "../utils/withSSRGuest";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Input } from "../components/form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../services/apiClient";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";


type CreateUserFormData = {
    name: string;
    lastname: string
    email: string
    password: string;
}

const signUpForSchema = yup.object().shape({

    name: yup.string().required("Nome obrigatório").matches(/^[a-záàâãéèêíïóôõöúçñ]+$/i, "Caracteres inválidos"),
    lastname: yup.string().required("Sobrenome obrigatório").matches(/^[a-záàâãéèêíïóôõöúçñ]+$/i, "Caracteres inválidos"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória")

})

export default function SignUp() {

    const [apiError, setApiError] = useState(null)


    const { register, handleSubmit, setError, formState } = useForm(({
        resolver: yupResolver(signUpForSchema)
    }));

    const { errors } = formState;

    const { signIn } = useContext(AuthContext);

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {

        try {
            await api.post("/users", {
                name: values.name,
                lastname: values.lastname,
                email: values.email,
                password: values.password
            });

            signIn({
                email: values.email,
                password: values.password
            })

        } catch (err) {

            if (err.response.status === 409) {
                setError("email", { message: "Este e-mail já está sendo ultilizado" })
            }
            else {
                console.log(err)
            }
        }
    }


    return (
        <Flex
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            left={0}
            align="center"
            justify="center"
            bg="#F1F1F1">

            <Box
                width="80"
                /// mx="auto"
                p="8"
                bg="white"
                borderRadius={8}
                borderColor="gray.300"
                borderWidth={0.2}
            >

                <Box>
                    <Box mb="4">
                        <Box mx="auto" mb="2" textAlign="center" >
                            <Icon as={RiShoppingCart2Line} fontSize="4rem" color="brand.900" />
                        </Box>

                        <Box >
                            <Text textAlign="center" color="gray.500" fontWeight="bold"> Cadastre-se para encontrar o menor preço</Text>
                        </Box>
                    </Box>

                    <Box >
                        <Box color="gray.900" as="form" >

                            <VStack spacing="2" alignItems="left">
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Nome"
                                    borderColor="black"
                                    bgColor="#F1F1F1"
                                    variant="outline"
                                    size="md"
                                    error={errors.name}
                                    {...register("name")}
                                />

                                <Input
                                    name="lastname"
                                    type="text"
                                    placeholder="Sobrenome"
                                    bgColor="#F1F1F1"
                                    variant="outline"
                                    size="md"
                                    error={errors.lastname}
                                    {...register("lastname")}
                                />

                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    bgColor="#F1F1F1"
                                    variant="outline"
                                    size="md"
                                    error={errors.email}
                                    {...register("email")}
                                />

                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    bgColor="#F1F1F1"
                                    variant="outline"
                                    size="md"
                                    error={errors.password}
                                    {...register("password")}
                                />

                            </VStack>

                            <Box mt="3">
                                <Button
                                    type="submit"
                                    w="64"
                                    bg="brand.700"
                                    color="white"
                                    onClick={handleSubmit(handleCreateUser)}
                                >
                                    Cadastre-se
                                </Button>

                                <Flex fontSize="14" mt="4" ml="8" >
                                    <Text mr="1">
                                        Tem uma conta?
                                    </Text>
                                    <Link href="/" color="blue">
                                        Conecte-se
                                    </Link>
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box >

        </Flex >
    )

}
export const getServerSideProps = withSSRGuest(async (ctx) => {

    return {
        props: {
        }
    }
});