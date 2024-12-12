import express from "express";
import { ipnreat } from "../controllers/ipn.controller.js";

const router = express.Router();
 
app.post("/", ipnreat)
export default router;