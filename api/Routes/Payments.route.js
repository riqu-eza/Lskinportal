import express from "express";
import {  processPayment } from "../controllers/Payments.controller.js";

const router = express.Router();

router.post("/process", processPayment);
// router.post("/mpesa/callback", Mpesafall);

export default router;
