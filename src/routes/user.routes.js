import express from "express";
import {
  // getCurrentUser,
  loginUser,
  // logoutUser,
  // refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.route("/register").post(registerUser);

userRoutes.route("/login").post(loginUser);

// // secured routes
// userRoutes.route("/logout").post(verifyJWT, logoutUser);
// userRoutes.route("/refresh-token").post(refreshAccessToken); //verify
// userRoutes.route("/change-password").post(verifyJWT, changePassword);
// userRoutes.route("/getCurrent-user").patch(verifyJWT, getCurrentUser);

export default userRoutes;
