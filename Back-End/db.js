const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "2912maJD2001",
  host: "localhost",
  port: 5432,
  database: "goat-data",

});

module.exports = pool;
