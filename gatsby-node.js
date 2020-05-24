const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');
const {
  fmImagesToRelative,
} = require('gatsby-remark-relative-images');

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

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: {
          frontmatter: {
            templateKey: {
              regex: "/^(?!productPageTemplate|article)/"
            }
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      if (edge.node.frontmatter.templateKey) {
        const id = edge.node.id;
        createPage({
          path: edge.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(
              edge.node.frontmatter.templateKey,
            )}.js`,
          ),
          // additional data can be passed via context
          context: {
            id,
          },
        });
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
