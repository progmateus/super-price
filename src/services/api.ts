import axios from "axios";


const api = axios.create({
    baseURL: "https://api.cosmos.bluesoft.com.br",
    headers: { 'X-Cosmos-Token': 'QxC6c4I9K1cytGCKsWvKGA' }
})


export async function getProductByGtin(gtin: string) {
    try {
        const { data } = await api.get(`gtins/${gtin}`)

        const product = {
            name: data.description,
            brand: data.brand.name,
            gtin: data.gtins[0].gtin,
            thumbnail: data.thumbnail
        }
        return product

    } catch (error) {
        console.log(error);
    }
}