const mongoose = require('mongoose'); //helps with database mango db
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: String,
    image: String,
    name: String,
    rating:{
        stars: Number,
        count: Number
    },
    priceCents: Number,
    keywords:[String],
    type: String,
    sizeChartLink: String,
    warrantyLink:String

});

const Products = mongoose.model('Products',productSchema);

module.exports = Products;
