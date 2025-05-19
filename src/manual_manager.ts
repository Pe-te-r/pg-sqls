import { Pool } from "pg"

    const pool = new Pool({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: Number(process.env.PGPORT)
})

export const secureRead = async (query: string, params: any[] = []) => {
    // const client = (await get_connection()).connect();
    const client = await pool.connect()
    try {
        await  client.query('BEGIN');
        await client.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');

        const result = await  client.query(query, params);

        await  client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await  client.query('ROLLBACK');
        console.error('Transaction failed:', err);
        throw err;
    } finally {
        client.release();
    }
};
  

export const manual_manager = async () => {
    const results = await secureRead('SELECT * FROM users')
    console.table(results)
}