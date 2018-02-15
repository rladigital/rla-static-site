import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import NewsSummary from "../components/news/NewsSummary";
import HeaderBlock from "../components/HeaderBlock";

export default class IndexPage extends React.Component {
    render() {
        const { data: { allMarkdownRemark: { edges: news } } } = this.props;
        console.log(news);
        return (
            <div>
                <Row>
                    <Column>
                        <HeaderBlock>
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
