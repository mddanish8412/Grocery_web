import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/connectDB.js";
import { connectCloudinary } from "./config/cloudinary.js";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// database connection
connectDB();

// cloudinary connection
connectCloudinary();

// IMPORTANT FOR RENDER + COOKIES
app.set("trust proxy", 1);

// middlewares
app.use(
  cors({
    origin: "https://grocery-web-bice.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// static folder
app.use("/images", express.static("uploads"));

// test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// api routes
app.use("/api/user", userRoutes);

app.use("/api/seller", sellerRoutes);

app.use("/api/product", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/order", orderRoutes);

app.use("/api/address", addressRoutes);

// error handler
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});