const express = require("express")
const app = express()
const cors = require("cors");
const path = require("path")
require("dotenv").config();
require("./config/db");
const routes = require("./routes/index")
const port = process.env.PORT;
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(cors());
app.use("/", routes);
app.listen(port, console.log("Server is running at port ", port));

