import { showOrderSummary } from "../scripts/checkout/orderSummary.js";
import { showPaymentSummary } from "../scripts/checkout/paymentSummary.js";




function CartGeneretor(localStorageValue){
 const cartObject ={
    cart:undefined,
    loadFromCart(){
      this.cart=JSON.parse(localStorage.getItem(localStorageValue));
    
      if(!this.cart){
        this.cart = [{
           id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
           quantity : 1,
           deliveryOptionId : '1'
         },{
           id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
           quantity : 1,
           deliveryOptionId : '2'
         }];
      }
    },
  
    storeInCart(){
      localStorage.setItem(localStorageValue,JSON.stringify(this.cart));
    },
    
    addToCart(productId){
      let match;
        this.cart.forEach(function(cartItem){
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
          this.cart.push({
            id: productId,
            quantity: quantityinput,
            deliveryOptionId: '1'
          })
        }
        this.storeInCart();
    },
  
    removeFromCart(productId){
      let match;
      this.cart.forEach(function(cartItem){
        if(cartItem.id === productId){
          match=cartItem;
        }
      })
    
      if(match){
        this.cart.splice(cart.indexOf(match),1)
      }
      storeInCart();
    },
  
    cartQuantityCalculate(){
      let cartquantity=0;
        this.cart.forEach(function(cartItem){
          cartquantity+=cartItem.quantity;
        })
        return cartquantity;
    },
  
    updateQuantity(productId, newQuantity) {
      let matchingItem;
    
      this.cart.forEach((cartItem) => {
        if (productId === cartItem.id) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.quantity = newQuantity;
      showOrderSummary();
      showPaymentSummary();
      this.storeInCart();
    },
  
    updateDeliveryOption(productId,deliveryOptionId){
      let match;
      this.cart.forEach(function(cartItem){
        if(cartItem.id === productId){
          match=cartItem;
        }
      })
      if(match){
        match.deliveryOptionId = deliveryOptionId;
        this.storeInCart();
      }
    }
  };
  cartObject.loadFromCart();
  return cartObject;
}

const cart1=CartGeneretor('cart-oop');
const cart2=CartGeneretor('cart-business');

console.log(cart2);
console.log(cart1);







