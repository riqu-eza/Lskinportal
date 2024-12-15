import Checkout from "../Models/checkout.model.js";
import Order from "../Models/Order.model.js";
import { sendEmail } from "../utils/email.js";

export const createOrder = async (req, res, next) => {
  console.log(req.body);

  try {
    // Validate the request body before proceeding
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }

    // Ignore userId if it's a string 'null'
    if (req.body.userId === "null") {
      delete req.body.userId; // This will exclude userId from being saved
    }

    // Create the order
    const order = await Order.create(req.body);
    console.log("saved", order);
    return res.status(201).json(order); // Use 201 for successful resource creation
  } catch (err) {
    console.error("Error creating order:", err); // Log the error for debugging

    // Handle different error types
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors, // Send back validation errors
      });
    }

    if (err.name === "MongoError" && err.code === 11000) {
      return res.status(409).json({ message: "Duplicate key error" }); // Handle duplicate key error
    }

    // Handle any other errors
    return res.status(500).json({
      message: "An unexpected error occurred",
      error: err.message, // Send the error message for debugging
    });
  }
};

export const getorder = async (req, res, next) => {
  try {
    const { orderId } = req.params; // Get the orderId from the request params

    // Fetch the order from the database using the orderId
    const order = await Order.findById(orderId);

    if (!order) {
      // If no order is found with the given ID, send a 404 error
      return res.status(404).json({ message: "Order not found" });
    }

    // If order is found, return it with a 200 status
    res.status(200).json(order);
  } catch (error) {
    // If there's an error (e.g., invalid orderId format), catch it and pass it to the error handler
    next(error);
  }
};

export const createCheckout = async (req, res, next) => {
  console.log(req.body);

  try {
    // Validate the request body before proceeding
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }

    // Ignore userId if it's a string 'null'
    if (req.body.userId === "null") {
      delete req.body.userId; // This will exclude userId from being saved
    }

    // Create the order
    const checkout = await Checkout.create(req.body);

    // Fetch the complete order details using the orderId
    const completeOrder = await Order.findById(req.body.orderId); // Assuming order._id is the orderId
    console.log("completeorder", completeOrder);
    // Construct the email body with item details
    const emailBody = `
    <div style="background-color: #f4f4f9; padding: 20px; font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4A90E2; text-align: center;">Your LSkin Order Confirmation</h2>
            <p style="font-size: 16px;">Dear ${req.body.firstName} ${req.body.lastName},</p>
            <p style="font-size: 16px;">Your LSkin order has been confirmed. Here are the details:</p>
            <ul style="list-style-type: none; padding: 0;">
                <li style="font-size: 16px; margin-bottom: 8px;">
                    <strong>Order ID:</strong> ${completeOrder._id}
                </li>
                <li style="font-size: 16px; margin-bottom: 8px;">
                    <strong>Total Cost:</strong> ksh${completeOrder.totalPrice}
                </li>
                <li style="font-size: 16px; margin-bottom: 8px;"><strong>Items:</strong></li>
                <ul style="padding-left: 20px; margin: 10px 0; font-size: 16px;">
                    ${completeOrder.items
                      .map(
                        (item) => `
                        <li>${item.name} - Ksh${item.price} x ${item.quantity}</li>
                    `
                      )
                      .join("")}
                </ul>
            </ul>
            <p style="font-size: 16px;">Items will be delivered to:</p>
            <p style="font-size: 16px; color: #4A90E2; margin-bottom: 20px;">
                ${req.body.address}, ${req.body.city}, ${req.body.country}
            </p>
            <p style="font-size: 16px;">Thank you for your order!</p>
            <p style="font-size: 16px; margin-top: 30px; color: #4A90E2; text-align: center;">
                Best regards,<br>LSkin Team
            </p>
        </div>
    </div>
`;

    // Send confirmation email to the customer
    await sendEmail(req.body.email, "Your LSkin Order Confirmation", emailBody);

    console.log("saved", checkout);
    return res.status(201).json(checkout); // Use 201 for successful resource creation
  } catch (err) {
    console.error("Error creating order:", err); // Log the error for debugging

    // Handle different error types
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors, // Send back validation errors
      });
    }

    if (err.name === "MongoError" && err.code === 11000) {
      return res.status(409).json({ message: "Duplicate key error" }); // Handle duplicate key error
    }

    // Handle any other errors
    return res.status(500).json({
      message: "An unexpected error occurred",
      error: err.message, // Send the error message for debugging
    });
  }
};

export const checkout = async (req, res, next) => {
  try {
    const order = await Checkout.find();
    res.status(200).json(order);
  } catch (e) {
    next(e);
  }
};
