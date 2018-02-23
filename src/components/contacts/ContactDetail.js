import React from "react";
import styled from "styled-components";
import { colors, breakpoints } from "../../theme/theme";
import Content from "../Content";
import ProfileImage from "../ProfileImage";
import FAIcon from "@fortawesome/react-fontawesome";

const Container = styled.div`
    height: 100%;
    padding: 1rem;
    background: ${colors.white};
    color: ${colors.darkBlueGray};
    word-break: break-word;
    p {
        margin: 0.2rem 0;
        line-height: 1;
        font-size: 0.8rem;
    }
`;
const ContactLocationName = styled.h3`
    color: ${colors.accent};
    font-weight: bold;
    font-size: 7vw;
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 4vw;
    }
    @media (min-width: ${breakpoints.large}px) {
        font-size: 2vw;
    }
`;
const SectionLabel = styled.h4`
    margin: 1.5rem 0 0.5rem 0;
    color: ${colors.lightGray};
    font-weight: bold;
    font-size: 5.5vw;
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 2.8vw;
    }
    @media (min-width: ${breakpoints.large}px) {
        font-size: 1.5vw;
    }
`;

const Icon = styled(FAIcon)`
    color: ${colors.accent};
    font-size: 1.5rem;
    margin: 0.5rem 0.3rem -0.3rem 0;
`;
class ContactDetail extends React.Component {
    render() {
        const { contact } = this.props;
        //console.log(contact);
        return (
            <Container>
                <ContactLocationName>
                    {contact.frontmatter.title}
                </ContactLocationName>
                <SectionLabel>Address</SectionLabel>
                <Content content={contact.frontmatter.address} />
                <SectionLabel>Lead Contact</SectionLabel>
                <ProfileImage src={contact.frontmatter.contactImage} />
                <p>{contact.frontmatter.contactName}</p>
                <p>{contact.frontmatter.contactRole}</p>
                <p>
                    <Icon
                        icon="phone"
                        mask={["fas", "circle"]}
                        transform="shrink-9"
                    />
                    {contact.frontmatter.tel}
                </p>
                <p>
                    <Icon
                        icon="envelope"
                        mask={["fas", "circle"]}
                        transform="shrink-9"
                    />
                    {contact.frontmatter.email}
                </p>
            </Container>
        );
    }
}

export default ContactDetail;
