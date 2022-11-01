// docker run --name pg-mycontacts
// -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5433:5433 -d postgres

// docker exec -it pg-mycontacts bash

// psql -U alex

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'alex',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
