export function ProperRepresentCurrency(money){
  return (Math.round(money)/100).toFixed(2);
}