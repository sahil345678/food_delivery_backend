import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getProducts = asyncHandler(async (req, res, next) => {
  console.log("hello");
  const products = await Product.find();
  res.json(products);
});

export { getProducts };
