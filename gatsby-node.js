const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const productPage = path.resolve(`./src/templates/product-page.js`);
  const result = await graphql(
    `
      {
        allStripeProduct {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }
  const products = result.data.allStripeProduct.edges;

  products.forEach((product, index) => {
    createPage({
      path: product.node.id,
      component: productPage,
      context: {
        productId: product.node.id,
      },
    });
  });
};
