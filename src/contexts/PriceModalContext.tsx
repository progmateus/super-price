import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface PriceModalProviderProps {
    children: ReactNode
}

type PriceModelContextData = {
    handleOpenPriceModal: () => void;
    handleClosePriceModal: () => void;
    isOpen: boolean;
    price;
    setPrice: (value) => void;
    type;
    setType;

};


const PriceModelContext = createContext({} as PriceModelContextData);

export function PriceModalProvider({ children }: PriceModalProviderProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [price, setPrice] = useState({})
    const [type, setType] = useState('')

    async function handleOpenPriceModal() {
        setIsOpen(true)
    }

    async function handleClosePriceModal() {
        setIsOpen(false)
    }

    return (
        <PriceModelContext.Provider value={{ handleOpenPriceModal, handleClosePriceModal, isOpen, price, setPrice, type, setType }} >
            {children}
        </PriceModelContext.Provider>
    )
}
export const usePriceModal = () => useContext(PriceModelContext);
