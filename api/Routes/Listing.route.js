import express from 'express';
import { createListing, getCategory, getListing, getProduct } from '../controllers/Listing.controller.js';

const router = express.Router();


router.post("/create", createListing);
router.get("/gellisting", getListing);
router.get("/products/:id", getProduct);
router.get("/category/:categoryName",getCategory );

export default router;