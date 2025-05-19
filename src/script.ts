// in this it is mostly preferred to be done for scripting tools or commandaline tools

import { Client } from "pg";
import dotenv from 'dotenv'

dotenv.config()
const get_connection=async() => {
    const client =await new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: Number(process.env.PGPORT)
    });
    await client.connect()
    return client
}


const readTable = async (query:string,variable:any[]=[]) => {
    const client = await get_connection()
    try {
        const results = await client.query(query,variable)
        console.table(results.rows)
    } catch (error) {
        console.error('Error occured', error)
    } finally {
        client.end()
    }
}



export const main = async () => {
    readTable('SELECT * FROM users')
}
