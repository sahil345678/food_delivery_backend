import express from "express";
import { getProducts } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.get("/getProducts", getProducts);

export default productRouter;
