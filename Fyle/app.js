const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const port = 5001;


app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));
const { connect, getDBInstance } = require("./database");
app.listen(port, () => {
    console.log("listening on port : " + port);
});

let database = null;
connect().then(client => {
    database = client;
});

const apiRoute = require("./api/branches");
app.use("/api/branches", apiRoute);