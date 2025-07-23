require('dotenv').config(); 
const express = require('express'); //helps with output data to html
const morgan = require('morgan'); // just print out some time in ms in terminal
const mongoose = require('mongoose');
const Products = require('./models/modelProduct.js');
const cors = require('cors');
const path = require('path');
const router = require('./routes/routes.js')

/*-----------------------------------------------------------------------------------------------------------------------------*/
const app = express();
const dbURL = process.env.dbURL;
const PORT = process.env.PORT;

if(!dbURL){
    console.error('lack of dbURL in .env file');
    process.exit(1);
}

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));
app.use('/',router);




mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>{
    app.listen(PORT,()=>{
        console.log(`server is working on ${PORT}`);
    });
}).catch((err)=>{
    console.log(`app listening error: ${err}`);
})



/*-----------------------------------------------------------------------------------------------------------------------------*/

sendProducts();




/* takes from database and send to frontend*/
function sendProducts(){
    app.get('/products',(req,res)=>{
        Products.find().then((result)=>{
            res.json(result);
        }).catch((err)=>{
            console.log('err');
        })
    })

}

