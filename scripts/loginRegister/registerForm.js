const registerFormHTML = `
            <div class="sing-in-header">CREATING ACCOUNT</div>
            <form id="registerForm">
                <div class="enter-email-cont">
                    <p>Enter your email and password to register new account ! </p>
                    <p style="font-size:10px;">Password needs to contain: more than 8 characters, 1 special character or more, 1 great character</p>
                    <p style="font-size:10px;">User name: cant already exists, max 18 characters</p>
                    <p style="font-size:10px;">Email: cant already exists, max 18 charactes</p>
                        <input class="username-form-input" type="text" name="username" autocomplete="username" placeholder="username">
                        <input class="register-form-input" type="email" name="email" autocomplete="email" placeholder="email">
                        <div style="padding:5px 0;"></div>
                        <input class="register-form-input" type="password" name="password" autocomplete="current-password" placeholder="password">
                        <input class="register-form-input2" type="password" name="password2" autocomplete="current-password2" placeholder="repeat password">
                </div>
                <div class="register-button-cont">
                    <div style="color:rgb(201, 2, 2);font-size:10px;display:flex;padding-bottom:5px;" class="error-display-cont">
                    </div>
                    <button type="submit" class="register-button">
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
            <div class="buying-for-work-cont js-having-account">
                <span>Buying for work?</span>
                <a role="button">Create a free business account</a>
            </div>
        
    `;


export default registerFormHTML;
