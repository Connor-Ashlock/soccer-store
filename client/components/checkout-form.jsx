import React from 'react';
import calculateTotal from './calculate-total';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleContinueShoppingClick = this.handleContinueShoppingClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      isValidated: true
    };
  }

  handleContinueShoppingClick() {
    this.props.setView('catalog', {});
    this.setState({ isValidated: true });
  }

  handleNameChange() {
    this.setState({ name: event.target.value });
  }

  handleCreditChange() {
    this.setState({ creditCard: event.target.value });
  }

  handleAddressChange() {
    this.setState({ shippingAddress: event.target.value });
  }

  handleSubmit() {
    event.preventDefault();
    this.checkValidation();
  }

  checkValidation() {
    if (!this.state.name || !Number(this.state.creditCard) || !this.state.shippingAddress) {
      this.setState({ isValidated: false });
    } else {
      const order = {
        name: this.state.name,
        creditCard: this.state.creditCard,
        shippingAddress: this.state.shippingAddress
      };
      this.props.placeOrder(order);
      this.setState({ name: '', creditCard: '', shippingAddress: '', isValidated: true });
    }
  }

  render() {
    const validationMessage = (
      <ValidationMessage
        name={this.state.name}
        creditCard={this.state.creditCard}
        shippingAddress={this.state.shippingAddress}
      />
    );
    return (
      <div className="row mb-4">
        <div className="mb-4 col-12 d-flex justify-content-between align-items-center">
          <h1 className="col-sm-8 p-0">My Cart</h1>
          <span className="text-danger reminder col-sm-4 p-0 d-flex justify-content-end">Reminder: Please do not use any personal information!</span>
        </div>
        <h5 className="mb-4 text-muted col-12">Order Total: { calculateTotal(this.props.cart) }</h5>
        <form className="col-12" onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" value={this.state.name} onChange={this.handleNameChange} className="d-block col-12 mb-2" />
          <label>Credit Card</label>
          <input type="text" value={this.state.creditCard} onChange={this.handleCreditChange} className="d-block col-12 mb-2" />
          <label>Shipping Address</label>
          <textarea value={this.state.shippingAddress} onChange={this.handleAddressChange} className="d-block col-12 h-90"></textarea>
          <div className="d-flex justify-content-between align-items center col-12 p-0 mt-5">
            <div className="text-muted back mb-2" onClick={this.handleContinueShoppingClick}>&lt; Continue Shopping</div>
            <button className="btn btn-primary">Place Order</button>
          </div>
          {!this.state.isValidated && validationMessage}
        </form>
      </div>
    );
  }
}

function ValidationMessage(props) {
  if (!props.name && !props.creditCard && !props.shippingAddress) {
    return <p className="text-danger d-flex justify-content-end mt-3">The Name, Credit Card, and Shipping Address must be entered!</p>;
  } else if (!Number(props.creditCard)) {
    return <p className="text-danger d-flex justify-content-end mt-3">The Credit Card must be a valid number with no spaces!</p >;
  } else if (!props.name) {
    return <p className="text-danger d-flex justify-content-end mt-3">The Name must be entered!</p>;
  } else if (!props.shippingAddress) {
    return <p className="text-danger d-flex justify-content-end mt-3">The Shipping Address must be entered!</p>;
  } else {
    return null;
  }
}

export default CheckoutForm;
