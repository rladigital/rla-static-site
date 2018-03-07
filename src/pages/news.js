import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import theme from "../theme/theme";
import NewsSummary from "../components/news/NewsSummary";
import HeaderBlock from "../components/HeaderBlock";

export default class NewsPage extends React.Component {
    render() {
        let { data: { allMarkdownRemark: { edges: news } } } = this.props;

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
                <Row expanded collapse>
                    <Column medium={6} large={6} collapse>
                        <NewsItem data={news[0]} height={2} />
                    </Column>
                    <Column medium={6} large={6} collapse>
                        <Row collapse>
                            <NewsItem data={news[1]} height={1} />
                        </Row>
                        <Row collapse>
                            <Column medium={6} large={6} collapse>
                                <NewsItem data={news[2]} height={1} />
                            </Column>
                            <Column medium={6} large={6} collapse>
                                <NewsItem data={news[3]} height={1} />
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row expanded collapse>
                    <Column medium={3} collapse>
                        <NewsItem data={news[4]} height={1} />
                    </Column>
                    <Column medium={3} collapse>
                        <NewsItem data={news[5]} height={1} />
                    </Column>
                    <Column medium={6} collapse>
                        <NewsItem data={news[6]} height={1} />
                    </Column>
                </Row>
            </div>
        );
    }
}

class NewsItem extends React.Component {
    render() {
        const rowHeight = 22;
        let { data, height } = this.props;
        return data ? (
            <NewsSummary story={data.node} minHeight={rowHeight * height} />
        ) : null;
    }
}

export const pageQuery = graphql`
    query NewsQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "news" } } }
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
