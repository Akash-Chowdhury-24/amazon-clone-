import{addToCart,cart,loadFromCart} from '../data/cart.js';

describe('addToCart function test',function(){
  it('on adding new product to the cart', function () {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(function () {
        return JSON.stringify([]);
    });
    loadFromCart(); // first the cart is loaded into the page then we mock the local storage so it will not work properly therefore after mocking the localstorage we again load the cart so that the mocked local storage can be used  

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

  it('on adding a existing product to the cart',function(){
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(function () {
          return JSON.stringify([{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity : 1,
            deliveryOptionId : '1'
          }]);
      });
      loadFromCart();
      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toEqual(1);
      expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(2);
  });
});
