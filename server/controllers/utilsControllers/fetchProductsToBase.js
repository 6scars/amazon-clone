const products = require ('../../models/arrayProducts')
const Products = require ('../../models/modelProduct')
const mongoose = require('mongoose');
require('dotenv').config();


async function fetchProducts(){
    try{
        await mongoose.connect(process.env.dbURL)
        console.log('Połączono z bazą danych');
        await Products.insertMany(products);
        console.log('Produkty zostały dodane');
        mongoose.connection.close();
    }catch(err){
        console.log("łączenie z bazą nie udane ", err)
    }
}

fetchProducts();