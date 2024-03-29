const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//route import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/api/v1/", productRoute);
app.use("/api/v1/auth/", userRoute);
app.use("/api/v1/", orderRoute);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;
