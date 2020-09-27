import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.id}`)
      .then(res => res.json())
      .then(product => this.setState({ product: product }))
      .catch(err => console.error(err));
  }

  render() {
    const back = '< Back to catalog';
    const price = '$25.95';
    const text = 'Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90\'s. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock.\\nAesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.';
    return (
      <div className="row justify-content-center">
        <div className="col-11 d-flex flex-wrap border p-4">
          <div className="text-muted col-12 back">{back}</div>
          <img src="/images/shamwow.jpg" alt="shamwow" className="col-4 mb-3" />
          <div className="col-8">
            <h3>ShamWow</h3>
            <h5 className="text-muted">{price}</h5>
            <p>{'It\'s like a chamois, towel, and sponge, all in one! Soaks up to 10x it\'s weight in any liquid!'}</p>
          </div>
          <div className="col-11">
            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
