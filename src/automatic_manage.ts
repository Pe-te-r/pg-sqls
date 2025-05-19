import { Pool } from "pg";

const get_connection=async() => {
    const client =await new Pool({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: Number(process.env.PGPORT)
    });
    // await client.connect()
    return client
}


const readTable = async (query: string, variable: any[] = []) => {
    const client = await get_connection()
    try {
        
        const results = client.query(query, variable)
        console.table((await results).rows)
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        client.end()
    }
}
export const AutomaticManager = async () => {

    readTable('SELECT * FROM users')
}

