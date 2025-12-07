import express from "express";
import { placeOrder } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyJWT, placeOrder);

export default orderRouter;
