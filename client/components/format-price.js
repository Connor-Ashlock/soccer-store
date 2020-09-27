function formatPrice(price) {
  let formattedPrice = price + '';
  formattedPrice = formattedPrice.split('');
  formattedPrice.splice(parseInt(formattedPrice.length, 10) - 2, 0, '.');
  return `$${formattedPrice.join('')}`;
}

export default formatPrice;
