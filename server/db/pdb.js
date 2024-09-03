const Pool = require("pg").Pool;
const pool = new Pool({
  user: "mhs",
  host: "localhost",
  database: "bfinder",
  password: "db123",
  port: "5432",
});

module.exports = pool;
