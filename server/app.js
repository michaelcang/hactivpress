require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const indexRouter = require("./routes/index");
const articleRouter = require("./routes/article");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const { DB_USER, DB_PASS } = process.env;

const url = `mongodb://${DB_USER}:${DB_PASS}@ds125381.mlab.com:25381/hactivpress`;

mongoose.connect(url, { useNewUrlParser: true }).then(()=> {
  console.log('connected to db')
});

app.use("/", indexRouter);
app.use("/article", articleRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening in port 3000");
});
