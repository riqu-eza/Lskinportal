import express from "express";
import { createOrder } from "../controllers/Order.controller.js";

const router  = express.Router();

router.post("/create", createOrder );

export default router;