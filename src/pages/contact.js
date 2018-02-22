import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";

import { isBrowser } from "../helpers/helpers";
import theme from "../theme/theme";
import SolutionSummary from "../components/solutions/SolutionSummary";
import HeaderBlock from "../components/HeaderBlock";
import MapContactListGroup from "../components/contacts/MapContactListGroup";
import MapListContainer from "../components/contacts/MapListContainer";
import ContactDetail from "../components/contacts/ContactDetail";
if (isBrowser()) {
    var ContactMap = require("../components/contacts/ContactMap");
}

export default class ContactPage extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedContact: {}
        };
    }
    componentWillMount() {
        this.selectContactBySlug("/contacts/bournemouth/");
    }
    selectContactBySlug = slug => {
        const { data: { allMarkdownRemark: { edges: contacts } } } = this.props;
        try {
            const contact = contacts.filter(({ node: contact }) => {
                return contact.fields.slug === slug;
            })[0];
            this.setState({ selectedContact: contact.node });
        } catch (e) {}
    };

    render() {
        const { data: { allMarkdownRemark: { edges: contacts } } } = this.props;
        return (
            <div>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            Get in <span>Touch</span>
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row equaliseChildHeight={true}>
                    <Column medium={3} collapse>
                        <MapListContainer
                            contacts={contacts}
                            onItemClick={this.selectContactBySlug}
                            selectedContact={this.state.selectedContact}
                        >
                            <MapContactListGroup
                                heading="RLA Locations"
                                group="RLA"
                            />
                            <MapContactListGroup
                                heading="Mission Locations"
                                group="Mission"
                            />
                            <MapContactListGroup
                                heading="Also In"
                                group="Other"
                                size="small"
                            />
                        </MapListContainer>
                    </Column>
                    <Column medium={3} collapse>
                        <ContactDetail contact={this.state.selectedContact} />
                    </Column>
                    <Column medium={6} collapse>
                        {isBrowser() && (
                            <ContactMap
                                selectedContact={this.state.selectedContact}
                                contacts={contacts}
                                selectContactBySlug={this.selectContactBySlug}
                            />
                        )}
                    </Column>
                </Row>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query ContactQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "contacts" } } }
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
                        group
                        lat
                        lng
                        address
                        contactName
                        contactImage
                        contactRole
                        tel
                        email
                    }
                }
            }
        }
    }
`;
