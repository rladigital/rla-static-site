import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import styled from "styled-components";

import theme, { colors } from "../theme/theme";
import { randomChunkArray, random } from "../helpers/helpers";
import WorkSummary from "../components/work/WorkSummary";
import HeaderBlock from "../components/HeaderBlock";

const layouts = {
    0: [[]],
    1: [[12]],
    2: [[6, 6]],
    3: [[6, 3, 3], [3, 6, 3], [4, 4, 4]]
};

let lastarrayIndex = null;

const LoadMore = styled.a`
    width: 100%;
    display: inline-block;
    background: ${colors.accent};
    padding: 30px;
    text-align: center;
    font-size: 28px;
    color: ${colors.white};
    cursor: pointer;
`;

export default class WorkPage extends React.Component {
    shouldComponentUpdate(nextprops) {
        return true;
    }

    render() {
        const {
            data: { allMarkdownRemark: { edges: work } },
            transition
        } = this.props;

        const chunkedWork = randomChunkArray(work, 2, 3);

        console.log(chunkedWork);

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

                <div>
                    <Row expanded collapse>
                        {chunkedWork &&
                            chunkedWork.map((chunk, i) => {
                                let layoutArray = layouts[chunk.length];
                                let arrayIndex = 0;

                                if (layoutArray.length > 1) {
                                    arrayIndex = random(0, layoutArray.length);
                                    while (arrayIndex == lastarrayIndex) {
                                        arrayIndex = random(
                                            0,
                                            layoutArray.length - 1
                                        );
                                    }
                                    lastarrayIndex = arrayIndex;
                                }

                                let layout = layoutArray[arrayIndex];

                                if (layout && chunk) {
                                    return chunk.map(
                                        ({ node: caseStudy }, index) => {
                                            return (
                                                <Column
                                                    medium={6}
                                                    large={layout[index]}
                                                    key={index}
                                                    collapse
                                                >
                                                    <WorkSummary
                                                        work={caseStudy}
                                                    />
                                                </Column>
                                            );
                                        }
                                    );
                                }
                            })}
                    </Row>
                </div>
                <LoadMore>Load More</LoadMore>
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
