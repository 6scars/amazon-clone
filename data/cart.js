export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) ;

  if(!cart){
    cart = [];
  
    saveToStorage();
  }
  
}




export function addToCart(productId,quant=1){
    let matchingItem=NaN;
    cart.forEach((thing)=>{
      if(thing.productId === productId){
        matchingItem = thing;
      };
    });

    if(matchingItem){
      matchingItem.quantity+=quant;
    }else{
      cart.push(
            {
              productId: productId,
              quantity: quant,
              deliveryOptionId: '1'
      });
    };




    saveToStorage();
};


export function removeFromCart(dataIdElement){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== dataIdElement){
      newCart.push(cartItem);
      
    };
  });
  cart = newCart;

  saveToStorage();
};


export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
  //cart = JSON.parse(localStorage.getItem('cart'));

}

export function overwriteQuantityInCart(prodId, containerElement, quantity){
  cart.forEach((cartItem)=>{
      if(cartItem.productId === prodId){
          cartItem.quantity = quantity;
          
          let quantityOfItems = containerElement.querySelector('.js-quantity-label');
          quantityOfItems.innerHTML = quantity;
          localStorage.setItem('cart', JSON.stringify(cart));

      };
  });
};


export function updateDeliveryOption(productId, deliveryOptionId){
  if(['1','2','3'].includes(deliveryOptionId)){
    let matchingItem;

    cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
      matchingItem.deliveryOptionId = deliveryOptionId;
      saveToStorage();
      }
    });

  }
  

  
  
};

export function quantityInCart(){
  let quantity =0;
  cart.forEach((item)=>{
    quantity += item.quantity;
  })
  return quantity;
}