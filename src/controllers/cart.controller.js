import Cart from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const addToCart = async (req, res) => {
  const userId = req.user._id; // from auth middleware
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "Invalid cart data" });
  }

  let cart = await Cart.findOne({ userId });

  // If cart doesn't exist → create
  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId, quantity }],
    });

    return res.status(201).json({ message: "Item added to new cart", cart });
  }

  // Check if product already in cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    // Update quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({ productId, quantity });
  }

  await cart.save();

  res.status(200).json({ message: "Item added to cart", cart });
};

export const getCart = async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId }).populate("items.productId");

  res.status(200).json({ cart });
};

export const updateCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be >= 1" });
  }

  const cart = await Cart.findOne({ userId });

  const item = cart.items.find((i) => i.productId.toString() === productId);

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();

  res.status(200).json({ message: "Cart updated", cart });
};

export const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  );

  res.status(200).json({ message: "Item removed", cart });
};
