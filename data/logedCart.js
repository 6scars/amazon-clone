

export function countQuantity(cartItems) {
  if (!Array.isArray(cartItems)) return 0;

  return cartItems.reduce((total, item) => {
    return total + (item.quantity || 0);
  }, 0);
}

export function removeFromCart(){
  
}
