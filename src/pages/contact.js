import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import { isBrowser } from "../helpers/helpers";
import { colors, sizes, spacing } from "../theme/theme";
import theme from "../theme/theme";
import SolutionSummary from "../components/solutions/SolutionSummary";
import HeaderBlock from "../components/HeaderBlock";
import MapContactListGroup from "../components/contacts/MapContactListGroup";
import MapListContainer from "../components/contacts/MapListContainer";
import ContactDetail from "../components/contacts/ContactDetail";

import { MapListHeader } from "../components/contacts/MapContactListComponents";
if (isBrowser()) {
    var ContactMap = require("../components/contacts/ContactMap");
}

const Container = styled.div`
    background: ${colors.mediumBlueGray};
    height: 100%;
`;

export const ContactListItemNoLink = styled.li`
    margin: 0.6em ${spacing.padding}rem;
    background: ${props =>
        props.active ? colors.darkBlueGray : colors.mediumBlueGray};
    font-size: 0.8rem;
`;
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
        const {
            data: { allMarkdownRemark: { edges: contacts } },
            transition
        } = this.props;
        return (
            <div style={transition && transition.style}>
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

                <Row equaliseChildHeight={true} collapse expanded>
                    <Column medium={6} large={3} collapse>
                        <Container>
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
                            </MapListContainer>
                            <MapListHeader>Also in</MapListHeader>
                            <ul>
                                <ContactListItemNoLink>
                                    Barnstaple
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Belfast
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Birmingham
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Bournemouth
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Bristol
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Chester
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Colchester
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Edinburgh
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Filleigh
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Harefield
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Leicester
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    London
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Manchester
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Newcastle
                                </ContactListItemNoLink>
                                <ContactListItemNoLink>
                                    Norwich
                                </ContactListItemNoLink>
                            </ul>
                        </Container>
                    </Column>
                    <Column medium={6} large={3} collapse>
                        <ContactDetail contact={this.state.selectedContact} />
                    </Column>
                    <Column large={6} collapse>
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
