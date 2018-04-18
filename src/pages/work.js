import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import styled, { css } from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

import theme, { colors, breakpoints } from "../theme/theme";
import { randomChunkArray, random, shuffleArray } from "../helpers/helpers";
import WorkSummary from "../components/work/WorkSummary";
import HeaderBlock from "../components/HeaderBlock";
import LoadMore from "../components/blog/LoadMore";

let lastarrayIndex = null;

const rowsAdvance = 3;

const heightMediaQuery = `
@media (min-width: ${breakpoints.medium}px) {
    height: 50vw;
}
    @media (min-width: ${breakpoints.large}px) {
        height: 33.33vw;
    }
`;

export default class PeoplePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { data: { allMarkdownRemark: { edges: work } } } = this.props;

        // const chunks = randomChunkArray(shuffleArray(work), 2, 3);
        const chunks = randomChunkArray(work, 2, 3);

        const layouts = {
            0: [[]],
            1: [[12]],
            2: [[5, 7], [6, 6], [7, 5]],
            3: [[3, 6, 3], [4, 4, 4]]
        };
        const layout = this.generateLayout(chunks, layouts);

        this.setState({
            rows: rowsAdvance,
            chunkedWork: chunks,
            layout: layout
        });
    }

    handleClick() {
        this.setState({
            rows: this.state.rows + rowsAdvance
        });
    }

    generateLayout(chunks, layouts) {
        const result = new Array();

        chunks.map((chunk, i) => {
            const layoutArray = layouts[chunk.length];
            const getArrayIndex = function() {
                return random(0, layoutArray.length - 1);
            };
            let arrayIndex = 0;

            // make sure that there are no duplicate rows if possible
            if (layoutArray.length > 1) {
                arrayIndex = getArrayIndex();
                while (arrayIndex == lastarrayIndex) {
                    arrayIndex = getArrayIndex();
                }
                lastarrayIndex = arrayIndex;
            }

            result.push(layoutArray[arrayIndex]);
        });

        return result;
    }

    render() {
        const {
            data: { allMarkdownRemark: { edges: work } },
            transition
        } = this.props;
        const { chunkedWork, rows, layout } = this.state;

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
                            chunkedWork.slice(0, rows).map((chunk, i) => {
                                return chunk.map(
                                    ({ node: caseStudy }, index) => {
                                        return (
                                            <Column
                                                medium={6}
                                                large={layout[i][index]}
                                                key={index}
                                                collapse
                                            >
                                                <ScrollAnimation
                                                    animateIn="fadeIn"
                                                    delay={250 * index}
                                                    animateOnce={true}
                                                >
                                                    <WorkSummary
                                                        heightMediaQuery={
                                                            heightMediaQuery
                                                        }
                                                        work={caseStudy}
                                                        index={index}
                                                    />
                                                </ScrollAnimation>
                                            </Column>
                                        );
                                    }
                                );
                            })}
                    </Row>
                </div>
                {chunkedWork &&
                    chunkedWork.length > rows && (
                        <LoadMore onClick={() => this.handleClick()}>
                            Load More
                        </LoadMore>
                    )}
            </div>
        );
    }
}

export const pageQuery = graphql`
    query workQuery {
        allMarkdownRemark(
            sort: { fields: [frontmatter___weighting] }
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
                        description
                        templateKey
                        thumb
                        hero
                        previewType
                    }
                }
            }
        }
    }
`;
