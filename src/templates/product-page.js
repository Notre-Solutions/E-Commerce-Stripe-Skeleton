import React, { useContext, Component } from 'react';
import Layout from '../components/layout';
import { CartContext } from '../components/cart';
import { graphql } from 'gatsby';
import { Favourites } from '../components/AccountContent/Favourites';
import { AuthUserContext } from '../components/Session';

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

class ProductPageMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const skus = this.props.data.allStripeSku.edges;
    return (
      <div>
        {skus.map((sku) => {
          return (
            <div>
              <p>{sku.node.currency}</p>
              <p>{sku.node.price / 100}</p>
              <p>{sku.node.attributes.name}</p>
              <button
                onClick={(e) =>
                  this.props.context.addToCart(
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
              <Favourites product={sku} />
            </div>
          );
        })}
      </div>
    );
  }
}

const ProductPage = ({ data, pageContext }) => {
  const context = useContext(CartContext);
  const authContext = useContext(AuthUserContext);
  console.log(authContext);
  return (
    <Layout>
      <ProductPageMain
        data={data}
        pageContext={pageContext}
        context={context}
        auth={authContext}
      ></ProductPageMain>
    </Layout>
  );
};

export default ProductPage;

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
