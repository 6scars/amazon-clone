
const loginWindow=`
    <div class="loginWindow">

        <div class="account-informations js-account-informations">
            <div class="top-informations">
                <div class="login-text-header">LOG IN</div>
            </div>
            
            <div class="mid-informations">
                <div class="login-text-input ">
                    <input class="input-account js-username-text-input" type="text" placeholder="login">
                </div>
                <div class="password-text-input ">
                    <input class="input-account js-password-text-input" type="text" placeholder="password">
                </div>
                <div class="email-text-input">
                    <input  class="input-account js-email-text-input" type="text" placeholder="email">
                </div>

                <div class="button-login-div">
                    <button class="button-login js-register-button">LOG IN!</button>
                </div>

            </div>



            <div class ="foot-informations">
                <div class="register-text ">Do you not have account? <h4 class="js-register-link">Register</h4></div>
            </div>
        </div>

    </div>
`


const registerWindow=`
    <div class="loginWindow">

        <div class="account-informations js-account-informations">
            <div class="top-informations">
                <div class="register-text-header">Register</div>
            </div>
            
            <div class="mid-informations">
                <div class="login-text-input ">
                    <input class="input-account js-username-text-input" type="text" placeholder="login">
                </div>
                <div class="password-text-input ">
                    <input class="input-account js-password-text-input" type="text" placeholder="password">
                </div>
                <div class="email-text-input">
                    <input  class="input-account js-email-text-input" type="text" placeholder="email">
                </div>

                <div class="button-login-div">
                    <button class="button-login js-register-text">REGISTER!</button>
                </div>

            </div>



            <div class ="foot-informations">
                <div class="login-text js-login-text">Do you have account? <h4 class="js-login-link">Login</h4></div>
            </div>
        </div>

    </div>
`

const button = document.querySelector('.js-your-account');



button.addEventListener('click',()=>{
    displayLoginWindow();
})




/*  LOGIN   */
function displayLoginWindow(){
    document.querySelector('.js-login-window').innerHTML = loginWindow;

    const buttonLogin = document.querySelector('.button-login');
    const registerlink = document.querySelector('.js-register-link');
    

    buttonLogin.addEventListener('click',()=>{
        loginToAccount();
        hideLoginWindow();
        
    })

    registerlink.addEventListener('click',()=>{
        displayRegisterWindow();
        

    })
    

}


function hideLoginWindow(){
    document.querySelector('.js-login-window').innerHTML ='';
}

async function loginToAccount(){
    const username =  document.querySelector('.js-username-text-input').value;
    const password = document.querySelector('.js-password-text-input').value;
    const email = document.querySelector('.js-email-text-input').value;
    

    console.log(email);

    const respond = await fetch('http://localhost:3000/login',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username:username,
            email: email,
            password:password
        })
    })
    const data = respond.json();

    if(data && respond.status < 400){
        console.log(data);
        localStorage.setItem('jwt',data.token);
        window.location.href='/account.html';
        
    }else{
        console.log('error login');
    }

}




/*  REGISTER   */


function displayRegisterWindow(){
    document.querySelector('.js-login-window').innerHTML = registerWindow;
    const registerButton = document.querySelector('.js-register-text');
    const loginlink = document.querySelector('.js-login-link');


    registerButton.addEventListener('click',()=>{
        registerNewAccount();
    })

    loginlink.addEventListener('click',()=>{
        displayLoginWindow();

    })

    
}

async function registerNewAccount(){
    const Rusername =  document.querySelector('.js-username-text-input').value;
    const Rpassword = document.querySelector('.js-password-text-input').value;
    const Remail = document.querySelector('.js-email-text-input').value;

    const respond =  await fetch('http://localhost:3000/register',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Rusername:Rusername,
            Rpassword: Rpassword,
            Remail: Remail
        })
    })
    const data = respond;
    console.log(data.status);
}

