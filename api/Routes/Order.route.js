import express from "express";
import { createOrder, getorder } from "../controllers/Order.controller.js";

const router  = express.Router();

router.post("/create", createOrder );
router.get("/getorder/:orderId", getorder);

export default router;