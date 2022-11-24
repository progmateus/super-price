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
                    width: 400,
                    height: 200,
                    facingMode: "environment",
                    /// deviceId: "7832475934759384534"
                },
                singleChannel: false
            },
            decoder: {
                readers: ["ean_reader"],
                multiple: false
            },
            locator: {
                patchSize: 'medium',
                halfSample: true,
            }
        }, function (err) {
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
                console.log("start")
                Quagga.start();
            }
        });

        Quagga.onDetected(errorCheck);

        return () => {
            Quagga.offDetected();
            Quagga.offProcessed();
            Quagga.stop();
        };;
    }, []);

    return null;
}