import {takeUserData} from '../utils/fetch.js';
let isLogedIn = false;
let userData;
verifying();




async function verifying(){
  userData = await takeUserData();
  if(userData){
    isLogedIn = true;
  }
  renderHeaderHTML()
}



function renderHeaderHTML(){


  const headerHTML = `
        <div class="amazon-header-left-section">
          <div class="amazon-logo-container">
            <a href="amazon.html" class="header-link">
              <img class="amazon-logo"
                src="images/amazon-logo-white.png">
              <img class="amazon-mobile-logo"
                src="images/amazon-mobile-logo-white.png">
            </a>
          </div>
          <div class="delivery-to-container">
            <div class="delivery-pointer-logo-container  ">
              <?xml version="1.0" encoding="iso-8859-1"?>
                <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg fill="#FFF" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 54.757 54.757" xml:space="preserve">
                <g>
                  <path d="M27.557,12c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S31.416,12,27.557,12z M27.557,24c-2.757,0-5-2.243-5-5
                    s2.243-5,5-5s5,2.243,5,5S30.314,24,27.557,24z"/>
                  <path d="M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952
                    L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M41.099,31.431L27.38,51.243L13.639,31.4
                    C8.44,24.468,9.185,13.08,15.235,7.031C18.479,3.787,22.792,2,27.38,2s8.901,1.787,12.146,5.031
                    C45.576,13.08,46.321,24.468,41.099,31.431z"/>
                </g>
              </svg>
            </div>
            <div class="nav-lines-container">
              <span class="nav-line-1">Delivery to </span>
              <span class="nav-line-2">Poland</span>
            </div>  

          </div>



          
        </div>

        <div class="amazon-header-middle-section">
          
            <select class="type-of-products-select">
              <option selected="selected" value="All">All</option>
              <option value="Arts & Crafts">Arts & Crafts</option>
              <option value="Automotive">Automotive</option>
              <option value="Baby">Baby</option>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Books">Books</option>
              <option value="Boys' Fashion">Boys' Fashion</option>
            </select>
          
          
          <input class="search-bar js-search-bar" type="text" placeholder="Search">
          <button class="search-button js-search-button">

            <img class="search-icon" src="images/icons/search-icon.png">
          </button>
        </div>
      
        <div class="amazon-header-right-section">

          <div class="choose-language-container header-link">
              <div class="dark-screen"></div>
            <img class="flag" src="images/icons/united-kingdom.png">
            <span class="language-text">EN</span>
            <span class="arrow">▼</span>
            <div class="dropdown">
              <div>
                <span>Change language</span>
                <a>learn more</a>
              </div>

              <label><input type="radio" name="lang">English-EN</label>
              <div class="devider"></div>
              <label><input type="radio" name="lang">Español - ES</label>
              <label><input type="radio" name="lang">العربية - AR</label>
              <label><input type="radio" name="lang">עברית - HE</label>
              <label><input type="radio" name="lang">한국어 - KO</label>
              <label><input type="radio" name="lang">português - PT</label>
              <label><input type="radio" name="lang">中文 (简体) - ZH</label>
              <div class="devider"></div>
              
                <div class="currency-cont">
                  <span>change currency</span>
                  <a>learn more</a> 
                </div>
                <div style="display:flex; align-items:end; gap:60px;" class="change-currency-con">
                  <span>$ - USD - US Dollar</span>
                  <span class="change-currency-button">change</span> 
                </div>
                <div class="devider"></div>
                <div style="display:flex">
                  <img style="width:15px; height:15px;" src="images/icons/united-kingdom.png">
                  <span>You are shopping on Amazon.com</span>
                </div>
                <div style="display:flex; padding-left:17%; width:auto; height:25px; align-items:center;">
                  <a>change country/region.</a>
                </div>
            </div>
          
          </div>
          
          

          <div class="orders-link header-link your-account js-your-account">
            <span class="your-account-line-1"> hello ${ isLogedIn ? `${userData.username}` : 'sing in'}</span>
            <span class="your-account-line-2">Account & Lists</span>
            <span class="arrow">▼</span>

                <div class="your-account-dropdown">
              <div class="sing-in-con">
                  <button class="singin-button ${isLogedIn ? 'js-logout-button': 'js-singin-button' }">${isLogedIn  ? 'log out': 'log in'}</button>
                  <span>New customer? <a>Starts here.</a></span>
                  <div class="devider-horizontal"></div>
              </div>
              <div class="your-account-options">
                  <div class="your-account-options-1">
                      <div class="your-lists-cont">
                          <h3>Your Lists</h3>
                      </div>
                      <ul>
                          <li><span>Create a List</span></li>
                          <li><span>Find a List or Registry</span></li>
                      </ul>

                  </div>
                  
                  <div class="devider-vertical"></div>

                  <div class="your-account-options-2">
                      <h3>Your account</h3>
                          
                      <ul>
                          <li><a>Account</a></li>
                          <li><a>Orders</a></li>
                          <li><a>Recommendations</a></li>
                          <li><a>Browsing History</a></li>
                          <li><a>Watchlist</a></li>
                          <li><a>Video Purchases & Rentals</a></li>
                          <li><a>Kindle Unlimited</a></li>
                          <li><a>Content & Devices</a></li>
                          <li><a>Subscribe & Save items</a></li>
                          <li><a>Membership & Subscriptions</a></li>
                          <li><a>Music Library</a></li>
                      </ul>
                  </div>

            </div>
            

      </div>
              
          </div>

          <a class="orders-link header-link" href="orders.html">
            <span class="returns-text">Returns</span>
            <span class="orders-text">& Orders</span>
          </a>

          <a class="cart-link header-link" href="checkout.html">
            <img class="cart-icon" src="images/icons/cart-icon.png">
            <div class="cart-quantity js-cart-quantity">0</div>
            <div class="cart-text">Cart</div>
          </a>
        </div>
      `;



  function displayHeader(){
      document.querySelector('.amazon-header').innerHTML=headerHTML;
  }
  displayHeader();

  function EventListenersHeader(){
    // Declarations //
    const languageContainer= document.querySelector('.choose-language-container');
    const darkScreen = document.querySelector('.dark-screen');
    const dropDownLanguage = document.querySelector('.dropdown');

    const yourAccountContainer = document.querySelector('.your-account');
    const dropDownYourAccount = document.querySelector('.your-account-dropdown');

    const singinButton = document.querySelector('.js-singin-button');
    const logoutButton = document.querySelector('.js-logout-button');
    /* SHOW HIDE*/
    function showLanguageMenu(){
        darkScreen.classList.add('visible');
        dropDownLanguage.classList.add('visible');
    }

    function hideLanguageMenu(){
        darkScreen.classList.remove('visible');
        dropDownLanguage.classList.remove('visible');
    }

    function showYourAccountMenu(){
      darkScreen.classList.add('visible');
      dropDownYourAccount.classList.add('visible');
    }
    function hideYourAccountMenu(){
        darkScreen.classList.remove('visible');
        dropDownYourAccount.classList.remove('visible');
    }
    /*CLICK BUTTON*/

    if(logoutButton){
      logoutButton.addEventListener('click',()=>{
        localStorage.removeItem('jwt');
        window.location.href = 'amazon.html';
      })
    }else{
      singinButton.addEventListener('click',()=>{
      window.location.href = 'loginRegister.html'
    })
    }

    

    languageContainer.addEventListener('mouseenter',()=>{
        
        showLanguageMenu()
    });
    languageContainer.addEventListener('mouseleave',()=>{
        
        hideLanguageMenu();
    });
    dropDownLanguage.addEventListener('mouseenter',()=>{
        
        showLanguageMenu();
    });
    dropDownLanguage.addEventListener('mouseleave',()=>{
        
        hideLanguageMenu();
    });

    yourAccountContainer.addEventListener('mouseenter',()=>{
    showYourAccountMenu();
    });

    yourAccountContainer.addEventListener('mouseleave',()=>{
      hideYourAccountMenu();
    });



  }
  EventListenersHeader();







}