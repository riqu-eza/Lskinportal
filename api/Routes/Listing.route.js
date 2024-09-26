import express from 'express';
import { createListing, getListing } from '../controllers/Listing.controller.js';

const router = express.Router();


router.post("/create", createListing);
router.get("/gellisting", getListing);

export default router;