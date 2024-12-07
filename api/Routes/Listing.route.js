import express from 'express';
import { addRating, createListing, getCategory, getListing, getProduct } from '../controllers/Listing.controller.js';

const router = express.Router();


router.post("/create", createListing);
router.post('/saverating', addRating);
router.get("/gellisting", getListing);
router.get("/products/:id", getProduct);
router.get("/category/:categoryName",getCategory );

export default router;