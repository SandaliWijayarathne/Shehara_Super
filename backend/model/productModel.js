import mongoose from "mongoose";


const productSchema =new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    categoty:{
        type:String,
        default:"electornic"
    },
    new_price:{
        type:Number,
        default:300
    },
    old_price:{
        type:Number,
        default:500
    },
    description:{
        type:String,
        default:"Quality"
    },
    availability:{
        type:Boolean,
        default:true
    }
})

export default mongoose.model("products",productSchema);