const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    createdDate:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    zoneCharges:{
        type:Number,
        required:true
    },
    orderId:{
        type:Number,
        required:true
    },
    user:{
        type:{},
        required:true
    },
    items:{
        type:{},
        required:true
    },
    addressDetails:{
        type:{},
        required:true
    }
},{timestamps:true})

module.exports =mongoose.model('order',orderSchema)