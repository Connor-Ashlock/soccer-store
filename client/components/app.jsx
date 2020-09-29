import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      view: { name: 'catalog', params: {} },
      cart: []
    };
  }

  addToCart(product) {
    fetch('./api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(item => {
        const newCart = this.state.cart.slice();
        newCart.push(item);
        this.setState({ cart: newCart });
      })
      .catch(err => console.error(err));
  }

  getCartItems() {
    fetch('./api/cart')
      .then(res => res.json())
      .then(items => this.setState({ cart: items }))
      .catch(err => console.error(err));
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    let view = null;
    if (this.state.view.name === 'catalog') {
      view = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      view = <ProductDetails addToCart={this.addToCart} setView={this.setView} params={this.state.view.params} />;
    } else if (this.state.view.name === 'cart') {
      view = <CartSummary setView={this.setView} cart={this.state.cart} />;
    }
    return (
      <>
        <Header setView={this.setView} cartItemCount={this.state.cart.length} />
        { view }
      </>
    );
  }
}

export default App;
