
class Order {
    orderKey;
    ordersItems;

    constructor(Key){
        this.orderKey = Key;
        this.ordersItems = this.loadFromStorage(Key);
    }
    

    addOrder(order){
        this.ordersItems.unshift(order);
        this.saveToStorage();
    }

    loadFromStorage(){
        return JSON.parse(localStorage.getItem(this.orderKey)) || [];
    }
    saveToStorage(){
        localStorage.setItem(this.orderKey, JSON.stringify(this.ordersItems));
    }


    loopOrders(id){
        const founded = this.ordersItems.find(order => order.id === id);
        return founded || 'none'
    }
    getArrayProductsOrders(orderId,productId){
        const arrayProducts = loopOrders(orderId).products;
        const a = arrayProducts.find(p => p.productId === productId)

        return a || 'none'
    }


}

export let order = new Order('orders');


export async function sendOrderLogedIn(userCart){
    try{
          const response = await fetch('http://localhost:3000/send-order',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
              body: userCart.cartItems
            })
          });
          const order = await response.json();
          window.location.href = 'orders.html';
          return order;
        }catch(error){
          console.log('didn\'t send the order try again later');
        }
}

export async function sendOrderNotLogedIn(userCart){
        try{
          const response = await fetch('http://localhost:3000/sendOrderAnonymous',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              body: userCart.cartItems
            })
          });
          const norder = await response.json();
          order.addOrder(norder);
          window.location.href = 'orders.html';
        }catch(error){
          console.log('error: ',error);
        }
}

export async function getUserOrders(){
  try{
    const response = await fetch('http://localhost:3000/takeUserOrders',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`
      }
    });
    const data = await response.json()
    if(response.ok){
      return data.userOrders;
    }else{
      return 'getuUserOrders function error'
    }
  }catch(e){
    console.error('didnt find userOrders');
  }
}