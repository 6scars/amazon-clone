import {sendOrderLogedIn, sendOrderNotLogedIn} from '../data/orders.js'
import {cart} from '../data/cart-class.js'
import {takeUserCart, UserVeryficationToken} from './utils/fetch.js'
let isLogedIn = false;
let userCart;
async function mainFun(){
    const [logData,cartData] = await Promise.all([
        UserVeryficationToken(),
        takeUserCart()
    ])
    if(logData)
        isLogedIn = true;
    if(cartData){
        userCart = cartData;
    }
        
    console.log(isLogedIn)
    renderPlaceYourOrder();
    sendOrderOnClick();
}


const html = `
    <h2>Place Order</h2>
    <form id="orderUserDataForm">
    <label for="firstName">First Name</label>
    <input type="text" id="firstName" name="firstName" required>

    <label for="lastName">Last Name</label>
    <input type="text" id="lastName" name="lastName" required>

    <label for="phoneNumber">Phone Number</label>
    <input type="tel" id="phoneNumber" name="phoneNumber" required pattern="[0-9]{9,15}" placeholder="np. 600123456">

    <label for="email">E-mail</label>
    <input type="email" id="email" name="email" required>

    <label for="address">Adress</label>
    <input type="text" id="adress" name="adress" required>

    <label for="postalCode">Postal Code</label>
    <input type="text" id="postalCode" name="postalCode" required pattern="[0-9]{2}-[0-9]{3}" placeholder="np. 00-001">

    <label for="city">City</label>
    <input type="text" id="city" name="city" required>

    <label for="country">Country</label>
    <select id="country" name="country" required>
        <option value="">-- wybierz kraj --</option>
        <option value="PL">Polska</option>
        <option value="DE">Niemcy</option>
        <option value="CZ">Czechy</option>
        <option value="SK">Słowacja</option>
        <option value="UK">Wielka Brytania</option>
        <option value="Other">Inny</option>
    </select>

    <label for="note"> Additional note to the order</label>
    <textarea id="note" name="note" rows="4" placeholder="Dodatkowe informacje..."></textarea>

    <div class="checkbox-group">
        <input type="checkbox" id="terms" name="terms" required>
        <label for="terms">Accept the regulations </label>
    </div>

    <button class="js-place-order" type="submit">Place Order</button>
    </form>

    `


function renderPlaceYourOrder(){
    document.querySelector('.container').innerHTML = html;
}





function sendOrderOnClick(){
    const form = document.getElementById('orderUserDataForm')
    if(isLogedIn){
        form.addEventListener('submit',async (e)=>{
            e.preventDefault();
            await sendOrderLogedIn(userCart, e.target);
        })
    }else{
        form.addEventListener('submit',async (e)=>{
            e.preventDefault();
            await sendOrderNotLogedIn(cart.cartItems, e.target);
            cart.removeCart();
        })
    }

}

mainFun();