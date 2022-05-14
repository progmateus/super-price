import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/form/Input";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRGuest } from "../utils/withSSRGuest";
import { api } from "../services/apiClient";
import { setCookie } from "nookies";
import { Router } from "next/router";


type SingInFormData = {
  email: string;
  password: string;
}

const signInForSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória")

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

      console.log(err);

      setError('apiError', {
        message: err.response.data?.message,
      });
      console.log("ERROR APP: ", errors.apiError.message);
    }
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >

        <Stack spacing="4">

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

          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
            focusBorderColor="pink.500"
            bgColor="gray.900"
            variant="filled"
            _hover={{ bgColor: "gray.900" }}
            size="lg"
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        {errors.apiError &&
          <Box
            mt="2"
            color="#FF3B2D"
          >E-mail ou senha inválidos
          </Box>
        }


      </Flex>

    </Flex >
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})

