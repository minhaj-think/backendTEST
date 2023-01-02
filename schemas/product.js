const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    howToUse:{
        type:String,
        required:true
    },
    form:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    sold:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        required:true
    },
    fakeCost:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    actualCost:{
        type:Number,
        required:true
    },
},{timestamps:true})

module.exports =mongoose.model('products',productSchema)