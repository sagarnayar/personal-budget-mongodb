// "mongodb://127.0.0.1:27017";
const mongoose = require("mongoose");
const budgetModel = require("./models/budgetData");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/", express.static("public"));

app.get("/budget", (req, res) => {
  mongoose.connect("mongodb://127.0.0.1:27017/budgetApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    budgetModel.find({})
      .then((data) => {
        res.json(data);
        console.log(data);
        mongoose.connection.close();
      })
      .catch((connectionError) => {
        console.error(connectionError);
      });
  })
  .catch((err) => {
    console.error(err);
  });
});

app.post("/api/items", (req, res) => {
  mongoose.connect("mongodb://127.0.0.1:27017/budgetApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    const newItem = new budgetModel(req.body);
    budgetModel.create(newItem) // Use create to insert a single item
      .then((data) => {
        res.json(data);
        console.log(data);
        mongoose.connection.close();
      })
      .catch((connectionError) => {
        console.error(connectionError);
      });
  })
  .catch((err) => {
    console.error(err);
  });
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
