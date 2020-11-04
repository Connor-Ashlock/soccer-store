import formatPrice from './format-price';
import React from 'react';

function ProductListItem(props) {
  function handleClick() {
    props.setView('details', { productId: props.id });
  }
  return (
    <div className="card mb-4 grow">
      <img onClick={handleClick}
        src={props.product.image}
        alt={props.product.name}
        className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title hover" onClick={handleClick}>{props.product.name}</h5>
        <p className="card-text"><small className="text-muted">{formatPrice(props.product.price)}</small></p>
        <p className="card-text">{props.product.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
