import{cart} from '../../data/cart-class.js';
import {updateCartQuantity} from '../utils/quantity.js';
export function renderCheckoutHeader(userCart){
    let header = '';
    if(userCart){
        header = `Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="amazon.html">${updateCartQuantity(userCart)} items</a>)`
    }else{
        header = `Checkout (<a class="return-to-home-link js-return-to-home-link"
            href="amazon.html">${cart.quantityInCart()} items</a>)`
    }
    

    document.querySelector('.js-checkout-header-middle-section').innerHTML = header;
    
}