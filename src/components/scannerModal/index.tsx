
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useScannerModal } from "../../contexts/ScannerModalContext";
import Quagga from 'quagga';

export function ScannerModal() {

    const { isOpen, onClose } = useScannerModal();


    async function handleCloseScannerModal() {

        console.log(isOpen)


        console.log("entrou aqui")
        await Quagga.stop();
        console.log("deu stop")

        onClose();
        console.log("deu close")

        console.log(isOpen)

    }

    if (typeof window !== "undefined") {

        setTimeout(() => {





            navigator.mediaDevices.enumerateDevices()
                .then(function (devices) {
                    devices.forEach(function (device) {
                        console.log(device.kind + ": " + device.label +
                            " id = " + device.deviceId);
                    });
                })

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
                    singleChannel: true // true: only the red color-channel is read
                },
                frequency: 1,
                decoder: {
                    readers: [
                        "ean_reader",
                        // "ean_8_reader",
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
                // debug: false,

            }, function (err) {
                if (err) {
                    console.log("Deu erro", err);
                    return
                }
                console.log("Initialization finished. Ready to start");
                Quagga.start();
            });
            Quagga.onDetected((data) => {


                /// console.log(data.codeResult);

                console.log("no detected: ", resultCollector.getResults())


            })

            var resultCollector = Quagga.ResultCollector.create({
                capture: true, // keep track of the image producing this result
                capacity: 20,  // maximum number of results to store
                blacklist: [   // list containing codes which should not be recorded
                    { code: "3574660239843", format: "ean_13" }],
                filter: function (codeResult) {
                    // only store results which match this constraint
                    // returns true/false
                    // e.g.: return codeResult.format === "ean_13";
                    return true;
                }
            });

            Quagga.registerResultCollector(resultCollector);

            console.log("no var: ", resultCollector.getResults())



        }, 500);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent my="auto" mx="5">

                <Box >
                    <ModalHeader bg="blue.300"> </ModalHeader>

                    <ModalCloseButton color="gray.900" />

                    <ModalBody id="scanner" bg="green.300" >


                    </ModalBody>

                    <ModalFooter bg="pink.300">
                    </ModalFooter>
                </Box >

            </ModalContent>
        </Modal >
    )

}
