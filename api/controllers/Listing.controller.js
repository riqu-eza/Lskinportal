import Listing from "../Models/Listing.model.js";

export const createListing = async(req, res, next) => {
    console.log(req.body);
    try{
        const listing = await Listing.create(req.body);
        console.log("saved", listing)
        return res.status(200).json(listing);
    }catch(e){
        next(e);
    };
};

export const getListing = async(req, res, next) => {
    try{
        const listing = await Listing.find();
        res.status(200).json(listing);
    }catch(e){
        next(e);
    };
}

export const getProduct = async (req, res, next) => {
    try {
      const productId = req.params.id; 
      console.log(productId);
      const product = await Listing.findById(productId); 
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      return res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      return res.status(500).json({ message: "Server error" });
    }
  };

  export const getCategory = async (req, res, next) => {
    try {
      const categoryName = req.params.categoryName.trim(); 
      console.log("Fetching listings for category:", categoryName);
  
      const listings = await Listing.find({ category: categoryName });
  
      if (!listings.length) {
        return res.status(404).json({ message: "No listings found for this category" });
      }
  
      return res.status(200).json(listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  