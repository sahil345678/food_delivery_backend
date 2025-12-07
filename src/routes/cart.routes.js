import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/addToCart", verifyJWT, addToCart);
cartRouter.get("/getCart", verifyJWT, getCart);
cartRouter.put("/updateCartItem", verifyJWT, updateCartItem);
cartRouter.delete("/removeFromCart/:productId", verifyJWT, removeFromCart);

export default cartRouter;
