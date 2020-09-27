import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setView('catalog', { params: {} });
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(res => res.json())
      .then(product => this.setState({ product: product }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.product) return null;
    const name = this.state.product.name;
    const image = this.state.product.image;
    const price = this.state.product.price;
    const longDescription = this.state.product.longDescription;
    const shortDescription = this.state.product.shortDescription;
    return (
      <div className="row justify-content-center">
        <div className="col-11 d-flex flex-wrap border p-4">
          <div className="text-muted col-12 back mb-2" onClick={this.handleClick}>&lt; Back to catalog</div>
          <img src={image} alt={name} className="col-4 mb-3" />
          <div className="col-8">
            <h3>{name}</h3>
            <h5 className="text-muted">{price}</h5>
            <p>{shortDescription}</p>
          </div>
          <div className="col-11">
            <p>{longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
