import {cart as cartLocal} from '../../data/cart-class.js';
import {loopCartProd} from '../../data/products.js';
import {getDeliveryOptionOb} from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js'
import {addOrder} from '../../data/orders.js'
import {updateCartQuantity} from '../utils/quantity.js'

let userCart;

export function renderPaymentSummary(data){
  if(data && Array.isArray(data.cartItems)){
    userCart = data;
  }else{
    userCart = cartLocal
  }

    let productPriceCents = 0;
    let deliveryPriceCents = 0;
    
    userCart.cartItems.forEach((cartItem)=>{
        //for price
        const product = loopCartProd(cartItem.productId)
        productPriceCents += product.priceCents * cartItem.quantity;

        //for delivery
        const deliveryOb = getDeliveryOptionOb(cartItem.deliveryOptionId);
        deliveryPriceCents += deliveryOb.priceCents;
    });


    const totalBeforeTaxCents = productPriceCents + deliveryPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;



    let summaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity(userCart)}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row ">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping-and-handling">$${formatCurrency(deliveryPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-order-total">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
          `

    document.querySelector('.js-payment-summary').innerHTML = summaryHTML;

    document.querySelector('.js-place-order')
      .addEventListener('click',async ()=>{
        try{
          const response = await fetch('http://localhost:3000/send-order',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              body: cart.cartItems
            })
          });
          const order = await response.json();
          console.log(order);
          addOrder(order);
          window.location.href = 'orders.html';
        }catch(error){
          console.log('error');
        }

        

      });

}
