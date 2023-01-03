const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const mysqlConfig = require("./mysql-config");

const db = mysql.createConnection(mysqlConfig);

const handleQueryResult = (err, results, res) => {
  if (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
  if (results.length === 0) {
    return res.status(404).send("No results found");
  }
  res.status(200).send(results);
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/allProducts", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    handleQueryResult(err, results, res);
  });
});

app.get("/filteredTops", (req, res) => {
  const sql = "SELECT * FROM products WHERE category = 'tops'";
  db.query(sql, (err, results) => {
    handleQueryResult(err, results, res);
  });
});

app.get("/filteredBottoms", (req, res) => {
  const sql = "SELECT * FROM products WHERE category = 'bottoms'";
  db.query(sql, (err, results) => {
    handleQueryResult(err, results, res);
  });
});

app.get("/filteredAccessories", (req, res) => {
  const sql = "SELECT * FROM products WHERE category = 'accesories'";
  db.query(sql, (err, results) => {
    handleQueryResult(err, results, res);
  });
});

app.get("/filteredShoes", (req, res) => {
  const sql = "SELECT * FROM products WHERE category = 'shoes'";
  db.query(sql, (err, results) => {
    handleQueryResult(err, results, res);
  });
});

// Comment this out so development build can function
app.use(express.static("assets"));
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "..", "client", "public", "index.html"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
