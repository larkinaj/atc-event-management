// ts version of Blessing's database setup

import pkg from 'pg';
import { QueryResult } from 'pg';
const { Pool } = pkg;

// import pg types
import { builtins, getTypeParser } from 'pg-types';

// const PG_URI = "postgres://wbpifxvw:q8lghllZohqY4rkyYdpyF64er5iguO96@heffalump.db.elephantsql.com/wbpifxvw";
const PG_URI = "postgres://wbpifxvw:q8lghllZohqY4rkyYdpyF64er5iguO96@heffalump.db.elephantsql.com/wbpifxvw";

// create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI
  });

const db = {
    query: async (text: string, params: unknown[]): Promise<QueryResult> => {
        console.log('executed query', text);
        return await pool.query(text, params);
      }
};

export default db;