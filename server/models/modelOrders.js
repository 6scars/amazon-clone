const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orders = new Schema({
    orderTime: String,
    totalCostCents: Number,
    products:[{
        productId: String,
        quantity: Number,
        estimatedDeliveryTime: String,
        variation: {type: mongoose.Schema.Types.Mixed, default: null}
    }]
})

const Orders = mongoose.model('Orders', orders);

module.exports = Orders;