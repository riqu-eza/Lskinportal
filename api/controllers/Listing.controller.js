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