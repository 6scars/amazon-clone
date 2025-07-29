import {loadOrdersSummary} from './orders/yourOrdersSummary.js';
// import {order as orders} from '../data/orders.js';
import {loadProductsFetch} from '../data/products.js';
import {updateCartQuantity} from '../scripts/utils/quantity.js'
import {cart} from '../data/cart-class.js'
import {updateCartQuantityHeader} from './utils/quantity.js'
import {UserVeryficationToken} from './utils/fetch.js'
let isLogedIn = false;

async function load(){
    const [_, userToken] =await Promise.all([
        loadProductsFetch(),
        UserVeryficationToken()
    ]);
    if(userToken){
        isLogedIn = true
    }

    loadOrdersSummary(isLogedIn);
    updateCartQuantityHeader();

    addEventOnClick();
}
load();


function addEventOnClick(){
    const productEl = document.querySelectorAll('.js-buy-again-button');
    productEl.forEach((el)=>{
            el.addEventListener('click',()=>{
                cart.addToCart(el.dataset.productId);
                updateCartQuantityHeader();
            });
    });
}

