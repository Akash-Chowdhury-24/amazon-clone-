import { showOrderSummary } from "../scripts/checkout/orderSummary.js";
import { showPaymentSummary } from "../scripts/checkout/paymentSummary.js";

export let cart;

loadFromCart();

export function loadFromCart(){
  cart=JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart = [{
       id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
       quantity : 1,
       deliveryOptionId : '1'
     },{
       id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
       quantity : 1,
       deliveryOptionId : '2'
     }];
  }
}


function storeInCart(){
  localStorage.setItem("cart",JSON.stringify(cart));
}

export function addToCart(productId){
  let match;
    cart.forEach(function(cartItem){
      if(cartItem.id === productId){
        match=cartItem;
      }
    })
    let quantityInputElement = document.querySelector(`.js-quantity-number-${productId}`);
    let quantityinput = quantityInputElement ? Number(quantityInputElement.value) : 1;//if null then give default value 1 else give the value of quantityInputElement

    if(match){
      match.quantity += quantityinput;
    }
    else{
      cart.push({
        id: productId,
        quantity: quantityinput,
        deliveryOptionId: '1'
      })
    }
    storeInCart();
}

export function removeFromCart(productId){
  let match;
  cart.forEach(function(cartItem){
    if(cartItem.id === productId){
      match=cartItem;
    }
  })

  if(match){
    cart.splice(cart.indexOf(match),1)
  }
  storeInCart();
}

export function cartQuantityCalculate(){
  let cartquantity=0;
    cart.forEach(function(cartItem){
      cartquantity+=cartItem.quantity;
    })
    return cartquantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  showOrderSummary();
  showPaymentSummary();
  storeInCart();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let match;
    cart.forEach(function(cartItem){
      if(cartItem.id === productId){
        match=cartItem;
      }
    })
    if(match){
      match.deliveryOptionId = deliveryOptionId;
      storeInCart();
    }

}
