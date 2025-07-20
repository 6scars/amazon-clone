require('dotenv').config(); 
const express = require('express'); //helps with output data to html
const morgan = require('morgan'); // just print out some time in ms in terminal
const mongoose = require('mongoose');
const Products = require('./models/modelProduct.js');
const cors = require('cors');
const router = require('./routes/routes.js')

/*-----------------------------------------------------------------------------------------------------------------------------*/
const app = express();
const dbURL = "mongodb+srv://admin:admin123@cluster0.cgq3qeb.mongodb.net/AmazonDataBase?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(`app listening error: ${err}`);
})

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use('/',router);


/*-----------------------------------------------------------------------------------------------------------------------------*/

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

