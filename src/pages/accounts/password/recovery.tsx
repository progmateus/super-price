import { Box, Button, Flex, FormControl, Heading, Icon, Img, Link, Text } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FormEvent, useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Input } from "../../../components/form/Input";
import { api } from "../../../services/apiClient";
import { withSSRGuest } from "../../../utils/withSSRGuest";

export default function ResetUserPassword() {

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)


    async function handleSendRecoveryEmail(event: FormEvent) {

        event.preventDefault();

        if (email.length > 80) {
            setError({ message: "Limite de caracteres excedido." })
            return
        }

        if (email.length === 0) {
            setError({ message: "Campo obrigatório." })
            return
        }

        const emailRegex = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
        const validateEmail = emailRegex.test(email)

        if (validateEmail === false) {
            setError({ message: "Endereço de e-mail inválido." })
            return
        }

        if (validateEmail === true) {
            try {
                setIsSubmitting(true)
                await api.post("/password/forgot", { email })
                setSuccess(true)

            } catch (err) {
                setIsSubmitting(false)

                if (err.response.status === 404) {
                    setError({ message: "Endereço de e-mail inválido." })
                }
                else {
                    console.log(err)
                }
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
            justify="center"
            alignItems="center"
        >
            {success === false ? (
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
                                    <Link href="/" mt="0">
                                        <Img w={["8rem", "8rem"]} mx="auto" src="/images/completed.png" />
                                    </Link>
                                </Flex>
                                <Box textAlign="center" color="gray.900" my="8">
                                    <Box>
                                        <Heading mb="2" as="h1" size='lg' >Redefinir senha</Heading>
                                    </Box>
                                    <Box color="#656b73" fontWeight="lighter" fontSize={[14, 16]}>
                                        <Text>Insira o seu email e enviaremos um link para você voltar a acessar a sua conta</Text>
                                    </Box>
                                </Box>
                                <Box as="form" onSubmit={handleSendRecoveryEmail}>

                                    <Input
                                        name="email"
                                        type="email"
                                        label="E-mail"
                                        value={email}
                                        error={error}
                                        onChange={event => setEmail(event.target.value)}
                                        borderColor="#D3D3D3"
                                        bgColor="#F1F1F1"
                                        _focus={{ bgColor: "#F1F1F1", borderColor: "brand.500" }}
                                    />

                                    <Flex mt="6" justify="center">
                                        <Button
                                            _hover={{ bgColor: "brand.800" }}
                                            type="submit"
                                            bg="brand.700"
                                            size="lg"
                                            borderRadius={25}
                                            isLoading={isSubmitting}
                                        >
                                            Enviar
                                        </Button>
                                    </Flex>
                                </Box>
                            </Box>
                        </Flex>
                    </Box >
                </Box >
            ) : (
                <Box
                    bg="white"
                    w={["20rem", "22.5rem"]}
                    h="10rem"
                    py={["6", "7"]}
                    borderRadius={8}
                    borderColor="gray.300"
                    borderWidth={0.2}
                    shadow="md"
                    rounded='md'
                    alignItems="center" >

                    <Flex justify="center" >
                        <Icon as={BsFillCheckCircleFill} fontSize="40" color="green" />
                    </Flex>
                    <Box mt="6">
                        <Text color="gray.900" fontSize={[16, 17]} textAlign="center">
                            E-mail enviado com sucesso
                        </Text>
                    </Box>
                </Box>
            )
            }

        </Flex >
    )

}

export const getServerSideProps = withSSRGuest(async (ctx) => {

    return {
        props: {
        }
    }
});