import { Box, Button, Flex, FormControl, Heading, Icon, Text } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Input } from "../../../components/form/Input";
import { api } from "../../../services/apiClient";




export default function ResetUserPassword() {

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)


    async function handleSendRecoveryEmail(event: FormEvent) {
        event.preventDefault();

        try {
            const response = await api.post("/password/forgot", { email })
            setSuccess(true)
            console.log(response)
            console.log(success)



        } catch (err) {
            console.log(err)
            console.log(err.response.status)
            if (err.response.status === 404) {
                console.log("entrou")
                setError({ message: "Endereço de e-mail inválido." })
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
            <Box
                position="absolute"
                bg="white"
                w="22.25rem"
                borderRadius={6}
            >
                <Box>
                    <Flex justify="center">
                        <Box px="4" py="7">
                            <Flex justify="center">
                                <Icon as={RiShoppingCart2Line} fontSize="4rem" color="brand.700" />
                            </Flex>
                            <Box textAlign="center" color="gray.900" my="4">
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
                                    <Button type="submit" bg="brand.700" size="lg" borderRadius={25}>
                                        Enviar
                                    </Button>
                                </Flex>
                            </Box>
                        </Box>
                    </Flex>
                </Box >

            </Box >
        </Flex >
    )

}