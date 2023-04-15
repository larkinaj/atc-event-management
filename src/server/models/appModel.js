// pg model for blessing 
import pg from 'pg';

// const PG_URI = "postgres://wbpifxvw:q8lghllZohqY4rkyYdpyF64er5iguO96@heffalump.db.elephantsql.com/wbpifxvw";
// const PG_URI = "postgres://dvbusoaz:wrzUMGq27Wjwcs14lIS2CNZGpDwPlXSp@tiny.db.elephantsql.com/dvbusoaz";
// const PG_URI = "postgres://lxigtjgl:wP50ncLWiiuuLCbVnZdsgx2XaV5ar3tr@lallah.db.elephantsql.com/lxigtjgl";
const PG_URI = "postgres://eftajamv:JgPtjGfU29NkEq4Fm_4DHEmzpkNXhVnb@chunee.db.elephantsql.com/eftajamv";


const pool = new pg.Pool({
  connectionString: PG_URI
});

//Schema for database found in data.sql

const query = (text, params, callback) => {
    console.log('Executed query: ', text);
    return pool.query(text, params, callback);
  }

export { query };