import { Box, Button, Center, Divider, Flex, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useScannerModal } from "../../contexts/ScannerModalContext";
import { RiErrorWarningFill } from "react-icons/ri"
import { useEffect, useRef, useState } from "react";
import { Scanner } from "./Scanner";
import React from "react";


export function ScannerModal() {
    const { isOpen, onClose } = useScannerModal();
    const [isScanning, setIsScanning] = useState(false);
    const [cameraId, setCameraId] = useState("");

    const scannerRef = React.useRef(null);

    async function handleCloseModal() {
        onClose();
    }

    useEffect(() => {
        setTimeout(() => {
            setIsScanning(true)
        }, 100)
    }, [])

    return (
        <>
            {
                navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function' ? (
                    <Modal isOpen={isOpen} onClose={() => handleCloseModal()}>
                        <ModalOverlay />

                        <ModalContent mx="5" my="auto">

                            <Box>
                                <ModalHeader mb="3"> </ModalHeader>

                                <ModalCloseButton color="gray.900" />

                                <ModalBody>

                                    <Box
                                        ref={scannerRef}
                                        position="relative"
                                    >
                                        <Box
                                            position="absolute"
                                            top='25%'
                                            right='0%'
                                            left='0%'
                                            bottom='25%'
                                            border="4px solid red">
                                            <Center color="blue" mt="20%">
                                                <Divider orientation='horizontal' />
                                            </Center>
                                        </Box>


                                        <canvas className="drawingBuffer" style={{
                                            position: 'absolute',
                                            top: '0px',
                                        }} />

                                        {isScanning ? <Scanner
                                            scannerRef={scannerRef}
                                            cameraId={cameraId}
                                            setCameraId={setCameraId}
                                        /> : null}
                                    </Box>

                                </ModalBody>

                                <ModalFooter >
                                </ModalFooter>
                            </Box >

                        </ModalContent>
                    </Modal >
                ) : (
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />

                        <ModalContent my="auto" mx="5">

                            <Box >
                                <ModalHeader mb="3" color="gray.900">
                                    <Flex align="center">
                                        <HStack spacing="1">

                                            <Icon color="danger" as={RiErrorWarningFill} fontSize={22} />
                                            <Text>
                                                Erro
                                            </Text>
                                        </HStack>
                                    </Flex>
                                </ModalHeader>

                                <ModalCloseButton color="gray.900" />

                                <ModalBody >

                                    <Box color="black">

                                        <Text fontSize={17}>
                                            Seu navegador não tem suporte para usar o scanner
                                            de código de barras
                                        </Text>
                                    </Box>

                                </ModalBody>

                                <ModalFooter >
                                    <Flex>
                                        <Button
                                            onClick={() => onClose()}
                                            color="white"
                                            bgColor="brand.600"
                                            ml="auto"
                                            size="lg"
                                        >
                                            OK
                                        </Button>
                                    </Flex>
                                </ModalFooter>
                            </Box >

                        </ModalContent>
                    </Modal >
                )
            }
        </>

    )

}
