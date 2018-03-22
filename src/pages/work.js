import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import styled from "styled-components";

import theme, { colors } from "../theme/theme";
import WorkSummary from "../components/work/WorkSummary";
import HeaderBlock from "../components/HeaderBlock";

const Container = styled.div`
    padding: 3px 0;
    margin: 0 -3px;
    background: ${colors.white};
`;

const layouts = [6, 6, 3, 3, 6, 4, 4, 4, 6, 6];

export default class WorkPage extends React.Component {
    render() {
        const {
            data: { allMarkdownRemark: { edges: work } },
            transition
        } = this.props;
        //console.log(work);

        const temp = work
            .concat(work)
            .concat(work)
            .concat(work)
            .concat(work)
            .concat(work)
            .concat(work)
            .concat(work)
            .concat(work)
            .concat(work);
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

                <Container>
                    <Row expanded collapse>
                        {temp.map(({ node: caseStudy }, index) => {
                            console.log("test", index);
                            return (
                                <Column
                                    medium={layouts[index]}
                                    key={index}
                                    collapse
                                >
                                    <WorkSummary work={caseStudy} />
                                </Column>
                            );
                        })}
                    </Row>
                </Container>
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
                        outcome
                        templateKey
                        thumb
                    }
                }
            }
        }
    }
`;
