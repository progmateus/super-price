
import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useScannerModal } from "../../contexts/ScannerModalContext";
import Quagga from 'quagga';
import { ValidatorGTIN } from "../../utils/validatorGTIN";
import encodeQueryData from "../../utils/encodeURL";
import Router from "next/router";

export function ScannerModal() {

    const { isOpen, onClose } = useScannerModal();

    const validatorGTIN = new ValidatorGTIN();

    function handleCloseScannerModal() {
        Quagga.stop();
        console.log("entrou")
        onClose();
    }

    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {

        setTimeout(() => {

            // navigator.mediaDevices.enumerateDevices()
            //     .then(function (devices) {
            //         devices.forEach(function (device) {
            //             console.log(device.kind + ": " + device.label +
            //                 " id = " + device.deviceId);
            //         });
            //     })

            Quagga.init({
                locate: true,
                numOfWorkers: 4,
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector('#scanner'),    // Or '#yourElement' (optional)
                    constraints: {
                        width: 400,
                        height: 200,
                        facingMode: "environment",
                        deviceId: "66da555043c0b564a291dd6151bc2be79c120237c33930da867cf9a4737f00e5"
                    },
                    singleChannel: false // true: only the red color-channel is read
                },
                frequency: 10,
                decoder: {
                    readers: [
                        "ean_reader",
                    ],
                    debug: {
                        drawBoundingBox: false,
                        showFrequency: false,
                        drawScanline: false,
                        showPattern: false
                    },
                    multiple: false,
                },
                locator: {
                    halfSample: true,
                    patchSize: "x-large", // x-small, small, medium, large, x-large
                    debug: {
                        showCanvas: false,
                        showPatches: false,
                        showFoundPatches: false,
                        showSkeleton: false,
                        showLabels: false,
                        showPatchLabels: false,
                        showRemainingPatchLabels: false,
                        boxFromPatches: {
                            showTransformed: false,
                            showTransformedBox: false,
                            showBB: false
                        }
                    }
                },
                debug: false,

            }, function (err) {
                if (err) {
                    console.log(err);
                    return
                }
                console.log("Initialization finished. Ready to start");
                Quagga.start();
            });
            Quagga.onDetected((data) => {

                const isValidGTIN = validatorGTIN.validateGTIN(data.codeResult.code)

                if (data.codeResult.format === "ean_13") {
                    if (isValidGTIN === true) {
                        console.log(data.codeResult.code, data.codeResult.format)
                        Quagga.stop();

                        const urlEncoded = encodeQueryData({ gtin: data.codeResult.code });
                        onClose();
                        Router.push(`/prices/${urlEncoded}`)
                    }
                }
            })

            var resultCollector = Quagga.ResultCollector.create({
                capture: true, // keep track of the image producing this result
                capacity: 100,  // maximum number of results to store
                blacklist: [   // list containing codes which should not be recorded
                    { code: "3574660239843", format: "ean_13" },
                ],
                filter: function (codeResult) {
                    // only store results which match this constraint
                    // returns true/false
                    // e.g.: return codeResult.format === "ean_13";

                    return codeResult.format === "ean_13"

                }
            });

            Quagga.registerResultCollector(resultCollector);

        }, 500);
    } else {
        alert("Seu navegador não tem suporte para ultilizar o Scanner")
        onClose();
    }

    return (
        <>
            {
                navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function' && (
                    <Modal isOpen={isOpen} onClose={handleCloseScannerModal}>
                        <ModalOverlay />

                        <ModalContent my="auto" mx="5">

                            <Box >
                                <ModalHeader mb="3"> </ModalHeader>

                                <ModalCloseButton color="gray.900" />

                                <ModalBody >

                                    <Flex align="center">
                                        <Box id="scanner"  >

                                        </Box>
                                    </Flex>


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
