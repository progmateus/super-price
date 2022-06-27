import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useScannerModal } from "../../contexts/ScannerModalContext";
import Quagga from '@ericblade/quagga2';
import { ValidatorGTIN } from "../../utils/validatorGTIN";
import encodeQueryData from "../../utils/encodeURL";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { Scanner } from "./Scanner";

export function ScannerModal() {
    const { isOpen, onClose } = useScannerModal();
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState([]);
    const scannerRef = useRef(null);

    useEffect(() => {
        setScanning(true)
    }, [])

    return (
        <>
            {
                navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function' && (
                    <Modal isOpen={isOpen} onClose={onClose}>
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
                )
            }
        </>

    )

}
