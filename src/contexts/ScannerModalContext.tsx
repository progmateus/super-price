import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface ScannerModalProviderProps {
    children: ReactNode;
}

type ScannerModalContextData = UseDisclosureReturn;

const ScannerModalContext = createContext({} as ScannerModalContextData)

export function ScannerModalProvider({ children }: ScannerModalProviderProps) {

    const disclosure = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        disclosure.onClose()
    }, [router.asPath])

    return (
        <ScannerModalContext.Provider value={disclosure} >
            {children}
        </ScannerModalContext.Provider>
    )
}

export const useScannerModal = () => useContext(ScannerModalContext);