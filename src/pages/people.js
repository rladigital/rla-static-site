import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import { serveStatic } from "../helpers/helpers";
import theme from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";

if (serveStatic()) {
    var PeopleBrowser = require("../components/people/PeopleBrowserStatic");
} else {
    var PeopleBrowser = require("../components/people/PeopleBrowser");
}
export default class PeoplePage extends React.Component {
    render() {
        const { data: { allMarkdownRemark: { edges: people } } } = this.props;
        //console.log(news);
        return (
            <div>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            <span>People</span> at our Core
                        </HeaderBlock>
                        <p>
                            We deliver fresh thinking and innovative ideas that
                            give our clients the edge over their competitors.
                            Our passion and drive to know your business inside
                            out and back to front enables us to work alongside
                            you and become an inseparable extension of your
                            marketing team.
                        </p>
                    </Column>
                </Row>

                <Row>
                    <PeopleBrowser people={people} />
                </Row>
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
                        profile
                    }
                }
            }
        }
    }
`;
