import { useStaticQuery, graphql } from 'gatsby';
import React, { useContext } from 'react';

import { CartContext } from '../cart';
import CheckoutWrapper from './Checkout';

import { UserFavs } from '../AccountContent';

export function GetProducts() {
  const data = useStaticQuery(graphql`
    query SkusForProduct {
      allStripeSku {
        edges {
          node {
            id
            image
            currency
            price
            product {
              id
              metadata {
                Category
              }
              name
            }
          }
        }
      }
    }
  `);

  return data.allStripeSku.edges;
}

export function GetProduct(id) {
  var allProducts = GetProducts();
  console.log(id);
  console.log(allProducts);
  return allProducts.filter((product) => product.node.id === id);
}

export function GetProductCategory(category) {
  var allProducts = GetProducts();
  return allProducts.filter(
    (product) => product.node.metadata.Category === category,
  );
}

const Products = () => {
  const edges = GetProducts();

  const context = useContext(CartContext);

  return (
    <div>
      {edges.map((product) => {
        return (
          <div key={product.node.id}>
            <div>Name: {product.node.product.name}</div>
            <div>Price: {product.node.price}</div>
            <div>Id: {product.node.id}</div>
            <div>
              Category: {product.node.product.metadata.Category}
            </div>
            <img src={product.node.image} alt="Product Image" />
            <button
              onClick={(e) =>
                context.addToCart(
                  1,
                  product.node.id,
                  product.node.price,
                  'description',
                  product.node.image,
                  product.node.product.id,
                )
              }
            >
              Add to Cart
            </button>
            <UserFavs product={product} />
          </div>
        );
      })}
      <CheckoutWrapper />
    </div>
  );
};

export default Products;
