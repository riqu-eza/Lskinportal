import mongoose from "mongoose";

const {Schema} = mongoose;

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory:{
        type: String,
        required: true,
    },
    ingridients:{
        type: [String],
        required: true,
    },
    howtouse:{
        type: [String],
        required: true,
    },
    imageUrls: {
        type: [],
        required: true,
    },
  
   
},
{timestamps:true}
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;