const express = require('express'); //helps with output data to html
const morgan = require('morgan'); // just print out some time in ms in terminal
const mongoose = require('mongoose');
const Products = require('./models/modelProduct.js')
const array = require('./models/arrayProducts.js');
const cors = require('cors')

const app = express();
console.log(array);

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
app.use(cors({
    origin: 'http://127.0.0.1:3001',
    methods: ['GET','POST','DELETE','PUT'],
}));




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



