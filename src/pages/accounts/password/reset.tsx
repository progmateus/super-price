import { Box, Button, Flex, HStack, Icon, Img, Link, Text, VStack } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { BsFillCheckCircleFill } from "react-icons/bs";
import { VscError } from "react-icons/vsc";

import { useState } from "react";
import { Input } from "../../../components/form/Input";
import { withSSRGuest } from "../../../utils/withSSRGuest";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";


interface IResetUserPasswordProps {
    token: string;
}

type ResetPasswordFormData = {
    password: string;
}


const resetPasswordFormSchema = yup.object().shape({
    password: yup.string().required("Senha Obrigatória").min(6, "No mínimo 6 caracteres").max(80, "Limite de caracteres excedido."),
    password_confirmation: yup.string().oneOf([
        null, yup.ref("password")
    ], "As senhas precisam ser iguais").max(80, "Limite de caracteres excedido."),
})

export default function ResetUserPassword(props: IResetUserPasswordProps) {

    const { register, handleSubmit, setError, formState, reset } = useForm(({
        resolver: yupResolver(resetPasswordFormSchema)
    }));

    const { errors, isSubmitting, isSubmitted } = formState;

    const [apiStatus, setApiStatus] = useState(null)
    const [apiError, setApiError] = useState(null)



    const handleResetPassword: SubmitHandler<ResetPasswordFormData> = async (values) => {

        try {
            const response = await axios.post(`https://api.superprice.app/password/reset?token=${props.token}`, {
                password: values.password,

            })

            reset();
            setApiStatus(response.status);
            setApiError(null)

        } catch (err) {
            setApiError(err.response.status)
            setApiStatus(null);

            console.log(err);
        }

    }

    return (
        <Flex
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            left={0}
            justify="center"
            alignItems="center"
        >
            <Box
                position="absolute"
                bg="white"
                w="22.25rem"
                boxShadow='md'
                rounded='md'
                borderRadius={6}
            >
                <Box>
                    <Flex justify="center">
                        <Box px="4" py="7">
                            <Flex justify="center">
                                <Link href="/" mt="0" _focus={{ outline: "none" }}>
                                    <Img w="8rem" mx="auto" src="/logo-super-price-completed.png" />
                                </Link>
                            </Flex>
                            <Box
                                as="form"
                                onSubmit={handleSubmit(handleResetPassword)}
                            >
                                <VStack
                                    mt="4"
                                    spacing="4"

                                >

                                    <Input
                                        name="password"
                                        type="password"
                                        label="Nova senha"
                                        borderColor="#D3D3D3"
                                        bgColor="#F1F1F1"
                                        _focus={{ bgColor: "#F1F1F1", borderColor: "brand.500" }}
                                        error={errors.password}
                                        {...register("password")}
                                    />

                                    <Input
                                        name="password_confirmation"
                                        type="password"
                                        label="Confirmar nova senha"
                                        borderColor="#D3D3D3"
                                        bgColor="#F1F1F1"
                                        _focus={{ bgColor: "#F1F1F1", borderColor: "brand.500" }}
                                        error={errors.password_confirmation}
                                        {...register("password_confirmation")}
                                    />

                                    <Flex mt="6" justify="center">
                                        <Button
                                            _hover={{ bgColor: "brand.800" }}
                                            w="25"
                                            type="submit"
                                            bg="brand.700"
                                            size="lg"
                                            borderRadius={25}
                                            isLoading={isSubmitting}
                                        >
                                            Alterar
                                        </Button>
                                    </Flex>
                                </VStack>
                            </Box>

                            {
                                apiStatus === 200 && (
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

                            {
                                apiError === 401 && (
                                    <Flex
                                        justify="center"
                                        color="red.500"
                                        mt="6"
                                        fontSize={18}
                                    >
                                        <HStack spacing="1">
                                            <Icon as={VscError} />
                                            <Text
                                                alignSelf="center">
                                                Token Inválido
                                            </Text>
                                        </HStack>
                                    </Flex>
                                )
                            }

                            {
                                apiError === 500 && (
                                    <Flex
                                        justify="center"
                                        color="red.500"
                                        mt="8"
                                        fontSize={18}
                                    >
                                        <HStack spacing="1">

                                            <Icon as={VscError} />
                                            <Text
                                                alignSelf="center">
                                                Ocorreu um erro
                                            </Text>
                                        </HStack>
                                    </Flex>
                                )
                            }

                        </Box>
                    </Flex>
                </Box >
            </Box >
        </Flex >
    )
}
export const getServerSideProps = withSSRGuest(async (ctx) => {

    const token = ctx.query.token;

    return {
        props: {
            token
        }
    }
});