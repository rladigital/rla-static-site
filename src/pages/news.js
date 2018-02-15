import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import theme from "../theme/theme";
import NewsSummary from "../components/news/NewsSummary";
import HeaderBlock from "../components/HeaderBlock";

export default class NewsPage extends React.Component {
    render() {
        const { data: { allMarkdownRemark: { edges: news } } } = this.props;
        //console.log(news);
        return (
            <div>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            News &amp; <span>Insights</span>
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row>
                    {news.map(({ node: story }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <NewsSummary story={story} />
                            </Column>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query NewsQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { glob: "news-*" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    html
                    id
                    frontmatter {
                        title
                        templateKey
                        hero
                    }
                }
            }
        }
    }
`;
