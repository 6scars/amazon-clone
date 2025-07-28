//FILES SETUP
const express = require('express');
const router = express.Router();
const path = require('path');
//FILES REQUIREMENTS
const loginController = require('../controllers/loginController.js');
const registerController = require('../controllers/registerController.js');
const orderController = require('../controllers/orderController.js');
const viewController = require('../controllers/viewController.js');
const cartController = require('../controllers/cartController.js');
const utils = require('../controllers/utilsControllers/utilsControllers.js');

//MAIN
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../..','amazon.html'));
})
router.get('/loginRegister',(req,res)=>{
    res.sendFile(path.join(__dirname,'../..','loginRegister.html'));
})
router.get('/checkout',(req,res)=>{
    res.sendFile(path.join(__dirname,'../..','checkout.html'));
})




//ROUTES
router.post('/login', loginController.loginUsser);
router.post('/register',registerController.validation, registerController.registerUser, cartController.createCart);
router.post('/send-order',orderController.sendOrder);
router.post('/sendOrderAnonymous',orderController.sendOrderAnonim);
router.get('/userData',utils.authenticateToken, utils.takingUserData, viewController.userData);
router.get('/veryfication-token',utils.authenticateToken, viewController.verifyToken);

//for cart
router.post('/send-product-to-cart',utils.authenticateToken, cartController.addToCart);
router.get('/userDataCart',utils.authenticateToken, cartController.readFromCart );
router.post('/removeProdItemCart', utils.authenticateToken, cartController.removeFromCart);
router.post('/changeDeliveryOption', utils.authenticateToken, cartController.changeDeliveryOption);
router.post('/changeQuantityInCart', utils.authenticateToken, cartController.changeQuantityInCart);

module.exports = router;



