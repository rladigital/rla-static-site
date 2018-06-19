import React from "react";
import PropTypes from "prop-types";
import { Row, Column } from "rla-components";

// Components
import Link from "gatsby-link";

import theme from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import NewsList from "../components/news/NewsList";
class AuthorPage extends React.Component {
    render() {
        const { tag } = this.props.pathContext;
        let {
            data: { allMarkdownRemark: { edges: news, totalCount } },
            transition
        } = this.props;

        //const { edges, totalCount } = this.props.data.allMarkdownRemark;
        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}>
                            {totalCount} post{totalCount === 1 ? "" : "s"}{" "}
                            tagged with <span>{tag}</span>
                        </HeaderBlock>
                    </Column>
                </Row>

                <NewsList news={news} />
            </div>
        );
    }
}

AuthorPage.propTypes = {
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

export default AuthorPage;

export const pageQuery = graphql`
    query AuthorPage {
        allMarkdownRemark(
            filter: { fields: { slug: { eq: "/people/david-dent/" } } }
        ) {
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
