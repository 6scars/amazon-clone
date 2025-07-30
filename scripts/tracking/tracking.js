import {loopCartProd as loopProd} from '../../data/products.js';
import {order} from '../../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
const arrayProducts = order.getArrayProductsOrders(orderId, productId);



export function displaySummary(){
    const product = loopProd(productId);
    let deliveryTime = dayjs(arrayProducts.estimatedDeliveryTime).format('dddd, MMMM DD');


   let temp= `
            <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on 
                ${deliveryTime}
            </div>

            <div class="product-info">
                ${product.name}
            </div>

            <div class="product-info">
            Quantity: ${arrayProducts.quantity}
            </div>

            <img class="product-image" src=" ${product.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar js-progress-bar"></div>
            </div>
        </div>
    `;
    
    document.querySelector('.js-main').innerHTML = temp;
    
    
}

export function greenProgress(){
    const orderTime = dayjs(order.loopOrders(orderId).orderTime);
    const deliveryTime = dayjs(arrayProducts.estimatedDeliveryTime);
    const today = dayjs();

    let width = (
        today.diff(orderTime) / deliveryTime.diff(orderTime)
    ) * 100;
    document.querySelector('.js-progress-bar').style.width =`${width}%`;

    statusOfDelivery(width);
}

function statusOfDelivery(width){
    const labels = document.querySelectorAll('.progress-label');
    if(width<50){
        // labels[0].classList.add('aaaaa');
        labels[0].style.color = `green`;
    }else if(width>=50 && width < 100){
        labels[1].style.color =`green`;
    }else if(width > 100){
        labels[2].style.color =`green`;
    }

    // console.log(Array.from(labels).find(div=>div.textContent.toLowerCase().includes('preparing')));
}
