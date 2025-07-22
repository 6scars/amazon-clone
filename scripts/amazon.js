import {cart} from '../data/cart-class.js';
import {products, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {updateCartQuantity,updateCartQuantityHeader} from './utils/quantity.js';
import {searchBar,searchedProducts} from './amazon/amazonSearchBar.js'

new Promise(()=>{
  loadProductsFetch().then(()=>{
    loadProductsGrid();
    searchBar();
  }).catch(()=>{
    return 'promise amazon.js'
  })
})





export function loadProductsGrid(){
  let url = new URL(window.location.href);
  const searchParams = url.searchParams.get('search');
  const searchedItems =searchParams ? searchedProducts(searchParams) : products;
  
  let productsHtml = '';
  let timeoutId;
  searchedItems.forEach((content)=>{
      productsHtml+=`<div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${content.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${content.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars" src="${content.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${content.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${content.getPrice()}
            </div>

            <div class="product-quantity-container" data-product-id = "${content.id}" >
              <select>
                <option selected="" value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            ${content.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart product-${content.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${content.id}"">
              Add to Cart
            </button>
          </div>`;
  });








  function addEventToButtons(){
    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
      button.addEventListener('click',()=>{
        
        const productId = button.dataset.productId;
        const quantSelected = parseInt(document.querySelector(
          `.product-quantity-container[data-product-id="${button.dataset.productId}"]`).querySelector('select').value);
    

        cart.addToCart(productId, quantSelected);
        updateCartQuantityHeader();

    
        const timeoutElement = document.querySelector(`.product-${productId}`)
        timeoutElement.classList.add('visible-added-sign');
        
        if(timeoutId){
          clearTimeout(timeoutId);
            timeoutId = setTimeout(()=>{
              timeoutElement.classList.remove('visible-added-sign');
          },2000);
          }else{
            timeoutId = setTimeout(()=>{
              timeoutElement.classList.remove('visible-added-sign');
            },2000);
          }

        
        
      });
    });
  };





  document.querySelector('.products-grid').innerHTML = productsHtml;
  updateCartQuantityHeader();
  addEventToButtons();
}