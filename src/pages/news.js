import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import theme from "../theme/theme";
import NewsSummary from "../components/news/NewsSummary";
import HeaderBlock from "../components/HeaderBlock";

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
                            padding={theme.pageHeaderSection.padding}
                        >
                            News &amp; <span>Insights</span>
                        </HeaderBlock>
                    </Column>
                </Row>
                <Row expanded collapse>
                    <Column medium={6} large={6} collapse>
                        <NewsItem data={news[0]} height={720} />
                    </Column>
                    <Column medium={6} large={6} collapse>
                        <Row collapse>
                            <NewsItem data={news[1]} height={360} />
                        </Row>
                        <Row collapse>
                            <Column medium={6} large={6} collapse>
                                <NewsItem data={news[2]} height={360} />
                            </Column>
                            <Column medium={6} large={6} collapse>
                                <NewsItem data={news[3]} height={360} />
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row expanded collapse>
                    <Column medium={3} collapse>
                        <NewsItem data={news[4]} height={360} />
                    </Column>
                    <Column medium={3} collapse>
                        <NewsItem data={news[5]} height={360} />
                    </Column>
                    <Column medium={6} collapse>
                        <NewsItem data={news[6]} height={360} />
                    </Column>
                </Row>
            </div>
        );
    }
}

class NewsItem extends React.Component {
    render() {
        let { data, height } = this.props;
        return data ? <NewsSummary story={data.node} height={height} /> : null;
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
                    id
                    frontmatter {
                        title
                        templateKey
                        thumb
                        category
                    }
                }
            }
        }
    }
`;
