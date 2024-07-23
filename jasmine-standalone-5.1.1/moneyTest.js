import {ProperRepresentCurrency} from '../scripts/extra/currency.js';

describe('currency formating function test',function(){
  it('for 2095',function(){
    expect(ProperRepresentCurrency(2095)).toEqual('20.95');
  });

  it('for 0',function(){
    expect(ProperRepresentCurrency(0)).toEqual('0.00');
  });

  it('for 2000.5',function(){
    expect(ProperRepresentCurrency(2000.5)).toEqual('20.01');
  });
});