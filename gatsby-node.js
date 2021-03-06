const path = require("path");
const _ = require("lodash");
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

        /*////////////////////////////////
        //Deal with getting Netlify uploaded images processing
        ////////////////////////////////*/
        //Get the list of image fields - TODO Automatically pull these from the config (perhaps then add as a plugin?)
        const imageFields = [
            "hero",
            "thumb",
            "profile",
            "contactImage",
            "logo",
            "image"
        ];

        const { frontmatter } = node;
        if (frontmatter) {
            //console.log("Got frontmatter");
            const frontMatterKeys = Object.keys(frontmatter);
            //console.log("Got frontmatter keys", frontMatterKeys);

            //TODO - Make this recursive???
            frontMatterKeys.forEach(key => {
                //Check the key is in the image field list
                if (imageFields.indexOf(key) != -1) {
                    //console.log("Got an image field: " + key);
                    const image = frontmatter[key];
                    if (image && image.indexOf("/img") === 0) {
                        //console.log("Creating Node Field: " + key + "Rel");

                        //This is how it's recommended but the gatsby image plugins don't seem to kick in
                        createNodeField({
                            node,
                            name: key,
                            value: path.relative(
                                path.dirname(node.fileAbsolutePath),
                                path.join(__dirname, "/static/", image)
                            )
                        });
                        //This works, but apparently shouldn't, so it'd be good to work out away around it
                        frontmatter[key] = {
                            responsive: path.relative(
                                path.dirname(node.fileAbsolutePath),
                                path.join(__dirname, "/static/", image)
                            ),
                            original: image
                        };
                        //Copy the original image into another field for image types that the gatsby image plugins don't handle
                        //frontmatter[key + "Original"] = image;
                    }
                }
            });
        }
    }
};

exports.sourceNodes = ({ boundActionCreators, getNodes, getNode }) => {
    const { createNodeField } = boundActionCreators;

    const postsOfAuthors = {};
    // iterate thorugh all markdown nodes to link books to author
    // and build author index
    const markdownNodes = getNodes()
        .filter(node => node.internal.type === "MarkdownRemark")
        .forEach(node => {
            if (node.frontmatter.author) {
                //console.log(node.frontmatter.author);
                const authorNode = getNodes().find(
                    node2 =>
                        node2.internal.type === "MarkdownRemark" &&
                        node2.frontmatter.title === node.frontmatter.author
                );
                //console.log("authorNode", authorNode);
                if (authorNode) {
                    createNodeField({
                        node,
                        name: "author",
                        value: authorNode.id
                    });

                    // if it's first time for this author init empty array for his posts
                    if (!(authorNode.id in postsOfAuthors)) {
                        postsOfAuthors[authorNode.id] = [];
                    }
                    // add book to this author
                    postsOfAuthors[authorNode.id].push(node.id);
                }
            }
        });

    Object.entries(postsOfAuthors).forEach(([authorNodeId, postIds]) => {
        createNodeField({
            node: getNode(authorNodeId),
            name: "posts",
            value: postIds
        });
    });
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
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            templateKey
                            title
                            thumb {
                                responsive {
                                    childImageSharp {
                                        original {
                                            src
                                        }
                                    }
                                }
                                original
                            }
                            category
                            tags
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

        // Tag pages:

        const tagTemplate = path.resolve("src/templates/tags.js");
        let tags = [];
        // Iterate through each post, putting all found tags into `tags`
        _.each(pages, edge => {
            if (_.get(edge, "node.frontmatter.tags")) {
                tags = tags.concat(edge.node.frontmatter.tags);
            }
        });
        // Eliminate duplicate tags
        tags = _.uniq(tags);

        // Make tag pages
        tags.forEach(tag => {
            createPage({
                path: `/tags/${_.kebabCase(tag)}/`,
                component: tagTemplate,
                context: {
                    tag
                }
            });
        });

        // Author pages:

        const authorTemplate = path.resolve("src/templates/people.js");
        let people = [];
        // Iterate through each post, putting all found people into `people`
        _.each(pages, edge => {
            if (_.get(edge, "node.frontmatter.title")) {
                people = people.concat(edge.node.frontmatter.title);
            }
        });
        // Eliminate duplicate people
        people = _.uniq(people);

        // Make author pages
        people.forEach(author => {
            const authorString = _.kebabCase(author);
            createPage({
                path: `/authors/${authorString}/`,
                component: path.resolve("src/templates/authors.js"),
                context: {
                    author: `/people/${authorString}/`
                }
            });
        });
    });
};

// const imageCanBeProcessed = image => {
//     //Get the file extension as we only want to process images that
//     //the gatsby sharp transformer can handle (e.g. no GIF's)
//     const extension = image.substr(image.lastIndexOf(".") + 1);
//     //Extensions gatsby image sharp can process
//     const extensions = [`jpeg`, `jpg`, `png`, `webp`, `tif`, `tiff`];
//     return image.indexOf("/img") === 0 && _.includes(extensions, extension);
// };
