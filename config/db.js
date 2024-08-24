const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "mysql-21357908-eshandas2002-9c89.h.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_USUYip9GH0gEQNxYxQW",
  database: "defaultdb",
  port: 17612,
  ssl: {
    // Set to true to bypass certificate validation (less secure)
    rejectUnauthorized: false,
  },
});

module.exports = pool;
