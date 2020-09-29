import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  function handleClick() {
    props.setView('catalog', {});
  }
  return (
    <>
      <div className="text-muted back mb-2" onClick={handleClick}>&lt; Back to catalog</div>
      <h1 className="mb-3">My Cart</h1>
      { props.cart.length
        ? props.cart.map(item => <CartSummaryItem key={item.productId} item={item} />)
        : <h3>Your cart is empty!</h3>
      }
    </>
  );
}

export default CartSummary;
