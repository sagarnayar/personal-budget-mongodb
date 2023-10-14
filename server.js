// "mongodb://127.0.0.1:27017";




// Budget API

const mongoose = require("mongoose");
const budgetModel = require("./models/budgetData");

let url = "mongodb://127.0.0.1:27017";
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use("/", express.static("public"));

app.use(cors());

app.get("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the database");
      budgetModel
        .find({})
        .then((data) => {
          res.json(data);
          console.log(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    });
});

app.post("/api/items", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the database");
      const newItem = new budgetModel(req.body);
      budgetModel
        .insertMany(newItem)
        .then((data) => {
          res.json(data);
          console.log(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    });
});
app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});