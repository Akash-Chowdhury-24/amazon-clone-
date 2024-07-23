import {loadProductsFetch,getProduct} from '../data/products.js';
import {orders} from '../data/orders.js' 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {ProperRepresentCurrency} from '../scripts/extra/currency.js'
import {cart} from '../data/cart-class.js'
async function loadpage(){

  await loadProductsFetch();


  let ordersHTML='';

  orders.forEach(function(order) {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML +=`<div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${ProperRepresentCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
           ${productListHTML(order)}
          </div>
        </div>` ;
  });

  function productListHTML(order){
    let productListHTML='';

    order.products.forEach(function(productDetails){
      const product = getProduct(productDetails.productId);

      const arivalTimeString = dayjs(productDetails.estimatedDeliveryTime).format('MMMM D');

      productListHTML += ` <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arivalTimeString}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
    });

    return productListHTML;
  }

  document.querySelector('.js-order-grid').innerHTML=ordersHTML;

  document.querySelector('.js-cart-quantity').innerHTML=cart.cartQuantityCalculate();
  
  document.querySelectorAll('.js-buy-again').forEach(function(button){
    button.addEventListener('click', function(){
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      button.innerHTML='Added'
      loadpage();
      setTimeout(function(){
        button.innerHTML=`<img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>`;
      },2000);
    });
  });
}

loadpage();
