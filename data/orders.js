export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId){

  let match='';

  orders.forEach(function(order){
    if(order.id === orderId){
      match = order;
    }
  });

  return match;
}