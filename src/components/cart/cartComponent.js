import React from 'react';
import CartContext from './cartProvider';
import { Link } from 'gatsby';

import Checkout from '../Stripe/Checkout';

export function displayItems(items) {
  var productsInCart = [];

  Object.keys(items).forEach(function (key) {
    var product = {};
    product.id = key;
    product.price = items[key].price;
    product.quantity = items[key].quantity;
    productsInCart.push(product);
    product.image = items[key].img;
    product.name = items[key].name;
    product.desc = items[key].desc;
    product.prodId = items[key].productId;
  });

  return productsInCart;
}

// TODO: test loading time
const Cart = () => {
  return (
    <div className="cart">
      <CartContext.Consumer>
        {(context) => {
          return (
            <>
              <div>
                {displayItems(context.cartItems).map((product) => {
                  return (
                    <div key={product.key} className="cart-items">
                      <Link to={'/' + product.prodId}>
                        <img
                          src={product.image}
                          alt="Product Image"
                          className="cart-items-img"
                        />
                      </Link>
                      <div className="cart-items-name">
                        {product.name}
                        <div className="cart-items-name-desc">
                          {product.desc}
                        </div>
                      </div>

                      <div className="cart-items-qty">
                        QTY
                        <div>
                          {'   '}
                          <span
                            onClick={(e) =>
                              context.removeFromCart(
                                product.id,
                                product.price,
                                1,
                              )
                            }
                            className="cart-items-qty-plus-minus fa fa-minus"
                          ></span>
                          {product.quantity}
                          <span
                            onClick={(e) =>
                              context.addToCart(
                                1,
                                product.id,
                                product.price,
                                product.desc,
                                product.image,
                                product.prodId,
                                product.name,
                              )
                            }
                            className="cart-items-qty-plus-minus  fa fa-plus"
                          ></span>
                        </div>
                      </div>
                      <div className="cart-items-price">
                        PRICE
                        <div className="cart-items-price-value">
                          £ {product.price / 100}
                        </div>
                      </div>

                      <div
                        onClick={(e) =>
                          context.removeFromCart(
                            product.id,
                            product.price,
                            1,
                          )
                        }
                        className="cart-items-remove"
                      >
                        Remove
                      </div>
                    </div>
                  );
                })}
                <div
                  onClick={context.emptyCart}
                  className="cart-empty-cart"
                >
                  Empty Cart
                </div>
              </div>
              <div className="cart-total">
                <div className="cart-total-title"> TOTAL</div>
                <div className="cart-total-value">
                  £ {context.cartTotal / 100}
                </div>
                <div className="cart-total-postage-title">
                  POSTAGE
                </div>
                <div className="cart-total-postage-value">FREE</div>
                <div className="cart-total-promocode-title">
                  PROMOCODE
                </div>
                <input
                  type="text"
                  name="promo"
                  placeholder="PromoCode.."
                  // onChange={}
                ></input>
                <Checkout className="cart-total-checkout" />
              </div>
            </>
          );
        }}
      </CartContext.Consumer>
    </div>
  );
};

export default Cart;
