import React from 'react';

function ProductListItem(props) {
  return (
    <div className="card mb-4">
      <img src={props.product.image} alt={props.product.name} className="card-img-top"></img>
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <p className="card-text"><small className="text-muted">{formatPrice(props.product.price)}</small></p>
        <p className="card-text">{props.product.shortDescription}</p>
      </div>
    </div>
  );
}

function formatPrice(price) {
  let formattedPrice = price + '';
  formattedPrice = formattedPrice.split('');
  formattedPrice.splice(parseInt(formattedPrice.length, 10) - 2, 0, '.');
  return `$${formattedPrice.join('')}`;
}

export default ProductListItem;
