import {cart, loadCartFetch} from '../data/cart-class.js';
    loadCartFetch();
    // function helloXhr(){
    // const xhr = new XMLHttpRequest();

    // xhr.addEventListener('load',()=>{
    //     console.log(xhr.response)
    // })

    // xhr.open('GET', 'https://supersimplebackend.dev/greeting');
    // xhr.send();
    // }
    


    // function helloFetch(){
    //     const promise =  fetch('https://supersimplebackend.dev/greeting').then((response)=>{
    //         return response.text()
    //     }).then((data)=>{
    //         return data;
    //     }).then((data)=>{
    //         console.log(data)
    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    //     return promise;
    // }

    // async function helloAsync(){
    //     const promise = await fetch('https://supersimplebackend.dev/greeting').then((response)=>{
    //         return response.text();
    //     })
    //     // const text = await promise.text();
    //     console.log(promise);
    // }   

    // async function sendName(){
    //     const promise = await fetch('https://supersimplebackend.dev/greeting',{
    //         method:'Post',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name: "Marcin"
    //         }),
    //     });
    //     const text = await promise.text();
    //     console.log(text);
    // }
    
    // async function AAAAA(){
    //     await helloXhr();
    //     await helloFetch();
    //     await helloAsync();
    //     await sendName();   
    // }
    // AAAAA();




    // async function getAmaz(){  
    //     try{

        
    //     const promise = await fetch('https://amazon.com').then((response)=>{
    //         return response.text();
    //     })
        
    //     console.log(promise);
    // }catch(error){
    //     console.log('CORS error, Your request was blocked by the backend');
    // }
    // }
    // getAmaz();





    // async function sendFetch(){
    //     try{
    //         const promise = await fetch('https://supersimplebackend.dev/greeting',{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/txt'
    //             }
    //         })
            
    //         if(promise.status >= 400){
    //             throw promise;
    //         }

    //         const text = await promise.text(text);
    //         console.log(text);

    //     }catch(error){
    //         if(error.status === 400){
    //             console.log(await error.json());
    //         }else{
    //             console.log('Network error, try again later.')
    //         }
    //     }
    // }
    //     sendFetch();

    
    // async function sendprod(){
    //     try{
    //         await fetch('http://localhost:3000/NO-products',{
    //             method: 'POST',
    //             headers:{
    //             'Content-Type':'application/json'
    //             },
    //             body:JSON.stringify({
    //                 cart: 'hih'
    //             })
    //         })
    //     }catch(error){
    //         console.log(error)
    //     }

    // }

    // sendprod();
    

    async function sendOrder(){
        try{
            console.log('wysylam zamowienie');
            await fetch('http://localhost:3000/send-order',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body:cart.cartItems
                })
            })
        }catch(error){
            console.log(error)
        }
    }
sendOrder();
    
