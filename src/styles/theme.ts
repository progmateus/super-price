import { extendTheme } from "@chakra-ui/react"


export const theme = extendTheme({
    colors: {

        brand: {
            "100": "#E2FAF4",
            "200": "#C6F6ED",
            "300": "#A3E6DF",
            "400": "#82CDCC",
            "500": "#59A8AD",
            "600": "#418894",
            "700": "#2C6A7C",
            "800": "#1C4E64",
            "900": "#113953",
        },
        input: "#DCDCDC",
        gray: {
            gray: {
                "900": "#181b23",
                "800": "#1f2029",

            },
        },

    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    styles: {
        global: {
            body: {
                bg: "#E5E5E5",
                color: "gray.50"
            }
        }
    }
})