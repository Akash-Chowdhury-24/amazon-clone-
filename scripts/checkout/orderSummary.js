//import { cart, removeFromCart, cartQuantityCalculate, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { cart} from '../../data/cart-class.js';
import { products, getProduct } from '../../data/products.js';
import { ProperRepresentCurrency } from '../extra/currency.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { showPaymentSummary } from './paymentSummary.js';

export function showOrderSummary(){

  let cartItemHTML = '';
  cart.cartItems.forEach(function(cartItem){

    let match=getProduct(cartItem.productId);
  
    let matchDelivery=getDeliveryOption(cartItem.deliveryOptionId);

    const deliveryDate = dayjs().add(`${matchDelivery.deliveryDays}`,'days').format('dddd, MMMM D');


    cartItemHTML += `<div class="cart-item-container js-cart-item-container-${match.id}">
              <div class="delivery-date js-delivery-date-${match.id}">
                Delivery date: ${deliveryDate}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${match.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${match.name}
                  </div>
                  <div class="product-price">
                    ${match.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${match.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${match.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${match.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${match.id}">
                      Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${match.id}" >
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(match,cartItem)}
                </div>
              </div>
            </div>`

  })

  document.querySelector('.js-order-summary').innerHTML= cartItemHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach(function(deleteLink){
    deleteLink.addEventListener('click', function(){
      const id = deleteLink.dataset.productId;
      cart.removeFromCart(id);
      document.querySelector(`.js-cart-item-container-${id}`).remove();
      updateCartQuantity();
      showPaymentSummary();
    })
  })

  function updateCartQuantity()
  {
    const quantity=cart.cartQuantityCalculate();

    if(quantity === 1){
      document.querySelector('.js-return-to-home-link').innerHTML=`${quantity} Item`;
    }
    if(quantity > 1){
      document.querySelector('.js-return-to-home-link').innerHTML=`${quantity} Items`;
    }
    if(quantity === 0){
      document.querySelector('.js-return-to-home-link').innerHTML='';
    }
  }
  updateCartQuantity();

  document.querySelectorAll('.js-update-link')
  .forEach(function(updateLink){
    updateLink.addEventListener('click', function(){
      const id = updateLink.dataset.productId;
      
      document.querySelector(`.js-cart-item-container-${id}`).classList.add('is-editing-quantity');
    })
    
  })

  document.querySelectorAll('.js-save-link')
  .forEach(function(saveLink){
    saveLink.addEventListener('click', function(){
      const id = saveLink.dataset.productId;
      
      document.querySelector(`.js-cart-item-container-${id}`).classList.remove('is-editing-quantity');

      const newQuantity = Number(document.querySelector(`.js-quantity-input-${id}`).value);
      cart.updateQuantity(id,newQuantity);

      document.querySelector(`.js-quantity-label-${id}`).innerHTML=newQuantity;
      updateCartQuantity();
    })
  })
  
  function deliveryOptionHTML(match,cartItem){
    let html='';
    deliveryOptions.forEach(function(option){
      const today = dayjs();
      const deliveryDate = today.add(`${option.deliveryDays}`,'days').format('dddd, MMMM D')

      const price = option.priceCents === 0? 'FREE' : `$${ProperRepresentCurrency(option.priceCents)}-`;

      const check = option.id === cartItem.deliveryOptionId ? 'checked' : '';


      html +=`<div class="delivery-option js-delivery-option"
      data-product-id="${match.id}"
        data-delivery-option-id="${option.id}">
        <input type="radio"
        ${check}
        class="delivery-option-input"
        name="delivery-option-${match.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${price} Shipping
          </div>
        </div>
      </div>`
    })

    return html
  }


  document.querySelectorAll('.js-delivery-option')
  .forEach(function(option){
    option.addEventListener('click',function(){
      const {productId,deliveryOptionId} = option.dataset;
      cart.updateDeliveryOption(productId,deliveryOptionId);
      showOrderSummary();
      showPaymentSummary();
      /*
      // updating the delivery date without MVC 
      let matchDelivery;
      deliveryOptions.forEach(function(option){
        if(option.id === deliveryOptionId){
          matchDelivery=option;
        }
      })
      const deliveryDate = dayjs().add(`${matchDelivery.deliveryDays}`,'days').format('dddd, MMMM D');
    
      document.querySelector(`.js-delivery-date-${productId}`).innerHTML =`Delivery date: ${deliveryDate}`;*/
    })
  })

}


