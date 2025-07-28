import {mainHTML} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProductsFetch} from '../data/products.js'
import {loadCartFetch} from '../data/cart-class.js'
import {takeUserCart} from './utils/fetch.js';
//import '../data/cart-class.js';
// import '../data/backend-practice.js';

let userCart;

async function loadPage(){
    try{
        const [_ , __ , data] = await Promise.all([
            loadProductsFetch(),
            loadCartFetch(),
            takeUserCart()
        ]);
        userCart = data;
    }catch(error){
        console.log('error loadPage');
    }

    
    


    mainHTML(userCart);
    renderPaymentSummary();
    renderCheckoutHeader(userCart);

}
loadPage();



/*

Promise.all([
    loadProductsFetch().then(()=>{
        return 'value1'
    }),

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');
        });
    })

]).then((value)=>{
    mainHTML();
     renderPaymentSummary();
     renderCheckoutHeader();
})
*/

/*
new Promise((resolve)=>{

    loadProducts(()=>{
        resolve('value1');
    })


}).then((value)=>{
    console.log(value);

    return new Promise((resolve)=>{
        resolve('value2');

    });
}).then((value)=>{
    
        mainHTML();
     renderPaymentSummary();
     renderCheckoutHeader();
     console.log(value);
     
});

*/



// loadProducts(()=>{
//     loadCart(()=>{
    // mainHTML();
    //  renderPaymentSummary();
    //  renderCheckoutHeader();
//     })
// })