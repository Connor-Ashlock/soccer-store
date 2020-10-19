import React from 'react';
import CartSummaryItem from './cart-summary-item';
import calculateTotal from './calculate-total';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
  }

  handleBackClick() {
    this.props.setView('catalog', {});
  }

  handleCheckoutClick() {
    this.props.setView('checkout', {});
  }

  render() {
    return (
      <>
        <div className="text-muted back mb-2" onClick={this.handleBackClick}>&lt; Back to catalog</div>
        <h1 className="mb-4">My Cart</h1>
        { this.props.cart.length
          ? this.props.cart.map((item, index) => <CartSummaryItem key={index} item={item} removeFromCart={this.props.removeFromCart} />)
          : <h3>Your cart is empty!</h3>
        }
        { this.props.cart.length !== 0 && <Footer cart={this.props.cart} handleClick={this.handleCheckoutClick} />}
      </>
    );
  }
}

function Footer(props) {
  return (
    <>
      <h5 className="mt-4 col-12">Cart Quantity: {props.cart.length}</h5>
      <div className="col-12 d-flex justify-content-between align-items-center my-3">
        <h5>Item Total: { calculateTotal(props.cart) }</h5>
        <button className="btn btn-primary" onClick={props.handleClick}>Checkout</button>
      </div>
    </>
  );
}

export default CartSummary;
