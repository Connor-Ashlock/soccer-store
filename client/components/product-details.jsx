import React from 'react';
import formatPrice from './format-price';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.state = { product: null, modalIsOpen: false };
  }

  handleClick() {
    this.props.setView('catalog', {});
  }

  handleAddToCart() {
    this.props.addToCart(this.state.product);
    this.setState({ modalIsOpen: true });
    setTimeout(() => { this.setState({ modalIsOpen: false }); }, 2000);
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
      <>
        <Modal isOpen={this.state.modalIsOpen}
          className="added"
          style={{ overlay: { backgroundColor: 'rgba(255, 255, 255, 0)' } }}
          closeTimeoutMS={1000}
        >
          <p className="rounded p-3 cart-modal">Item added to cart</p>
        </Modal>
        <div className="row justify-content-center mb-3">
          <div className="col-11 d-flex flex-wrap border p-4">
            <div className="text-muted col-12 back mb-2" onClick={this.handleClick}>&lt; Back to catalog</div>
            <img src={image} alt={name} className="col-sm-4 mb-3" />
            <div className="col-sm-8">
              <h3>{name}</h3>
              <h5 className="text-muted">{formatPrice(price)}</h5>
              <p>{shortDescription}</p>
              <button className="btn btn-primary mb-4" onClick={this.handleAddToCart}>Add to Cart</button>
            </div>
            <div className="col-11">
              <div>{formatDescription(longDescription)}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function formatDescription(longDescription) {
  longDescription = longDescription.split('\\n');
  const newLongDescription = longDescription.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  return (
    <>
      {newLongDescription}
    </>
  );
}

export default ProductDetails;
