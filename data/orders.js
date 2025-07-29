
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
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              body: userCart.cartItems
            })
          });
          const order = await response.json();
          window.location.href = 'orders.html';
        }catch(error){
          console.log('error');
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