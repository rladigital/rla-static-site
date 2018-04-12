import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import styled from "styled-components";

import theme, { colors } from "../theme/theme";
import { chunkArray, random } from "../helpers/helpers";
import WorkSummary from "../components/work/WorkSummary";
import HeaderBlock from "../components/HeaderBlock";

const layouts = {
    0: [],
    1: [12],
    2: [[6, 6]],
    3: [[6, 3, 3], [3, 6, 3], [3, 3, 6], [4, 4, 4]]
};

const staticWorkTop = [
    [
        {
            node: {
                fields: {
                    slug: ""
                },
                frontmatter: {
                    outcome: "",
                    templatekey: "work",
                    thumb: "/img/work/JBLcase-study.jpg",
                    title: ""
                },
                html: "",
                id: ""
            }
        },
        {
            node: {
                fields: {
                    slug: ""
                },
                frontmatter: {
                    outcome: "",
                    templatekey: "work",
                    thumb: "/img/work/salisburycase-study.jpg",
                    title: ""
                },
                html: "",
                id: ""
            }
        }
    ]
];

const staticWork = [
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/AUDIcase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/BMW-MINIcase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/Denniscase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/euroreparcase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/FCA.gif",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/ford.gif",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/goodyear-dunlopcase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/scaniacase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/take-me-outcase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/teleforest.gif",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/tescocase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    },
    {
        node: {
            fields: {
                slug: ""
            },
            frontmatter: {
                outcome: "",
                templatekey: "work",
                thumb: "/img/work/Volkswagencase-study.jpg",
                title: ""
            },
            html: "",
            id: ""
        }
    }
];

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
        return false;
    }

    render() {
        const {
            data: { allMarkdownRemark: { edges: work } },
            transition
        } = this.props;

        //const chunkedWork = chunkArray(3, work);

        const chunkedWork = staticWorkTop.concat(chunkArray(3, staticWork));

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
                                let layout =
                                    layoutArray[random(0, layoutArray.length)];

                                return (
                                    layout &&
                                    chunk &&
                                    chunk.map(({ node: caseStudy }, index) => {
                                        return (
                                            <Column
                                                medium={6}
                                                large={layout[index]}
                                                key={index}
                                                collapse
                                            >
                                                <WorkSummary work={caseStudy} />
                                            </Column>
                                        );
                                    })
                                );
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
