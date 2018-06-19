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
        const tag = `/people/${this.props.pathContext.tag}/`;

        let {
            data: { allMarkdownRemark: { edges: data, totalCount } },
            transition
        } = this.props;

        const posts = data[0].node.fields.posts;

        const person = data[0].node.frontmatter.title;

        //const { edges, totalCount } = this.props.data.allMarkdownRemark;
        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}>
                            {posts.length} post{posts.length === 1 ? "" : "s"}{" "}
                            by <span>{person}</span>
                        </HeaderBlock>
                    </Column>
                </Row>

                <NewsList news={posts} />
            </div>
        );
    }
}

AuthorsPage.propTypes = {
    pathContext: PropTypes.shape({
        tag: PropTypes.string.isRequired
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

export default AuthorsPage;

export const pageQuery = graphql`
    query AuthorPage($tag: String) {
        allMarkdownRemark(filter: { fields: { slug: { eq: $tag } } }) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                        posts {
                            fields {
                                slug
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
