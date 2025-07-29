
const dayjs = require('dayjs');
const Orders = require('../models/modelOrders.js')
const jwt = require('jsonwebtoken');

const Products = require('../models/modelProduct.js');
const {calculateDeliveryDate, getDeliveryOptionOb} = require('../utils/utils.js');


const sendOrder = async (req,res) =>{
    try{
        const order = req.body;
        const userId = req.userId;
        console.log(userId)
        const today = dayjs();
        let totalPrice = 0;
        const tax = 1.10;
        let prodObiects = [];
        // const deliveryObiect = getDeliveryOptionOb(order.body.deliveryOptionId);
        // const estimatedDeliveryTime = calculateDeliveryDate(deliveryObiect) 

        //this is like for all products
        for(const item of order.body){
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
                userId: userId,
                orderTime: today.toISOString(),
                totalCostCents: totalPrice,
                products: prodObiects
            });

            await nOrder.save();
            res.json(nOrder);
        }catch(error){
            console.log('app.js post /send-order',error);
        }
    
}

const sendOrderAnonim = async (req,res) =>{
    try{
        console.log(req.body);
        const order = req.body;
        const today = dayjs();
        let totalPrice = 0;
        const tax = 1.10;
        let prodObiects = [];
        // const deliveryObiect = getDeliveryOptionOb(order.body.deliveryOptionId);
        // const estimatedDeliveryTime = calculateDeliveryDate(deliveryObiect) 

        //this is like for all products
        for(const item of order.body){
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
                totalCostCents: totalPrice,
                products: prodObiects
            });
            
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