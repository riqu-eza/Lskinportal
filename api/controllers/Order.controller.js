import Checkout from "../Models/checkout.model.js";
import Order from "../Models/Order.model.js";
export const createOrder = async (req, res, next) => {
    console.log(req.body);

    try {
        // Validate the request body before proceeding
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is required" });
        }

        // Ignore userId if it's a string 'null'
        if (req.body.userId === 'null') {
            delete req.body.userId; // This will exclude userId from being saved
        }

        // Create the order
        const order = await Order.create(req.body);
        console.log("saved", order);
        return res.status(201).json(order); // Use 201 for successful resource creation
    } catch (err) {
        console.error("Error creating order:", err); // Log the error for debugging

        // Handle different error types
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation error",
                errors: err.errors // Send back validation errors
            });
        }

        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).json({ message: "Duplicate key error" }); // Handle duplicate key error
        }

        // Handle any other errors
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: err.message // Send the error message for debugging
        });
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
        if (req.body.userId === 'null') {
            delete req.body.userId; // This will exclude userId from being saved
        }

        // Create the order
        const order = await Checkout.create(req.body);
        console.log("saved", order);
        return res.status(201).json(order); // Use 201 for successful resource creation
    } catch (err) {
        console.error("Error creating order:", err); // Log the error for debugging

        // Handle different error types
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation error",
                errors: err.errors // Send back validation errors
            });
        }

        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).json({ message: "Duplicate key error" }); // Handle duplicate key error
        }

        // Handle any other errors
        return res.status(500).json({
            message: "An unexpected error occurred",
            error: err.message // Send the error message for debugging
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
  
