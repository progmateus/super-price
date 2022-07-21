import { Box, Button, Flex, Icon, Img, Link, Stack, Text } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/form/Input";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRGuest } from "../utils/withSSRGuest";
import { RiShoppingCart2Line } from "react-icons/ri";

type SingInFormData = {
  email: string;
  password: string;
}

const signInForSchema = yup.object().shape({

  email: yup.string().required("E-mail obrigatório").max(80, "Limite de caracteres excedido."),
  password: yup.string().required("Senha obrigatória").max(80, "Limite de caracteres excedido.")

})

export default function SignIn() {

  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit, setError, formState } = useForm(({
    resolver: yupResolver(signInForSchema)
  }));

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SingInFormData> = async (credentials: SingInFormData) => {

    try {
      await signIn(credentials);
    } catch (err) {

      if (err.response.status === 500) {
        setError('apiError', {
          message: "Ocorreu algum erro",
        });
      }
      else {
        setError('apiError', {
          message: "E-mail ou senha inválidos",
        });
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
      bg="#F1F1F1"
    >

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="white"
        p="8"
        borderRadius={8}
        // borderColor="#E9E9E9"
        // borderWidth={0.1}
        boxShadow='md'
        rounded='md'
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >

        <Box textAlign="center" mb="4">
          {/* <Box mb="2">
            <Icon as={RiShoppingCart2Line} fontSize="4rem" color="brand.900" />
          </Box> */}
          <Link href="/" mt="0">
            <Img w={["8rem", "9rem"]} mx="auto" src="/images/completed.png" />
          </Link>
          <Text mt={["4", "6"]} color="gray.500" fontWeight="bold"> Faça login para economizar</Text>
        </Box>

        <Stack spacing="4">

          <Input
            name="email"
            type="email"
            label="E-mail"
            color="gray.900"
            error={errors.email}
            {...register("email")}
            focusBorderColor="brand.500"
            borderColor="gray.500"
            variant="outline"
            _hover={{ bgColor: "#F1F1F1" }}
            size="lg"
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            color="gray.900"
            error={errors.password}
            {...register("password")}
            focusBorderColor="brand.500"
            bgColor="white"
            borderColor="gray.500"
            variant="outline"
            _hover={{ bgColor: "#F1F1F1" }}
            size="lg"
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          bg="brand.700"
          _hover={{ bgColor: "brand.800" }}
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        {errors.apiError &&
          <Box
            mt="1"
            mb="2"
            color="red.500"
            fontSize={[14, 16]}
          >{errors.apiError.message}
          </Box>
        }

        <Flex fontSize="14" mt="2" justify="center" >
          <Box>
            <Link color="blue.700" href="/accounts/password/reset">
              Esqueceu a senha?
            </Link>
          </Box>
        </Flex>



        <Flex fontSize="14" mt="7" justify="center" >
          <Text mr="1" color="gray.900">
            Não tem uma conta?
          </Text>
          <Link fontWeight="bold" href="/signup" color="blue">
            Cadastre-se
          </Link>
        </Flex>

      </Flex>

    </Flex >
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})

