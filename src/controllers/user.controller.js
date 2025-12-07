import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

//-----------------------------------------------access and refresh token---------------------------------
// const generateAccessAndRefereshTokens = async (userId, next) => {
//   try {
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });
//     return { accessToken, refreshToken };
//   } catch (error) {
//     next(new ApiError(500, "error generating accessToken"));
//   }
// };
// const generateAccessAndRefereshTokens = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });
//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(500, "error generating accessToken");
//   }
// };

// --------------------------------------------register user controller-----------------------------------
const registerUser = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;

  console.log("alsf", req.body);

  if ([email, name, password].some((i) => i?.trim() === "")) {
    return next(new ApiError(400, "All fields are required."));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ApiError(409, "user already registered."));
  }

  //   console.log("existing user", existingUser);

  const user = await User.create({
    name,
    email,
    password,
  });
  //   try {
  //     const user = await User.create({ name, email, password });
  //   } catch (err) {
  //     console.log("Mongoose Error:", err);
  //     return next(new ApiError(500, "DB Error: " + err.message));
  //   }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log("cereaed use", createdUser);

  //   if (!createdUser) return next(500, "Failed to register user.");
  if (!createdUser) return next(new ApiError(500, "Failed to register user."));

  return res.status(200).json({
    success: true,
    message: "user registered successfully.",
    createdUser,
  });
});

export {
  registerUser,
  // loginUser,
};
