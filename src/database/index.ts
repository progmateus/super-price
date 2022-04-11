import { Connection, createConnection, getConnectionOptions } from "typeorm"

export default async (host = "database_super_price"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions()
    return createConnection(
        Object.assign(defaultOptions, {
            host
        })
    )
}