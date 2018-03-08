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
            allMarkdownRemark(
                sort: {
                    fields: [
                        frontmatter___templateKey
                        frontmatter___date
                        frontmatter___title
                    ]
                    order: DESC
                }
                limit: 1000
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            templateKey
                            title
                            hero
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
        const pages = result.data.allMarkdownRemark.edges;

        pages.forEach(({ node }, index) => {
            //console.log(node);
            const previous =
                index === pages.length - 1 ||
                pages[index + 1].node.frontmatter.templateKey !==
                    node.frontmatter.templateKey
                    ? false
                    : pages[index + 1].node;
            const next =
                index === 0 ||
                pages[index - 1].node.frontmatter.templateKey !==
                    node.frontmatter.templateKey
                    ? false
                    : pages[index - 1].node;

            createPage({
                path: node.fields.slug,
                component: path.resolve(
                    `src/templates/${String(node.frontmatter.templateKey)}.js`
                ),
                // additional data can be passed via context
                context: {
                    slug: node.fields.slug,
                    previous,
                    next
                }
            });
        });
    });
};

// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const extractCss = new ExtractTextPlugin({
//     filename: "stylesCMS.css"
//     // use: `${cssModulesConfig(stage)}&modules&importLoaders=1`
// });

// exports.modifyWebpackConfig = ({ config, stage }) => {
//     switch (stage) {
//         case "develop":
//             //case "build-css":
//             config.removeLoader("css");
//             config.loader("css", {
//                 test: /\.css$/,
//                 loader: extractCss.extract({
//                     use: [
//                         {
//                             loader: `css-loader?modules&importLoaders=1`
//                         }
//                     ]
//                 })
//             });

//             config.merge({
//                 plugins: [extractCss]
//             });
//             break;
//     }

//     return config;
// };
