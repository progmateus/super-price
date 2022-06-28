import { Box, Button, Flex, HStack, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useScannerModal } from "../../contexts/ScannerModalContext";
import Quagga from '@ericblade/quagga2';
import { ValidatorGTIN } from "../../utils/validatorGTIN";
import encodeQueryData from "../../utils/encodeURL";
import { RiErrorWarningFill } from "react-icons/ri"
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { Scanner } from "./Scanner";

export function ScannerModal() {
    const { isOpen, onClose } = useScannerModal();
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState([]);
    const scannerRef = useRef(null);

    async function handleCloseModal() {
        // Quagga.offProcessed();
        // Quagga.offDetected();
        // Quagga.pause();
        // await Quagga.stop();
        onClose();
    }

    useEffect(() => {
        setScanning(true)
    }, [])

    return (
        <>
            {
                navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function' ? (
                    <Modal isOpen={isOpen} onClose={() => handleCloseModal()}>
                        <ModalOverlay />

                        <ModalContent my="auto" mx="5">

                            <Box >
                                <ModalHeader mb="3"> </ModalHeader>

                                <ModalCloseButton color="gray.900" />

                                <ModalBody >

                                    <Box ref={scannerRef} position="relative" border="3px solid black">
                                        {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                                        <canvas className="drawingBuffer" style={{
                                            position: 'absolute',
                                            top: '0px',
                                            // left: '0px',
                                            // height: '100%',
                                            // width: '100%',
                                            ///border: '3px solid',
                                        }} />
                                        {scanning ? <Scanner scannerRef={scannerRef} /> : null}
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
