import { Box, Text, Heading, Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";



export function AboutGuest() {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <>
            <Box
                textAlign="center"
            >
                <Text
                    fontWeight="bold"
                    mb="4"
                    opacity={0.7}
                >
                    S O B R E
                </Text>
                <Heading
                    size="lg"
                >
                    O que é o <br />
                    Super Price?
                </Heading>
            </Box>


            <Flex
                justify="center"
                align="center"
                mt="8"
            >
                <Flex
                    align="center"
                >
                    <Box
                        fontSize={[14, 14, 20, 14]}
                        w={["20rem", "26rem", "35rem", "35rem"]}
                    >
                        <Text>
                            Em setembro de 2021, nossa equipe deu vida ao projeto cuja a ideia inicial
                            era ajudar o nosso público a manterem sua lista de compras, apesar de um longo
                            período de crises devido a pandemia da COVID-19.
                        </Text>
                        <Text>
                            Entre abril de 2020 e outubro de 2021,
                            (40) produtos básicos da mesa e residência dos
                            brasileiros aumentaram, em média 22,44% devido a inflação
                            que ocorrera neste período de acordo com institutos como o IBPT e IBGE
                        </Text>
                        <Text>
                            Nossa missão é tornar mais facil e prática a sua economia;
                            disponibilizando a comparação de valores de produtos
                            em um só aplicativo, na palma da sua mão e, o melhor: sem sair de casa
                        </Text>
                        <Text mt="4" fontWeight="semibold">
                            Por que usar?
                        </Text>
                        <Text >
                            O SuperPrice é um aplicativo que permite á você,
                            nosso usuário, buscar pelo menor preço entre os
                            supermercados mais próximos. Tendo como maior objetivo
                            aumentar as chances de passar todos os produtos da sua lista
                            para o carrinho e assim para a sua casa
                        </Text>
                    </Box>
                    {isWideVersion && (
                        <Box>
                            <Icon as={AiOutlineInfoCircle} fontSize={300} opacity={0.3} />
                        </Box>
                    )}
                </Flex>
            </Flex>

        </>
    )
}