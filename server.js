const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const routes = require("./routes/noteRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", routes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started ${PORT}`));
