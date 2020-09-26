import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.getProducts = this.getProducts.bind(this);
    this.createList = this.createList.bind(this);
  }

  createList() {
    const list = this.state.products.map(product => <ProductListItem key={product.productId} product={product} />);
    return (
      <>
        { list }
      </>
    );
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(productList => this.setState({ products: productList }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const list = this.createList();
    return (
      <div className="card-deck">
        { list }
      </div>
    );
  }
}

export default ProductList;
