const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: String,
    cartItems:[{
        productId: String,
        quantity:Number,
        deliveryOptionId: String
    }],

})
const Cart = mongoose.model('cart',cartSchema);

module.exports = Cart;