import { extendTheme } from "@chakra-ui/react"


export const theme = extendTheme({
    colors: {
        gray: {
            gray: {
                "900": "#181b23",
                "800": "#1f2029"
            }
        }
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    styles: {
        global: {
            body: {
                bg: "gray.900",
                color: "gray.50"
            }
        }
    }
})