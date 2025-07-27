const Cart = require('../models/modelCart.js');
const jwt = require('jsonwebtoken');

const createCart = async(req,res,next) =>{
    try{
        const userId = req.user._id;
        console.log(userId)

        const newCart = new Cart({
        userId: userId,
        cartItems:[]
        })
        await newCart.save();
    }catch(err){
        console.log(err);
    }
    
}

const addToCart = async (req,res)=>{
    try{
        const { productId,quantity, deliveryOptionId} = req.body;
        const userId = req.userId;
        const userCart = await Cart.findOne({userId});
        


        if(!userCart){
            const newCart = new Cart({
                userId,
                cartItems: [{ productId, quantity, deliveryOptionId}]
            });
            await newCart.save();
            return res.status(201).json({message:'Cart created and item added'});
        }
        const existing = userCart.cartItems.find(item => item.productId === productId);

        if(existing){
            
            existing.quantity += quantity;
        }else{
            userCart.cartItems.push({ productId,quantity, deliveryOptionId});
        }

        
        await userCart.save();
        res.status(200).json({message:'Product added to cart'});

    }catch(err){
        console.log(`adding to cart error${err}`);
    }
}

const readFromCart = async (req,res)=>{
    const userId = req.userId;
    const userCart = await Cart.findOne({userId})
    if(!userCart){
       return res.status(401).json({message:'Can\'t find such a user'})
    }
    res.json(userCart);
}


// const addToCart = async (req,res) =>{

// }

module.exports = {
    addToCart,
    createCart,
    readFromCart
}