import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import { serveStatic } from "../helpers/helpers";
import theme, { colors, spacing } from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import JobSection from "../components/jobs/JobsSection";
import SectionContainer from "../components/SectionContainer";

export default class JobPage extends React.Component {
    render() {
        const {
            data: { allMarkdownRemark: { edges: jobs } },
            transition
        } = this.props;
        //console.log(news);
        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            Careers
                        </HeaderBlock>
                    </Column>
                </Row>

                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                    padding={`${spacing.padding}rem 0`}
                >
                    <JobSection jobs={jobs} />
                </SectionContainer>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query JobQuery {
        allMarkdownRemark(
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
                        templateKey
                        role
                        hero {
                            childImageSharp {
                                original {
                                    src
                                }
                            }
                        }
                        area
                        closing
                    }
                }
            }
        }
    }
`;
