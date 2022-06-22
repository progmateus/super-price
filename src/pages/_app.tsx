import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"
import { PriceModalProvider } from "../contexts/PriceModalContext"
import { ScannerModalProvider } from "../contexts/ScannerModalContext"
import { SearchBoxProvider } from "../contexts/SearchBoxContext"
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"

import { theme } from "../styles/theme"


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SearchBoxProvider>
        <PriceModalProvider>
          <ChakraProvider theme={theme}>
            <SidebarDrawerProvider>
              <ScannerModalProvider>
                <Component {...pageProps} />
              </ScannerModalProvider>
            </SidebarDrawerProvider>
          </ChakraProvider>
        </PriceModalProvider>
      </SearchBoxProvider>
    </AuthProvider>


  )
}
export default MyApp
