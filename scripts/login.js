const form = document.getElementById('loginForm');

form.addEventListener('submit', async(e)=>{
    try{
        e.preventDefault()
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const respond = await fetch('http://localhost:3000/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        const data = await respond.json();
        console.log('respond.status', respond.status)
        if(respond.status < 400){
            console.log(data)
            setTimeout(()=>{
                localStorage.setItem('jwt',data.token);
                window.location.href = 'amazon.html';
                
            },5000)
        }else{
            throw data;
        }
    
    }catch(err){
        console.log(err);
    }
})
