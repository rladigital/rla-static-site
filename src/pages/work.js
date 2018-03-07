import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import theme from "../theme/theme";
import WorkSummary from "../components/work/WorkSummary";
import HeaderBlock from "../components/HeaderBlock";

export default class WorkPage extends React.Component {
    render() {
        const {
            data: { allMarkdownRemark: { edges: work } },
            transition
        } = this.props;
        //console.log(work);
        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            Our <span>Work</span>
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row>
                    {work.map(({ node: caseStudy }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <WorkSummary work={caseStudy} />
                            </Column>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query workQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "work" } } }
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
                        logo
                    }
                }
            }
        }
    }
`;
