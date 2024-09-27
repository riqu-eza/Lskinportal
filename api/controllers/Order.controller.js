import Order from "../Models/Order.model.js";

export const createOrder = async(req,res,next) =>{
    console.log(req.body);
    try{
        const order = await Order.create(req.body);
        console.log("saved", order)
        return res.status(200).json(order);
    }catch(err){
        next(err);
    };
};