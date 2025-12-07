import express from "express";
import cookieParser from "cookie-parser";

import cors from "cors"; // <--- IMPORT THIS

const app = express();

// --- ADD THIS BLOCK ---
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your React frontend
    credentials: true, // Allow cookies to be sent
  })
);

// const app = express();

app.use(express.json()); //enable backend to receive json files
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routed import
import userRoutes from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
// routes declaration
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);

// Global error handler should be the last middleware to catch errors
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    success: error.success || false,
    message: error.message || "Internal server error.",
    errors: error.errors || [],
  });
});

export { app };
