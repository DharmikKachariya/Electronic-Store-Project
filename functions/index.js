const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// body parser json data
app.use(express.json());

// cross orgin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// api end point
app.get("/", (req, res) => {
  return res.send("hellow dharmik");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productsRoute = require("./routes/products");
app.use("/api/products/", productsRoute);

exports.app = functions.https.onRequest(app);
