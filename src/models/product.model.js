import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String, // URL
      required: true,
    },

    category: {
      type: String, // "pizza", "burger", "drinks"
      required: true,
    },

    // optional for food apps
    sizes: [
      {
        size: String, // "S", "M", "L"
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

// export default Product;
