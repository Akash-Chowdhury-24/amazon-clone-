//import {cart,cartQuantityCalculate} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {getProduct} from '../../data/products.js';
import {ProperRepresentCurrency} from '../extra/currency.js';
import {addOrder,orders} from '../../data/orders.js';
export function showPaymentSummary(){
  let itemPrice=0;
  let shippingPrice=0;
  
  cart.cartItems.forEach(function(cartItem){
    let match=getProduct(cartItem.productId);
    let matchDelivery=getDeliveryOption(cartItem.deliveryOptionId);
    itemPrice += match.priceCents*cartItem.quantity;
    shippingPrice += matchDelivery.priceCents;
  })
 
  const totalBeforeTax=itemPrice+shippingPrice;
  const tax=totalBeforeTax*0.1;
  const total=totalBeforeTax+tax;

  const paymentSummaryHTML = 
  `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-item-value">Items (${(cart.cartQuantityCalculate()===0)?'':cart.cartQuantityCalculate()}):</div>
            <div class="payment-summary-money">$${ProperRepresentCurrency(itemPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${ProperRepresentCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${ProperRepresentCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${ProperRepresentCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${ProperRepresentCurrency(total)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
          `

  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;


  document.querySelector('.js-place-order').addEventListener('click',async function(){
    try{
      const response = await fetch('https://supersimplebackend.dev/orders',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart : cart.cartItems
        })
      });
      const order = await response.json();
      addOrder(order);
    }catch(error){
      console.log('unexpected error');
      console.log(error);
    }
    
    cart.resetCart();
    window.location.href= 'orders.html';
  });
}