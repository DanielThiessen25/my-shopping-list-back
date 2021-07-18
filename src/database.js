import pg from 'pg';

const { Pool } = pg;

let database;

if (process.env.NODE_ENV === 'test') {
  database = 'banco_de_testes_my_shopping_list';
} else {
  database = 'my_shopping_list';
}

console.log(`Utilizando o banco de dados '${database}'`);

const connection = new Pool({
  user: 'postgres',
  password: 'senha',
  host: 'localhost',
  port: 5432,
  database: database
});

export default connection;
