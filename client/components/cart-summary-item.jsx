import React from 'react';
import formatPrice from './format-price';

function CartSummaryItem(props) {
  function handleDelete() {
    props.removeFromCart(props.item.cartItemId);
  }

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-sm-4">
          <img src={props.item.image} alt={props.item.name} className="card-img cart-height" />
        </div>
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between align-items-center">{props.item.name}<button onClick={handleDelete} className="btn btn-danger">x</button></h5>
            <p className="card-text text-muted">{formatPrice(props.item.price)}</p>
            <p className="card-text">{props.item.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
