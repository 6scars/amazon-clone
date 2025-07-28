import {loopCartProd} from './products.js';



class Cart{
    cartItems;
    localStorageKey;


    constructor(Key){
        this.localStorageKey = Key;
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) ;
      
        if(!this.cartItems){
          this.cartItems = [];
        
          this.saveToStorage();
        } 
      };



      addToCart(productId,quant=1){
          let matchingItem=NaN;
          this.cartItems.forEach((thing)=>{
            if(thing.productId === productId){
              matchingItem = thing;
            };
          });
      
          if(matchingItem){
            matchingItem.quantity+=quant;
          }else{
            this.cartItems.push(
                  {
                    productId: productId,
                    quantity: quant,
                    deliveryOptionId: '1'
            });
          };
      
      
      
      
          this.saveToStorage();
      };



    removeFromCart(dataIdElement){
        const newCart = [];
      
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId !== dataIdElement){
            newCart.push(cartItem);
            
          };
        });
        this.cartItems = newCart;
      
        this.saveToStorage();
      };


      saveToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
        //cart = JSON.parse(localStorage.getItem('cart'));
    
    };



    overwriteQuantityInCart(prodId, containerElement, quantity){
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId === prodId){
                cartItem.quantity = quantity;
                
                let quantityOfItems = containerElement.querySelector('.js-quantity-label');
                quantityOfItems.innerHTML = quantity;
                this.saveToStorage()
        
            };
        });
    };




    updateDeliveryOption(productId, deliveryOptionId){
        if(['1','2','3'].includes(deliveryOptionId)){
          let matchingItem;
      
          this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            matchingItem = cartItem;
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
            }
          });
      
        }       
      };

      quantityInCart(){
        let quantity =0;
        this.cartItems.forEach((item)=>{
          quantity += item.quantity;
        })
        return quantity;
    }
}
export let cart = new Cart('cart');


export async function loadCartFetch(fun){
  const promise = await fetch('https://supersimplebackend.dev/cart').then((response)=>{
    return response.text();
  });

}
