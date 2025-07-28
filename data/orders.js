
class Order {
    orderKey;
    ordersItems;

    constructor(Key){
        this.ordeKey = Key;
    }
    

    addOrder(order){
        this.ordersItems.unshift(order);
        saveToStorage();
    }

    loadFromStorage(){
        JSON.parse(localStorage.getItem(Key)) || [];
    }
    saveToStorage(){
        localStorage.setItem(orderKey, JSON.stringify(orders));
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

export let order = new Order;