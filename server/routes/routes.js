//FILES SETUP
const express = require('express');
const router = express.Router();
//FILES REQUIREMENTS
const loginController = require('../controllers/loginController.js');
const registerController = require('../controllers/registerController.js');
const orderController = require('../controllers/orderController.js');
const viewController = require('../controllers/viewController.js');
const utils = require('../controllers/utilsControllers/utilsControllers.js');

//ROUTES
router.post('/login', loginController.loginUsser);
router.post('/register',registerController.validation, registerController.registerUser);
router.post('/send-order',orderController.sendOrder);
router.get('/userData',utils.authenticateToken, utils.takingUserData, viewController.userData);
router.get('/veryfication-token',utils.authenticateToken,viewController.verifyToken);

module.exports = router;



