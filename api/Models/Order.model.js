import mongoose from "mongoose";

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define the schema for order items
const orderItemSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId, // Assuming the product's id is stored as ObjectId
    ref: 'Product',              // Reference to the Product model (optional)
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

// Define the main schema for the Order
const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,  // Reference to the User model
    ref: 'User',
    required: true,
  },
  items: [orderItemSchema],       // Array of products (order items)
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,            // Store when the order was created
  },
});

// Create and export the Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;
