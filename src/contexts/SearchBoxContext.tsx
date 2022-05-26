import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

interface SearchBoxProviderProps {
    children: ReactNode;
}

type SearchBoxContextData = {
    search: string,
    setSearch: (value: SetStateAction<string>) => void;
}

export const SearchBoxContext = createContext({} as SearchBoxContextData);

export function SearchBoxProvider({ children }) {
    const [search, setSearch] = useState('')

    return (
        <SearchBoxContext.Provider value={{ search, setSearch }} >
            {children}
        </SearchBoxContext.Provider>
    )
}
export const useSearchBox = () => useContext(SearchBoxContext);



