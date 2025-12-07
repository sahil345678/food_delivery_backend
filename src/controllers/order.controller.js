import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import sendEmail from "../utils/sendEmail.js"; // we will create this

export const placeOrder = async (req, res) => {
  const userId = req.user._id;
  const { paymentMethod, address } = req.body;

  // 1️⃣ Fetch cart
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // 2️⃣ Prepare order items
  const orderItems = cart.items.map((item) => ({
    productId: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    quantity: item.quantity,
  }));

  const totalAmount = orderItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // 3️⃣ Create order
  const order = await Order.create({
    userId,
    items: orderItems,
    totalAmount,
    paymentMethod,
    address,
  });

  // 4️⃣ Empty the cart
  await Cart.findOneAndUpdate({ userId }, { items: [] });

  // 5️⃣ Send Email Receipt
  await sendEmail({
    to: req.user.email, // SEND TO USER EMAIL
    subject: "Your Order Receipt",
    html: `
    <h2>Order Confirmation</h2>
    <p>Thank you for ordering!</p>
    <p><strong>Order ID:</strong> ${order._id}</p>

    <h3>Items</h3>
    <ul>
      ${orderItems
        .map(
          (i) => `<li>${i.name} x ${i.quantity} = ₹${i.price * i.quantity}</li>`
        )
        .join("")}
    </ul>

    <p><strong>Total:</strong> ₹${totalAmount}</p>
  `,
  });

  res.status(201).json({ message: "Order placed successfully", order });
};
