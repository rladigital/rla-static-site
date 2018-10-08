import React from "react";
import PropTypes from "prop-types";
import { Row, Column } from "rla-components";

// Components
import Link from "gatsby-link";

import theme from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import NewsList from "../components/news/NewsList";
class AuthorsPage extends React.Component {
    render() {
        if (this.props.data.allMarkdownRemark != undefined) {
            let {
                data: {
                    allMarkdownRemark: { edges: data, totalCount }
                },
                transition
            } = this.props;

            const posts = data[0].node.fields.posts;

            const postsCount = posts ? posts.length : 0;

            const person = data[0].node.frontmatter.title;

            //const { edges, totalCount } = this.props.data.allMarkdownRemark;
            return (
                <div style={transition && transition.style}>
                    <Row>
                        <Column>
                            <HeaderBlock
                                fontSize={theme.pageHeaderSection.fontSize}
                                padding={theme.pageHeaderSection.padding}>
                                {postsCount} post
                                {postsCount === 1 ? "" : "s"} by{" "}
                                <span>{person}</span>
                            </HeaderBlock>
                        </Column>
                    </Row>

                    {postsCount ? <NewsList news={posts} /> : null}
                </div>
            );
        } else {
            return null;
        }
    }
}

AuthorsPage.propTypes = {
    pathContext: PropTypes.shape({
        author: PropTypes.string.isRequired
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired
                        }),
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired
                        })
                    })
                }).isRequired
            )
        })
    })
};

AuthorsPage.defaultProps = {
    data: {
        allMarkdownRemark: {
            totalCount: null,
            edges: []
        }
    }
};

export default AuthorsPage;

export const pageQuery = graphql`
    query AuthorPage($author: String) {
        allMarkdownRemark(filter: { fields: { slug: { eq: $author } } }) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                        posts {
                            fields {
                                slug
                                author {
                                    id
                                }
                            }
                            frontmatter {
                                title
                                templateKey
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
                            }
                        }
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
