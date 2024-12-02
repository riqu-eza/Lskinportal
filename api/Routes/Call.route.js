import express from "express";
import { call } from "../controllers/Payments.controller.js";


const router = express.Router();

router.post("/" ,call )

export default router;