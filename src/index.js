require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const routes = require("./routes");

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
//app.use (cors({origin: 'http://localhost:3000'}));
app.use(cors());
app.use(bodyParser.json()); //entender quando enviar uma req. em json para minha api
app.use(express.json()); // falando p/ o express que eu estou utilizando JSON
app.use(bodyParser.urlencoded({ extended: false })); //entender quando enviar uma parametros via url
app.use(morgan("dev"));

app.use("/files", express.static(path.resolve(__dirname, "..", "upload")));

app.use(routes);

app.listen(3333);
