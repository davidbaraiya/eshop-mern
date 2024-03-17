const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();
app.use(express.json());

//route import
const productRoute = require("./routes/productRoute");
app.use("/api/v1/", productRoute);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;
