require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const mailRouter = require("./router/mailRouter");
const addressRouter = require("./router/addressRouter");
const orderRouter = require("./router/orderRouter");
const connectDb = require("./dbConnect");

const port = process.env.PORT || 3000;

// const allowedOrigins = [
//   "https://fashionanr.netlify.app",
//   "https://fashionanr-dashboard.netlify.app",
// ];

// // cors configurations

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// middleware

app.use(cors("*"));
app.use(express.json());
app.use(express.static("public"));
// app.use(cors(corsOptions));

// router middleware endpoints
app.use("/authentication", userRouter);
app.use("/product", productRouter);
app.use("/mail", mailRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);

// listening server
app.listen(port, async () => {
  try {
    await connectDb()
    console.log(`Server Connected at the port Number ${port}`);
  } catch (error) {
    console.error(error);
    
  }
});
