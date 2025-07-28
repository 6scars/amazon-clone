
export async function sendProductToCart(productId, quantSelected){
    try{
        const response = await fetch('/send-product-to-cart',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({
                productId,
                quantity:quantSelected,
                deliveryOptionId:'1'
            })
            })

            const data = await response.json()

    }catch(e){
        console.log('sendProductToCart error:',e);
    }
    
}

export async function UserVeryficationToken(){
    try{
        const token = localStorage.getItem('jwt');
        if(!token) return false;
        const respond = await fetch('http://localhost:3000/veryfication-token',{
            method:'GET',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        
        if(!respond.ok){
            console.warn('Token is not valid or server error');
            return false
        }

        const data = await respond.json();
        console.log(data)
        return data;
    }catch(err){
        console.log('authorization Token error:',err);
        return false;
    }

}

export async function takeUserData() {
    try {
        const respond = await fetch('http://localhost:3000/userData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        if (!respond.ok) {
            const errorData = await respond.json();
            
            throw new Error(errorData.message || 'takeUserData fetch error');
        }



        const data = await respond.json();
        return data.user
    } catch (err) {
        console.warn('takingUserData failed',err);
    }
}

export async function takeUserCart(){
    try{   
        const response = await fetch('http://localhost:3000/userDataCart',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        if(response.ok){
            return await response.json();
        }else{
            return null
        }
        

    }catch(err){
        console.log('error takeUserData',err);
    }
}

export async function removeFromCart(productId){
    try{
        const response = await fetch('http://localhost:3000/removeProdItemCart',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({
                productId
            })
        })
        if(response.status < 400) return await response.json();    
        throw 'didnt remove from cart'
    }catch(err){
        console.log('removeFromCart error: ',err)
    }
}

export async function changeDeliveryOption(productId, deliveryOptionId){
    try{
        const response = await fetch('http://localhost:3000/changeDeliveryOption', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(
                {
                    productId,
                    deliveryOptionId
                }
            )
        });
        const data = await response.json();
        return data.userCart;
    }catch(e){
        console.log('changeDeliveryOption error',e);
    }

}

export async function changeQuantityCart(productId, quantity){
    try{
        const response = await fetch('http://localhost:3000/changeQuantityInCart',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                productId,
                quantity
            })
        })
        const data = await response.json()
        return data.userCart;
    }catch(e){
        console.log('changeQuantityCart error:',e)
    }
}