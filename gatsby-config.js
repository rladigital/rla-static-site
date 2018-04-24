module.exports = {
    siteMetadata: {
        title: "RLA Website"
    },
    mapping: {
        "MarkdownRemark.frontmatter.author": `MarkdownRemark.frontmatter.title`
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-1755500-14",
                // Puts tracking script in the head instead of the body
                head: true
                // Setting this parameter is optional
                // anonymize: true,
                // Setting this parameter is also optional
                // respectDNT: true,
                // Avoids sending pageview hits from custom paths
                // exclude: ["/preview/**", "/do-not-track/me/too/"]
            }
        },
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
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/static/img`,
                name: "cmsimages"
            }
        },
        "gatsby-plugin-sharp",
        "gatsby-plugin-styled-components",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    // gatsby-remark-relative-images must
                    // go before gatsby-remark-images
                    {
                        resolve: `gatsby-remark-relative-images`,
                        options: {
                            // Set the name option to the same
                            // name you set for gatsby-source-filesystem
                            name: "cmsimages" // default
                        }
                    },
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
