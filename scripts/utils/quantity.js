import {cart} from '../../data/cart-class.js';
//return how many items are in cart
export function updateCartQuantity(userCart){
    let quantityCart=0;

    if(userCart && Array.isArray(userCart.cartItems)){
      quantityCart = userCart.cartItems.reduce((sum,item)=>
      sum+= item.quantity,  0
      )
    }else{
      cart.cartItems.forEach((cartItem)=>{
        quantityCart += cartItem.quantity;
      });
    }
      return quantityCart;
  };

export function updateCartQuantityHeader(userCart){
  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity(userCart);
}