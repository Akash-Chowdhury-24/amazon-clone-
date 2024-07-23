//import {cart,addToCart,cartQuantityCalculate} from '../data/cart.js';
import {cart} from '../data/cart-class.js';
//import {products} from '../data/products.js';
import {products,loadProductsFetch} from '../data/products.js';

//by using fetch() and promise
loadProductsFetch().then(function(){
  showProductsGrid()
});


//by suing callback
//loadProducts(showProductsGrid);

function showProductsGrid(){

  let productHTML = '';


  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      let match =false;

      product.keywords.forEach(function(keyword){
        if(keyword.toLowerCase().includes(search.toLowerCase())){
          match = true;
        }
      });

      return match || product.name.includes(search);
    });
  }

  filteredProducts.forEach((product) => {
    productHTML += `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getRatingURL()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-number-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.getSizeChartHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`;
  })

  document.querySelector('.js-product-grid').innerHTML = productHTML;

  function updateCartQuantity(){
    const cartquantity=cart.cartQuantityCalculate();
    document.querySelector('.js-cart-quantity').innerHTML=cartquantity;
  }

  updateCartQuantity();
  document.querySelectorAll('.js-add-to-cart')
  .forEach(function(button){
    button.addEventListener('click', function(item){
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      updateCartQuantity();
      document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-visible')

      setTimeout(function(){
        document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-visible')
      },2000);
    });
  });

  document.querySelector('.js-search-button').addEventListener('click',function(){
    const search=document.querySelector('.js-search-bar').value;
    window.location.href=`amazon.html?search=${search}`;
  });

  document.querySelector('.js-search-bar').addEventListener('keydown',function(event){
    if(event.key === 'Enter'){
      const searchTerm=document.querySelector('.js-search-bar').value;
      window.location.href=`amazon.html?search=${searchTerm}`;
    }
  });
}
