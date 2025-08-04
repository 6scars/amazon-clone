import {loadProductsFetch} from '../data/products.js';
import {displaySummary,greenProgress} from './tracking/tracking.js';
import {updateCartQuantityHeader} from './utils/quantity.js'
import {UserVeryficationToken} from './utils/fetch.js';
// import {getUserOrders} from '../data/orders.js';
loadPage()
async function loadPage(){
    const [_, l] = await Promise.all([
        loadProductsFetch(),
        UserVeryficationToken()
    ]);
    

    displaySummary(l);
    greenProgress();
    updateCartQuantityHeader();
    
}

