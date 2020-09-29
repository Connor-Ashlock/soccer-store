import React from 'react';
import CartSummaryItem from './cart-summary-item';
import calculateTotal from './calculate-total';

function CartSummary(props) {
  function handleBackClick() {
    props.setView('catalog', {});
  }

  function handleCheckoutClick() {
    props.setView('checkout', {});
  }

  return (
    <>
      <div className="text-muted back mb-2" onClick={handleBackClick}>&lt; Back to catalog</div>
      <h1 className="mb-3">My Cart</h1>
      { props.cart.length
        ? props.cart.map((item, index) => <CartSummaryItem key={index} item={item} />)
        : <h3>Your cart is empty!</h3>
      }
      { props.cart.length !== 0 && <ItemTotalAndCheckoutBtn cart={props.cart} handleClick={handleCheckoutClick} />}
    </>
  );
}

function ItemTotalAndCheckoutBtn(props) {
  return (
    <div className="d-flex justify-content-between align-items-center my-5">
      <h5>Item Total { calculateTotal(props.cart) }</h5>
      <button className="btn btn-primary" onClick={props.handleClick}>Checkout</button>
    </div>
  );
}

export default CartSummary;
