import { Pool } from 'pg';

// Copy URI from elephantSQL and paste here:
const PG_URI =
  'postgres url here';

// creating a new pool using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

interface QueryResult {
    rows: unknown[];
    rowCount: number;
  }

// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text: string, params: any[], callback: (err: Error, result: QueryResult) => void) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};