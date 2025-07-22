import loginFormHTML from './loginRegister/loginForm.js';
import registerFormHTML from './loginRegister/registerForm.js';
 

loginLink();



function loginLink(){
    document.querySelector('.login-form-cont').innerHTML = loginFormHTML;
    const newAccountLink = document.querySelector('.js-buying-for-work-cont');

    newAccountLink.addEventListener('click',()=>{
        registerLink();
    })

    login();
}

function registerLink(){
    document.querySelector('.login-form-cont').innerHTML = registerFormHTML;
    const loginAccountLink = document.querySelector('.js-having-account');

    loginAccountLink.addEventListener('click',()=>{
        loginLink();
    })

    register();
}



function register(){
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async(e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const RuserName = formData.get('username')
        const Remail = formData.get('email');
        const Rpassword = formData.get('password');
        const Rpassword2 = formData.get('password2');
        if(Rpassword !==Rpassword2){
            document.querySelector('.error-display-cont').innerHTML = 'Passwords are not the same';
            return 0
        }
        if(Rpassword.length <8){
            document.querySelector('.error-display-cont').innerHTML = 'Passwords is too short';
            return 0
        }
        if( !(/[A-Z]/.test(Rpassword))){
            document.querySelector('.error-display-cont').innerHTML = 'Passwords must contain at least one upper letter';
            return 0
        }
        const sChars = `!@#$%^&*()_+-=[]{};:'",.<>/?\\|~\``;
        const containSChar = sChars.split("").some(char => Rpassword.includes(char));
        if(!containSChar){
            document.querySelector('.error-display-cont').innerHTML = 'Passwords must contain at least one special character';
            return 0
        }

        
        const respond = await fetch('http://localhost:3000/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            RuserName,
            Remail,
            Rpassword,
            Rpassword2,
            })
        })
        

        const data = await respond.json();
        document.querySelector('.error-display-cont').innerHTML = data.message;
        if(respond.status < 400){
            setTimeout(()=>{
                document.querySelector('.error-display-cont').innerHTML = data.message;
            },2000)
        }
    })
}


function login(){
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
            if(respond.status < 400){
                document.querySelector('.error-display-cont').innerHTML = data.message;
                setTimeout(()=>{
                    localStorage.setItem('jwt',data.token);
                    window.location.href = 'amazon.html';
                    
                },2000)
            }else{
                document.querySelector('.error-display-cont').innerHTML = data.message;
                throw data;
            }
        
        }catch(err){
            console.log(err);
        }
    })
}




