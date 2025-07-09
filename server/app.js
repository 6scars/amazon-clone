const express = require('express'); //helps with output data to html
const morgan = require('morgan'); // just print out some time in ms in terminal
const mongoose = require('mongoose');
const Products = require('./models/modelProduct.js');
const Orders = require('./models/modelOrders.js');
const array = require('./models/arrayProducts.js');
const dayjs = require('dayjs');
const {calculateDeliveryDate, getDeliveryOptionOb} = require('./utils/utils.js');
const cors = require('cors');

const app = express();

const dbURL = "mongodb+srv://admin:admin123@cluster0.cgq3qeb.mongodb.net/AmazonDataBase?retryWrites=true&w=majority&appName=Cluster0"
// mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true})
//     .then(async (result)=>{
//         const count = await Products.countDocuments();
        
//         if(count === 0){
//             await Products.insertMany(array);
//             console.log('data have loaded in');
//         }else{
//             console.log('there are products in base already')
//         }
//     }).catch((err)=>{
//         console.log(err)
//     })


mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(`app listening error: ${err}`);
})

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());



sendProducts();














/* takes from database and send to frontend*/
function sendProducts(){
    app.get('/products',(req,res)=>{
        Products.find().then((result)=>{
            res.json(result);
        }).catch((err)=>{
            console.log(err);
        })
    })

}


app.post('/send-products',(req,res)=>{
  console.log(`send-products: ${req.body}`);
})



app.post('/send-order', async (req, res) => {
    try{

    
    const order = req.body;
    const today = dayjs();
    let totalPrice = 0;
    let prodObiects = [];
    // const deliveryObiect = getDeliveryOptionOb(order.body.deliveryOptionId);
    // const estimatedDeliveryTime = calculateDeliveryDate(deliveryObiect) 

    //this is like for all products
    for(const item of order.body){

        const deliveryOb = getDeliveryOptionOb(item.deliveryOptionId);
        console.log(deliveryOb);
        const estimatedDelivery = calculateDeliveryDate(deliveryOb);
        const productData = await Products.findOne({id: item.productId});

        const extra = {
            productId: productData.id,
            quantity: item.quantity,
            estimatedDeliveryTime: estimatedDelivery,
            variation: item.variation || null
        }
        totalPrice += (productData.priceCents * item.quantity) +deliveryOb.priceCents;
        prodObiects.push(extra);

    }


    

        const nOrder = new Orders({
            orderTime: today.toISOString(),
            totalCostCents: totalPrice,
            products: prodObiects
        });

        // await nOrder.save();
        res.json(nOrder);
    }catch(error){
        console.log('app.js post /send-order',error);
    }
    
});


