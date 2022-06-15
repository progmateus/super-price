import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/form/Input";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRGuest } from "../utils/withSSRGuest";

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

      if (err.response.status === 500) {
        setError('apiError', {
          message: "Erro",
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
    <Flex w="100vw" h="100vh" align="center" justify="center" bg="brand.300">

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="white"
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
            color="gray.900"
            error={errors.email}
            {...register("email")}
            focusBorderColor="brand.500"
            bgColor="white"
            borderColor="gray.500"
            variant="outline"
            _hover={{ bgColor: "gray.100" }}
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
            _hover={{ bgColor: "gray.100" }}
            size="lg"
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          bg="brand.600"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        {errors.apiError &&
          <Box
            mt="2"
            color="#FF3B2D"
          >{errors.apiError.message}
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

