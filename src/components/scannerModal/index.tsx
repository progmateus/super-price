
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useScannerModal } from "../../contexts/ScannerModalContext";
import Quagga from 'quagga';
import { useEffect } from "react";

export function ScannerModal() {

    const { isOpen, onClose } = useScannerModal();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent my="auto" mx="5">

                <Box >
                    <ModalHeader> </ModalHeader>

                    <ModalCloseButton color="gray.900" />

                    <ModalBody>

                        <Input />

                    </ModalBody>

                    <ModalFooter>

                        <Button type="submit" bg='brand.600' variant='ghost'
                        >Enviar</Button>
                    </ModalFooter>
                </Box >

            </ModalContent>
        </Modal >
    )

}
