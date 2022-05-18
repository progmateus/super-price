type searchPrice = {
    gtin?: string;
    supermarket_name?: string;
}

export default function encodeQueryData({ gtin = '', supermarket_name = '' }: searchPrice) {

    const payload = {
        gtin,
        supermarket_name
    }
    const queryString = Object.keys(payload)
        .map(key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
        ).join("&")

    const urlEncoded = `?${queryString}`

    return urlEncoded;
}