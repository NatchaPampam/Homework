const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require("./app/models");
const app = express()

var corsOptions = { origin:['http://localhost:3002', 'http://localhost:8080']};

app.use(cors(corsOptions));
app.use(bodyParser.json());// content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));// content-type - application/x-www-form-urlencoded

db.sequelize.sync();
// db.sequelize.sync({force: true});
// force: true  =  drop the table if it already exists

require("./app/routes/user.routes")(app);
// route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to real world." });
});

require("dotenv").config()
let port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});