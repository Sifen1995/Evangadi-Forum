const mysql2 = require("mysql2");
const express = require("express");
const app = express();
// const mysql2 = require("mysql2");

const cors = require("cors");
// const app = express();
const dotenv = require("dotenv");
const server = require("http").createServer(app);
dotenv.config();
//multiple simeltaneous connection/ create connection pool /reuse/cach
const dbConnection = mysql2.createPool({
  port: process.env.PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10, // Optional: Set a reasonable mAX limit
  connectTimeout: 30000,
  waitForConnections: true, // Optional: Wait for available connections

  queueLimit: 0, // Optional: No limit on queue requset size
});
server.keepAliveTimeout = 120000; // 2 minutes
server.headersTimeout = 120000; // 2 minutes
//connection from the pool
dbConnection.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit the application if connection fails
  } else {
    console.log("Successfully connected to the database.");
    connection.release(); // Release the connection back to the pool
  }
});

// Test the pool with a promise-based query, asycn
dbConnection
  .promise()
  .query("SELECT 1")  //connection successfully return 1, test 
  .then(() => console.log("Database pool is operational"))
  .catch((err) => {
    console.error("Database pool test failed:", err.message);
    process.exit(1);
  });

module.exports = dbConnection.promise();
