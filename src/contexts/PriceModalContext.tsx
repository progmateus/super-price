import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface PriceModelProviderProps {
    children: ReactNode
}

type PriceModelContextData = {
    handleOpenPriceModal: () => void;
    handleClosePriceModal: () => void;
    isOpen: boolean;

};


const PriceModelContext = createContext({} as PriceModelContextData);

export function PriceModalProvider({ children }: PriceModelProviderProps) {

    const [isOpen, setIsOpen] = useState(false)

    async function handleOpenPriceModal() {
        console.log(isOpen)
        setIsOpen(true)
    }

    async function handleClosePriceModal() {
        setIsOpen(false)
    }

    return (
        <PriceModelContext.Provider value={{ handleOpenPriceModal, handleClosePriceModal, isOpen }} >
            {children}
        </PriceModelContext.Provider>
    )
}
export const usePriceModel = () => useContext(PriceModelContext);
