# Pg usage

Node-postgres is a collection of node.js modules for interfacing with your **PostgreSQL** database. It has support for *callbacks*, *promises*, *async/await*, *connection pooling*, *prepared statements*, *cursors* and more

## Get started

Pg has multiple ways of getting a connection. It just depends what type of connection and query you want to run.

It has 3 main types of connection used:

* ### Single Client

  * You create an instance of Client directly.
  * You manually connect, query, and then disconnect.
  * Good for simple scripts or one-off queries.
  * You manage the connection lifecycle yourself.
  
```ts
import { Client } from 'pg';

const client = new Client({ /* config */ });
await client.connect();

const res = await client.query('SELECT * FROM users');

await client.end();
```

* ### Pool with Automatic Querying
  
  * Instead of manually acquiring and releasing clients, use pool.query() directly.
  * The pool automatically acquires and releases connections under the hood.
  * Simple and concise for most use cases where you don’t need explicit transaction control.

```ts
import { Pool } from 'pg';
const pool = new Pool({ /* config */ });

try {
  const res = await pool.query('SELECT * FROM users');
} finally {
  pool.release();
}
  ```

* ### Connection Pool (Manual management)

  * Create a Pool instance.
  * The pool manages multiple client connections internally.
  * You just acquire a client from the pool when needed (*pool.connect()*), run queries, then release it.
  * Improves performance by reusing connections.
  * Handles concurrency well.
  
```ts
import { Pool } from 'pg';

const pool = new Pool({ /* config */ });

const client = await pool.connect();
try {
  const res = await client.query('SELECT * FROM users');
} finally {
  client.release();
}
```
