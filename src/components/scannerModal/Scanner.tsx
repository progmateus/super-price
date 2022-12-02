import Quagga from '@ericblade/quagga2';
import Router from 'next/router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useScannerModal } from '../../contexts/ScannerModalContext';
import encodeQueryData from '../../utils/encodeURL';
import { ValidatorGTIN } from '../../utils/validatorGTIN';


function getMedian(arr) {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
        return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
    const medianOfErrors = getMedian(errors);
    return medianOfErrors;
}

export function Scanner(props) {
    function scannerEnd() {
        Quagga.offDetected();
        Quagga.offProcessed();
        Quagga.stop();
        /// document.querySelector('scanner').style.display = 'none';
        props.scannerRef.current.style.display = "none"
        onClose();
    }

    const { onClose } = useScannerModal();

    const [onDetected, setOnDetected] = useState({})
    const validatorGTIN = new ValidatorGTIN();

    const errorCheck = useCallback((result) => {
        if (!onDetected) {
            return;
        }
        const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
        if (err < 0.25) {
            setOnDetected(result.codeResult.code);
        }
    }, [onDetected]);

    const handleProcessed = (result) => {
        if (result) {
            console.warn('* quagga onProcessed', result);
            if (result.codeResult && result.codeResult.code) {

                const validated = validatorGTIN.validateGTIN(result.codeResult.code);
                if (validated) {
                    Quagga.onDetected((data) => {
                        const isValidGTIN = validatorGTIN.validateGTIN(data.codeResult.code)
                        if (data.codeResult.format === "ean_13") {
                            if (isValidGTIN === true) {
                                scannerEnd();
                                onClose();
                                setOnDetected(data.codeResult.code)
                                const urlEncoded = encodeQueryData({ gtin: data.codeResult.code });
                                Router.push(`/prices/${urlEncoded}`)

                            }
                        }
                    })
                }
            }
        }
    }

    useLayoutEffect(() => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: props.scannerRef.current,
                constraints: {
                    width: {
                        min: 1024,
                        ideal: 1280,
                        max: 1920
                    },
                    height: {
                        min: 576,
                        ideal: 720,
                        max: 1080
                    },
                    aspectRatio: 4 / 3,
                    ...(!props.deviceId && { facingMode: { ideal: 'environment' }, }),
                    ...(props.deviceId && { deviceId: { exact: props.deviceId } }),
                },

                singleChannel: false,
                area: {
                    top: '25%',
                    right: '0%',
                    left: '0%',
                    bottom: '25%',
                },
            },
            decoder: {
                readers: ["ean_reader"],
                multiple: false
            },
            locator: {
                patchSize: 'small',
                halfSample: false,
            },

        }, async function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");

            Quagga.onProcessed(handleProcessed);

            if (err) {
                return console.log('Error starting Quagga:', err);
            }
            if (props.scannerRef && props.scannerRef.current) {

                await Quagga.CameraAccess.enumerateVideoDevices()
                    .then(async (devices) => {
                        props.setcameraDevices(devices);
                    })
                Quagga.start();
            }
        });
        Quagga.onDetected(errorCheck);

        return () => {
            Quagga.offDetected();
            Quagga.offProcessed();
            Quagga.stop();
        };
    }, [props.deviceId]);

    return null;
}