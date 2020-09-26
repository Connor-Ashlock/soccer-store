import React from 'react';

function ProductListItem(props) {
  return (
    <div className="card">
      <img src={props.product.image} alt={props.product.name} className="card-img-top"></img>
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <p className="card-text"><small className="text-muted">{props.product.price}</small></p>
        <p className="card-text">{props.product.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
