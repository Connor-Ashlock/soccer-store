import React from 'react';

function Header(props) {
  function handleCartClick() {
    props.setView('cart', {});
  }

  function handleLogoClick() {
    props.setView('catalog', {});
  }
  return (
    <header className="row align-items-center justify-content-between mb-4">
      <h2 className={props.view === 'disclaimer' ? 'ml-4 mb-0' : 'ml-4 mb-0 hover'} onClick={props.view === 'disclaimer' ? null : handleLogoClick}><i className="mr-2 fas fa-futbol"></i>Soccer Store</h2>
      {props.view === 'disclaimer' ? null : <p className="mr-4 mb-0 hover" onClick={handleCartClick}>{props.cartItemCount} Items <i className="fas fa-shopping-cart"></i></p>}
    </header>
  );
}

export default Header;
