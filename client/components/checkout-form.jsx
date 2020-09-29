import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleContinueShoppingClick = this.handleContinueShoppingClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleContinueShoppingClick() {
    this.props.setView('catalog', {});
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

  render() {
    return (
      <div className="row">
        <h1 className="mb-4 col-12">My Cart</h1>
        <h5 className="mb-4 text-muted col-12">Order Total: $25.00</h5>
        <form className="col-12">
          <label>Name</label>
          <input type="text" value={this.state.name} onChange={this.handleNameChange} className="d-block col-12 mb-2" />
          <label>Credit Card</label>
          <input type="text" value={this.state.creditCard} onChange={this.handleCreditChange} className="d-block col-12 mb-2" />
          <label>Shipping Address</label>
          <textarea value={this.state.shippingAddress} onChange={this.handleAddressChange} className="d-block col-12 h-25"></textarea>
          <div className="d-flex justify-content-between align-items center col-12 p-0 mt-5">
            <div className="text-muted back mb-2" onClick={this.handleContinueShoppingClick}>&lt; Continue Shopping</div>
            <button className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
