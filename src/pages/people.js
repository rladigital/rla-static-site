import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import styled from "styled-components";

import { isBrowser } from "../helpers/helpers";
import theme from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import PeopleBrowser from "../components/people/PeopleBrowser";

// if (isBrowser()) {
//     var PeopleBrowser = require("../components/people/PeopleBrowser");
// } else {
//     var PeopleBrowser = require("../components/people/PeopleBrowserStatic");
// }

const StyledP = styled.p`
    text-align: center;
`;

export default class PeoplePage extends React.Component {
    render() {
        const {
            data: { allMarkdownRemark: { edges: people } },
            transition
        } = this.props;
        //console.log(news);
        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={{
                                top: 8,
                                right: 0,
                                bottom: 0,
                                left: 0
                            }}
                        >
                            <span>People</span> at our Core
                        </HeaderBlock>
                    </Column>
                </Row>

                <PeopleBrowser people={people} size={500} />
            </div>
        );
    }
}

export const pageQuery = graphql`
    query PeopleQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "people" } } }
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
                        profile {
                            responsive {
                                childImageSharp {
                                    original {
                                        src
                                    }
                                }
                            }
                            original
                        }
                    }
                }
            }
        }
    }
`;
