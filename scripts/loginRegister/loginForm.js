export const loginFormHTML = `
     
            <div class="sing-in-header">SING IN</div>
            <form id="loginForm">
                <div class="enter-email-cont">
                    <p>Enter your email and password to login </p>
                    
                        <input class="login-form-input" type="email" name="email" autocomplete="username" placeholder="email">
                        <div style="padding:5px 0;"></div>
                        <input class="login-form-input" type="password" name="password" autocomplete="current-password" placeholder="password">
                    
                </div>
                <div class="login-button-cont">
                    <div style="color:rgb(201, 2, 2);font-size:10px;display:flex;padding-bottom:5px;" class="error-display-cont">
                    </div>
                    <button type="submit" class="login-button">
                        Continue
                    </button>
                </div>
            </form>
            

            <div class="agreement-cont">
                <span>By continuing, you agree to Amazon's <a>Conditions of Use</a> and <a>Privacy Notice</a></span>
            </div>
            <div class="need-help-cont">
                <a>Need help?</a>
            </div>
            <div class="devider-vertical"></div>
            <div class="buying-for-work-cont js-buying-for-work-cont">
                <span>Buying for work?</span>
                <a role="button"> Create a free business account</a>
            </div>
        
    `;


export default loginFormHTML;