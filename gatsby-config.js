module.exports = {
    siteMetadata: {
        title: "RLA Website"
    },
    mapping: {
        "MarkdownRemark.frontmatter.author": `MarkdownRemark.frontmatter.title`
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/pages`,
                name: "pages"
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/img`,
                name: "images"
            }
        },
        "gatsby-plugin-sharp",
        "gatsby-plugin-styled-components",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 590
                        }
                    }
                ]
            }
        },
        {
            resolve: "gatsby-plugin-netlify-cms",
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`
            }
        }
    ]
};
