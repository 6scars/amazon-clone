import {products} from '../../data/products.js'
export function searchBar(){
        
    const searchBtn = document.querySelector('.js-search-button');
    if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const searchInput = document.querySelector('.js-search-bar');
        window.location.href = `amazon.html?search=${searchInput.value}`;
    });
    } else {
    console.warn('Brak .js-search-button w DOM!');
    }

}   



export function searchedProducts(word){
    const finded =  products.filter(item=>{
        return item.name.toLowerCase().includes(word.toLowerCase());
    })
    const finded2= products.filter(item=>{
        return item.keywords.some(key=>{return key.toLowerCase().includes(word.toLowerCase());})
    })

    const combined = [...new Set([...finded, ...finded2])];
    return combined;
}
