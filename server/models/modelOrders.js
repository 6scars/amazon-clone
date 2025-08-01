const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orders = new Schema({
    userId: String,
    orderTime: String,
    totalCostCents: Number,
    products:[{
        productId: String,
        quantity: Number,
        estimatedDeliveryTime: String,
        variation: {type: mongoose.Schema.Types.Mixed, default: null}
    }],
    firstName: String,
    lastName: String,
    phoneNumber:String,
    email: String,
    adress: String,
    postalCode: String,
    city: String,
    country: String,
    note: {
       type: String,
       maxlength:320
    }

})

const Orders = mongoose.model('Orders', orders);

module.exports = Orders;