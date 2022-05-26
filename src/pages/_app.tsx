import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { AuthProvider } from "../contexts/AuthContext"
import { SearchBoxProvider } from "../contexts/SearchBoxContext"
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"

import { theme } from "../styles/theme"


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SearchBoxProvider>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
      </SearchBoxProvider>
    </AuthProvider>

  )
}
export default MyApp
