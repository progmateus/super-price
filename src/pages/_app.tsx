import { AppProps } from "next/app"
import { Header } from "../components/header"

import "../styles/global.scss"


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )

}

export default MyApp
