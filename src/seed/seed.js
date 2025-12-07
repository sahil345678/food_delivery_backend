import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { products } from "./product.js";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("MongoDB connected");

    await Product.deleteMany(); // clear old data
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("New products inserted");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
