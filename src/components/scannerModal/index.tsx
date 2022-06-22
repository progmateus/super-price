
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useScannerModal } from "../../contexts/ScannerModalContext";
import Quagga from 'quagga';

export function ScannerModal() {

    const { isOpen, onClose } = useScannerModal();

    if (typeof window !== "undefined") {

        setTimeout(() => {
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    constraints: {
                        width: 400,
                        height: 200,
                        facingMode: "environment",
                        deviceId: "7832475934759384534"
                    },
                    area: { // defines rectangle of the detection/localization area
                        top: "0%",    // top offset
                        right: "0%",  // right offset
                        left: "0%",   // left offset
                        bottom: "0%"  // bottom offset
                    },
                    multiple: false,
                    halfSample: true,
                    patchSize: "medium",
                    target: document.querySelector('#scanner')    // Or '#yourElement' (optional)
                },
                decoder: {
                    readers: ["code_128_reader"]
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    return
                }
                console.log("Initialization finished. Ready to start");
                Quagga.start();
            });
        }, 500);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent my="auto" mx="5">

                <Box >
                    <ModalHeader> </ModalHeader>

                    <ModalCloseButton color="gray.900" />

                    <ModalBody id="scanner" >


                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>
                </Box >

            </ModalContent>
        </Modal >
    )

}
