import React from 'react';

function Header(props) {
  function handleClick() {
    props.setView('cart', {});
  }
  return (
    <header className="row align-items-center justify-content-between mb-4">
      <h2 className="ml-4 mb-0"><i className="mr-2 fas fa-dollar-sign"></i>Wicked Sales</h2>
      <p className="mr-4 mb-0">{props.cartItemCount} Items <i className="fas fa-shopping-cart" onClick={handleClick}></i></p>
    </header>
  );
}

export default Header;
