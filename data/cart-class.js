import { showOrderSummary } from "../scripts/checkout/orderSummary.js";
import { showPaymentSummary } from "../scripts/checkout/paymentSummary.js";


class Cart{
  cartItems;
  localStorageValue;

  constructor(localStorageValue){
    this.localStorageValue=localStorageValue;
    this.loadFromCart();
  }
  loadFromCart(){
    this.cartItems=JSON.parse(localStorage.getItem(this.localStorageValue)) || [];
  
    /*if(!this.cartItems){
      this.cartItems = [{
         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
         quantity : 1,
         deliveryOptionId : '1'
       },{
         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
         quantity : 1,
         deliveryOptionId : '2'
       }];
    }*/
  }

  storeInCart(){
    localStorage.setItem(this.localStorageValue,JSON.stringify(this.cartItems));
  }

  addToCart(productId){
    let match;
      this.cartItems.forEach(function(cartItem){
        if(cartItem.productId === productId){
          match=cartItem;
        }
      })
      let quantityInputElement = document.querySelector(`.js-quantity-number-${productId}`);
      let quantityinput = quantityInputElement ? Number(quantityInputElement.value) : 1;//if null then give default value 1 else give the value of quantityInputElement
  
      if(match){
        match.quantity += quantityinput;
      }
      else{
        this.cartItems.push({
          productId: productId,
          quantity: quantityinput,
          deliveryOptionId: '1'
        })
      }
      this.storeInCart();
  }

  removeFromCart(productId){
    let match='';
    this.cartItems.forEach(function(cartItem){
      if(cartItem.productId === productId){
        match=cartItem;
      }
    })
  
    if(match){
      this.cartItems.splice(this.cartItems.indexOf(match),1)
    }
    this.storeInCart();
  }

  cartQuantityCalculate(){
    let cartquantity=0;
      this.cartItems.forEach(function(cartItem){
        cartquantity+=cartItem.quantity;
      })
      return cartquantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
    showOrderSummary();
    showPaymentSummary();
    this.storeInCart();
  }

  updateDeliveryOption(productId,deliveryOptionId){
    let match;
    this.cartItems.forEach(function(cartItem){
      if(cartItem.productId === productId){
        match=cartItem;
      }
    })
    if(match){
      match.deliveryOptionId = deliveryOptionId;
      this.storeInCart();
    }
  }

  resetCart(){
    this.cartItems =[];
    this.storeInCart();
  }
}

export const cart=new Cart('cart-class');

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}








