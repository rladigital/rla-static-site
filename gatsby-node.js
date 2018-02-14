const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` });
        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        excerpt(pruneLength: 400)
                        html
                        id
                        frontmatter {
                            templateKey
                            path
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()));
            return Promise.reject(result.errors);
        }
        return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            console.log(node);
            const pagePath = node.frontmatter.path;
            createPage({
                path: node.fields.slug,
                component: path.resolve(
                    `src/templates/${String(node.frontmatter.templateKey)}.js`
                ),
                // additional data can be passed via context
                context: {
                    slug: node.fields.slug
                }
            });
        });
    });
};
