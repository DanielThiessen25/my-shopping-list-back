import pg from 'pg';

const { Pool } = pg;

let database;

if (process.env.NODE_ENV === 'test') {
  database = 'banco_de_testes_my_shopping_list';
} else {
  database = 'my_shopping_list';
}

const connection = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PASSWORD),
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE
});

console.log(`Utilizando o banco de dados '${database}'`);

export default connection;
