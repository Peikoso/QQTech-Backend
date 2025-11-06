require("dotenv").config(); // carrega .env da raiz por padrão

const { Pool } = require('pg');
const process = require('process');

const DATABASE_URL = process.env.DATABASE_URL;


if(!DATABASE_URL){
    console.error('ERRO: DATABASE_URL not defined');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});