import express from "express";
import { createCheckout, createOrder, getorder } from "../controllers/Order.controller.js";

const router  = express.Router();

router.post("/create", createOrder );
router.get("/getorder/:orderId", getorder);
router.post('/checkout',createCheckout )

export default router;