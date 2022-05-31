import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface PriceModelProviderProps {
    children: ReactNode
}

type PriceModelContextData = {
    handleOpenPriceModal: () => void;
    handleClosePriceModal: () => void;
    isOpen: boolean;
    price;
    setPrice: (value) => void;

};


const PriceModelContext = createContext({} as PriceModelContextData);

export function PriceModalProvider({ children }: PriceModelProviderProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [price, setPrice] = useState({})


    async function handleOpenPriceModal() {
        setIsOpen(true)
    }

    async function handleClosePriceModal() {
        setIsOpen(false)
    }

    return (
        <PriceModelContext.Provider value={{ handleOpenPriceModal, handleClosePriceModal, isOpen, price, setPrice }} >
            {children}
        </PriceModelContext.Provider>
    )
}
export const usePriceModal = () => useContext(PriceModelContext);
