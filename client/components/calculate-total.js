import formatPrice from './format-price';

function calculateTotal(array) {
  let total = 0;
  array.forEach(item => {
    total += item.price;
  });
  return formatPrice(total);
}

export default calculateTotal;
