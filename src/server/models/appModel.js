// pg model for blessing 
import pg from 'pg';

// const PG_URI = "postgres://wbpifxvw:q8lghllZohqY4rkyYdpyF64er5iguO96@heffalump.db.elephantsql.com/wbpifxvw";
const PG_URI = "postgres://wbpifxvw:q8lghllZohqY4rkyYdpyF64er5iguO96@heffalump.db.elephantsql.com/wbpifxvw";

const pool = new pg.Pool({
  connectionString: PG_URI
});

//Schema for database found in data.sql


const query = (text, params, callback) => {
    console.log('Executed query');
    return pool.query(text, params, callback);
  }

export { query };