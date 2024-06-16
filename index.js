const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotEnv = require("dotenv");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const mailRouter = require("./router/mailRouter");
const addressRouter = require("./router/addressRouter");
const orderRouter = require("./router/orderRouter");

const port = process.env.PORT || 3000;

// middleware
dotEnv.config();
app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: "*" }));

//mongoose connection to the mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB is connected Successfully");
  })
  .catch((err) => {
    console.error("Error occured while connecting to the mongoDB", err);
  });

// router middleware endpoints
app.use("/authentication", userRouter);
app.use("/product", productRouter);
app.use("/mail", mailRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);

// listening server
app.listen(port, () => {
  console.log(`Server Connected at the port Number ${port}`);
});
