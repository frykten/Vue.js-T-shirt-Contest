/* jshint esversion : 6 */
const express = require("express");
const cors = require("cors");
const app = express();
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'simplon',
  database : 'tshirts'
});

app.use(cors());

connection.connect();

// query
connection.query('SELECT * from tshirt_list', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results);
});

app.get("/", (req, res) => {
  res.send("<p>hello from node server !</p>");
});

app.get("/list", (req, res) => {
  const q = "SELECT * from tshirt_list";
  connection.query(q, (err, results, fields) => {
    if (err) throw err;
    else res.send(results);
  });
});

app.listen(3001);