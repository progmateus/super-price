interface ICreatePriceDTO {
    id?: string;
    product_id: string;
    supermarket_id: string;
    user_id: string;
    price: number;
}
export { ICreatePriceDTO }