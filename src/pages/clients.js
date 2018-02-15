import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import theme from "../theme/theme";
import ClientSummary from "../components/clients/ClientSummary";
import HeaderBlock from "../components/HeaderBlock";

export default class ClientsPage extends React.Component {
    render() {
        const { data: { allMarkdownRemark: { edges: clients } } } = this.props;
        //console.log(clients);
        return (
            <div>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            <span>Brands</span> we work with
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row>
                    {clients.map(({ node: client }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <ClientSummary client={client} />
                            </Column>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query clientsQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "clients" } } }
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
