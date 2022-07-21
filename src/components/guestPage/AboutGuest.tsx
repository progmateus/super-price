import { Box, Text, Heading, Button, Flex, HStack, Icon, IconButton, Img, Link, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
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
                        <Text mb="4">
                            Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry.
                            Lorem Ipsum has been the industrys
                            standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type and scrambled it to
                            make a type specimen book. It has survived not only five centuries, but also
                            the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                        <Text>
                            Why do we use it?
                            <br />
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal distribution of letters, as
                            opposed to using Content here, content here, making it look like readable
                            English. Many desktop publishing packages and web page editors now use
                            Lorem Ipsum as their default model text, and a search for lorem ipsum will
                            uncover many web sites still in their infancy. Various versions have evolved
                            over the years, sometimes by accident, sometimes on purpose (injected
                            humour and the like).
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