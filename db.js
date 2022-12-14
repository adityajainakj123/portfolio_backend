const { Client } = require('pg')
require('dotenv').config();

const client = new Client({
  host: "mouse.db.elephantsql.com",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database:process.env.DATABASE
});
module.exports = client ;
