import React from 'react';
import formatPrice from './format-price';

function CartSummaryItem(props) {
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-sm-4">
          <img src={props.item.image} alt={props.item.name} className="card-img" />
        </div>
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title">{props.item.name}</h5>
            <p className="card-text text-muted">{formatPrice(props.item.price)}</p>
            <p className="card-text">(props.item.shortDescription)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
