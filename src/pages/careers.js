import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import Helmet from "react-helmet";

import { serveStatic } from "../helpers/helpers";
import theme, { colors, spacing } from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import JobSection from "../components/jobs/JobsSection";
import SectionContainer from "../components/SectionContainer";

export default class JobPage extends React.Component {
    render() {
        const { data, transition } = this.props;
        const { jobs: { edges: jobs }, news: { edges: news } } = data;
        return (
            <div style={transition && transition.style}>
                <Helmet title="Careers | RLA Group | Full Service Advertising Agency">
                    <meta
                        name="title"
                        content="Careers | RLA Group | Full Service Advertising Agency"
                    />
                </Helmet>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}>
                            Careers
                        </HeaderBlock>
                    </Column>
                </Row>

                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                    padding={`${spacing.padding}rem 0`}>
                    <JobSection jobs={jobs} news={news} />
                </SectionContainer>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query JobQuery {
        jobs: allMarkdownRemark(
            sort: { fields: [frontmatter___weighting] }
            filter: { frontmatter: { templateKey: { eq: "job" } } }
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
                        description
                        templateKey
                        role
                        hero {
                            responsive {
                                childImageSharp {
                                    original {
                                        src
                                    }
                                }
                            }
                            original
                        }
                        area
                        closing
                    }
                }
            }
        }
        news: allMarkdownRemark(
            sort: {
                fields: [frontmatter___date, frontmatter___weighting]
                order: DESC
            }
            filter: { frontmatter: { templateKey: { eq: "news" } } }
            limit: 10
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
