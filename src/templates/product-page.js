import React, { useContext } from 'react';
import Layout from '../components/layout';
import { CartContext } from '../components/cart';
import { graphql } from 'gatsby';

/**
 * @file product-page.js is a template for the product pages.
 * @author Nyasha Mutangadura and Stephen Kelehan
 */

/**
 * Product Page Functional Component
 * @function ProductPage
 * @param  data - Product ID
 * @param  pageContext - Stripe Data
 * @returns Page Content - Product of n1 and n2
 */

export default function ProductPage({ data, pageContext }) {
  const context = useContext(CartContext);
  const skus = data.allStripeSku.edges;
  return (
    <Layout>
      <div>
        <p>{pageContext.productId}</p>
        {skus.map((sku) => {
          return (
            <div>
              <p>{sku.node.id}</p>
              <p>{sku.node.currency}</p>
              <p>{sku.node.price}</p>
              <p>{sku.node.attributes.name}</p>
              <button
                onClick={(e) =>
                  context.addToCart(
                    1,
                    sku.node.id,
                    sku.node.price,
                    'desc',
                    sku.node.image,
                    sku.node.product.id,
                    sku.node.attributes.name,
                  )
                }
              >
                Add to Cart
              </button>
              <p>---------------------------</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query GetSkus($productId: String!) {
    allStripeSku(
      filter: {
        active: { eq: true }
        product: { id: { eq: $productId } }
      }
    ) {
      edges {
        node {
          id
          currency
          price
          attributes {
            name
          }
          image
          product {
            id
          }
        }
      }
    }
  }
`;
