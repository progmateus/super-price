
import { useEffect } from "react";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import * as yup from "yup"
import encodeQueryData from "../../utils/encodeURL";
import { yupResolver } from "@hookform/resolvers/yup";


type searchFormData = {
    gtin: string;
}

const searchFormSchema = yup.object().shape({
    gtin: yup.string().required("Campo obrigatório").max(50, "Limite de caracteres excedido")
})

export function SearchBox() {

    const { register, handleSubmit, formState, setValue } = useForm(({
        resolver: yupResolver(searchFormSchema)
    }));

    useEffect(() => {
        setValue("gtin", "")
    }, [Router.asPath])

    const handleSearch: SubmitHandler<searchFormData> = async (value) => {
        const urlEncoded = encodeQueryData(value);
        Router.push(`/prices/${urlEncoded}`)
    }

    return (
        <Flex
            as="form"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="brand.700"
            borderRadius="full"
            onSubmit={handleSubmit(handleSearch)}
        >

            <Input
                color="gray.50"
                variant="unstyled"
                bgColor="brand.700"
                px="4"
                mr="4"
                placeholder="Código do produto"
                _placeholder={{ color: "gray.100", bgColor: "brand.700" }}
                _hover={{ bgColor: "brand.700" }}
                {...register("gtin")}
            />

            <Icon as={RiSearchLine} fontSize="26" color="gray.200" />
        </Flex>
    )
}