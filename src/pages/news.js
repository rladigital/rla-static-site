import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import theme from "../theme/theme";
import NewsList from "../components/news/NewsList";
import HeaderBlock from "../components/HeaderBlock";

const rowsAdvance = 3;
export default class NewsPage extends React.Component {
    render() {
        let {
            data: { allMarkdownRemark: { edges: news } },
            transition
        } = this.props;

        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}>
                            News &amp; <span>Insights</span>
                        </HeaderBlock>
                    </Column>
                </Row>
                <NewsList news={news} />
            </div>
        );
    }
}

export const pageQuery = graphql`
    query NewsQuery {
        allMarkdownRemark(
            sort: {
                fields: [frontmatter___date, frontmatter___weighting]
                order: DESC
            }
            filter: { frontmatter: { templateKey: { eq: "news" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    id
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
        }
    }
`;
