import { Box, Button, Center, Divider, Flex, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from "@chakra-ui/react"
import { useScannerModal } from "../../contexts/ScannerModalContext";
import { RiErrorWarningFill } from "react-icons/ri"
import { useEffect, useState } from "react";
import { Scanner } from "./Scanner";
import React from "react";

export function ScannerModal() {
    const { isOpen, onClose } = useScannerModal();
    const [isScanning, setIsScanning] = useState(false);
    const [deviceId, setDeviceId] = useState("")
    const [cameraDevices, setcameraDevices] = useState<any>([]);
    const scannerRef = React.useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setIsScanning(true)
        }, 100)
    }, [])

    async function handleCloseModal() {
        onClose();
    }

    function handleSelectChange(e) {
        setDeviceId(e.target.value);
    }

    return (
        <>
            {
                navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function' ? (
                    <Modal isOpen={isOpen} onClose={() => handleCloseModal()}>
                        <ModalOverlay />

                        <ModalContent mx="5" my="auto">

                            <Box>
                                <ModalHeader color="gray.900">
                                    <Select
                                        placeholder='Selecione a sua camera'
                                        w="16rem"
                                        color="gray.900"
                                        onChange={(e) => handleSelectChange(e)}
                                    >
                                        {
                                            cameraDevices.map((device) => {
                                                return <option
                                                    key={device.deviceId}
                                                    value={device.deviceId}
                                                > {device.label}
                                                </option>
                                            })
                                        }
                                    </Select>
                                    <ModalCloseButton />
                                </ModalHeader>

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
                                        </Box>


                                        <canvas className="drawingBuffer" style={{
                                            position: 'absolute',
                                            top: '0px',
                                        }} />

                                        {isScanning ? <Scanner
                                            scannerRef={scannerRef}
                                            deviceId={deviceId}
                                            setcameraDevices={setcameraDevices}
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
