const Cart = require('../models/modelCart.js');

const createCart = async(req,res,rext) =>{
    try{
        const userId = req.user._id;
        console.log(userId)

        const newCart = new Cart({
        userId: userId,
        cartItems:[]
        })
        console.log('new cart creating')
        await newCart.save();
    }catch(err){
        console.log(err);
    }
    
}

// const addToCart = async (req,res) =>{

// }

module.exports = {
    // addToCart
    createCart
}