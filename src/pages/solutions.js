import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import theme from "../theme/theme";
import SolutionSummary from "../components/solutions/SolutionSummary";
import HeaderBlock from "../components/HeaderBlock";

export default class SolutionsPage extends React.Component {
    render() {
        const {
            data: { allMarkdownRemark: { edges: solutions }, transition }
        } = this.props;
        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            <span>Connected</span> Ambition
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row>
                    {solutions.map(({ node: solution }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <SolutionSummary solution={solution} />
                            </Column>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query SolutionsQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "solutions" } } }
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
                        color1
                        color2
                    }
                }
            }
        }
    }
`;
