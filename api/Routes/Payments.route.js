import express from "express";
import { Mpesafall, Mpesapay } from "../controllers/Payments.controller.js";

const router = express.Router();

router.post("/Mpesapay", Mpesapay);
router.post("/mpesa/callback", Mpesafall);

export default router;
