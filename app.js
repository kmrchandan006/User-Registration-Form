const mimi = require("mimi.js");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const liveuri = "mongodb+srv://kmrchandan006:chandan%40123@cluster0.dqtnskf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(liveuri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = client.db("yourDatabase"); // Replace with your database name
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = mimi();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/getall", async (req, res) => {
  try {
    const collection = db.collection("yourCollection"); // Replace with your collection name
    const data = await collection.find({}).toArray();
    console.log('Fetched data:', data);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/create", async (req, res) => {
  try {
    const collection = db.collection("yourCollection"); // Replace with your collection name
    const result = await collection.insertOne(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error creating document:", err);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
