import {order, getUserOrders} from  '../../data/orders.js';
import {formatCurrency} from '../utils/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {loopCartProd as loopOrderProd} from '../../data/products.js'

let isLogedIn = false;
let orders;
export async function loadOrdersSummary(data = false){
    isLogedIn = data;

    if(isLogedIn){
        orders = await getUserOrders();
    }else{
        orders = order.loadFromStorage();
    }
    console.log(orders)

    let wholeHTML = '';
    orders.forEach((order)=>{
        const OrderPlaced = dayjs(order.orderTime).format('YYYY.MM.DD HH:mm');


        let htmlSummary =     `
                <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                                <div>${OrderPlaced}</div>
                                </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                    <div>${formatCurrency(order.totalCostCents)}$</div>
                                    </div>
                                </div>
                            
                            <div class="order-header-right-section">
                                <div class="order-header-label">Order ID:</div>
                                    <div>${order._id}</div>
                                </div>
                            </div>
                        ${details(order,OrderPlaced)}

                    </div>
                </div>
        `

        wholeHTML += htmlSummary;
    })

    document.querySelector('.js-orders-grid').innerHTML = wholeHTML;
}


function details(list,OrderPlaced){
    let HTML='';
    list.products.forEach((orderPro)=>{ 
        console.log(orderPro)
        let product = loopOrderProd(orderPro.productId);
        let deliveryTime = dayjs(orderPro.estimatedDeliveryTime).format('YYYY.MM.DD');
        let temp= `
        <div class="order-details-grid"> 
            <div class="product-image-container">
                <img src="${product.image}">
            </div>         
            <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                <div class="product-delivery-date">
                    Arriving on: ${deliveryTime}
                </div>
                <div class="product-quantity">
                    Quantity: ${orderPro.quantity}
                </div>
                    <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.id}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                        <a href="tracking.html?orderId=${list._id}&productId=${product.id}&imageURL=${product.image}&productName=${product.name}&quant=${orderPro.quantity}&orderTime=${OrderPlaced}&estimatedDeliveryTime=${orderPro.estimatedDeliveryTime}">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </a>
                    </div>
                </div>
        `
        HTML+=temp;
    });


    return HTML;
}

