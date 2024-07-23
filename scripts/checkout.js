import {showOrderSummary} from "./checkout/orderSummary.js";
import {showPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart-class.js";
//import '../data/cart-class.js';// just for practice not related to project 

// by using async and fetch

async function load(){
  try{
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
    
  }
  catch(error){
    console.log('unexpected error');
    console.log(error);
  }

  showOrderSummary();
  showPaymentSummary();
}
load();
// by using fetch() with promise 
/*loadProducts().then(function(){
  showOrderSummary();
  showPaymentSummary();
});*/

//using promise and next step
/*new Promise(function(resolve){
  loadProducts(function(){
    resolve();
  });
}).then(function(){
  showOrderSummary();
  showPaymentSummary();
})*/


// using callback 
/*loadProducts(function(){
  showOrderSummary();
  showPaymentSummary();
})*/

