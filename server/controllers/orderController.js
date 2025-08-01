
const dayjs = require('dayjs');
const Orders = require('../models/modelOrders.js')
const mongoose = require('mongoose');
const cartController = require('./cartController.js');
const utilsController = require('./utilsControllers/utilsControllers.js')

const Products = require('../models/modelProduct.js');
const {calculateDeliveryDate, getDeliveryOptionOb} = require('../utils/utils.js');


const sendOrder = async (req,res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const userCart = req.body.userCart;
        const userId = req.userId;
        const userData = req.body.userData;
        const today = dayjs();

        let totalPrice = 0;
        const tax = 1.10;
        let prodObiects = [];

        for(const item of userCart.cartItems){
            const deliveryOb = getDeliveryOptionOb(item.deliveryOptionId);
            const estimatedDelivery = calculateDeliveryDate(deliveryOb);
            const productData = await Products.findOne({id: item.productId});
            if(!productData){
                throw new Error(`Product not found: ${item.productId}`);
            }

            const extra = {
                productId: productData.id,
                quantity: item.quantity,
                estimatedDeliveryTime: estimatedDelivery,
                variation: item.variation || null
            }
            totalPrice += ((productData.priceCents * item.quantity) +deliveryOb.priceCents)*tax;
            prodObiects.push(extra);

        }

        const nOrder = new Orders({
            userId,
            orderTime: today.toISOString(),
            totalCostCents: utilsController.roundMoney(totalPrice),
            products: prodObiects,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber:userData.phoneNumber,
            email: userData.email,
            adress: userData.adress,
            postalCode: userData.postalCode,
            city: userData.city,
            country: userData.country,
            note: userData.note
        });

        await nOrder.save({session});
        await cartController.deleteCart(userId, session);
        await session.commitTransaction();
        session.endSession();
        res.json(nOrder);
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        console.error('Post /send-order error',error);
        res.status(500).json({message:'Order processing failed'});
    }
    
}

const sendOrderAnonim = async (req,res) =>{
    try{
        const userData = req.body.userData;
        const order = req.body;
        const today = dayjs();
        let totalPrice = 0;
        const tax = 1.10;
        let prodObiects = [];

        //this is like for all products
        for(const item of order.userCart){
            const deliveryOb = getDeliveryOptionOb(item.deliveryOptionId);
            const estimatedDelivery = calculateDeliveryDate(deliveryOb);
            const productData = await Products.findOne({id: item.productId});

            const extra = {
                productId: productData.id,
                quantity: item.quantity,
                estimatedDeliveryTime: estimatedDelivery,
                variation: item.variation || null
            }
            totalPrice += ((productData.priceCents * item.quantity) +deliveryOb.priceCents)*tax;
            prodObiects.push(extra);

        }
        const nOrder = new Orders({
            orderTime: today.toISOString(),
            totalCostCents: utilsController.roundMoney(totalPrice),
            products: prodObiects,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber:userData.phoneNumber,
            email: userData.email,
            adress: userData.adress,
            postalCode: userData.postalCode,
            city: userData.city,
            country: userData.country,
            note: userData.note
        });
            await nOrder.save()
            console.log(nOrder)
            return res.json(nOrder);
        }catch(error){
            console.log('app.js post /send-order',error);
        }
    
}


const takeUserOrders = async(req,res)=>{
    try{
        const userId = req.userId;
        const userOrders = await Orders.find({userId: userId})
        if(userOrders){
            return res.status(201).json({userOrders})
        }else{
            return res.status(400).json({message:'didn\'t found the user'})
        }
    }catch(e){
        console.log('takeUserOrders error', e)
        return res.stauts(500).json({message:'internal status error',e})
    }
}

module.exports = {
    sendOrder,
    sendOrderAnonim,
    takeUserOrders
}