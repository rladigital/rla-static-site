import React from "react";
import styled from "styled-components";
import { colors, sizes } from "../../theme/theme";
import Content from "../Content";
import ProfileImage from "../ProfileImage";

const Container = styled.div`
    height: 100%;
    padding: 0.8rem;
    background: ${colors.white};
    color: ${colors.darkBlueGray};
    p {
        margin: 0.2rem 0;
        line-height: 1;
    }
`;
const SectionLabel = styled.h4`
    color: ${colors.lightGray};
`;

class ContactDetail extends React.Component {
    render() {
        const { contact } = this.props;
        console.log(contact);
        return (
            <Container>
                <h3>{contact.frontmatter.title}</h3>
                <SectionLabel>Address</SectionLabel>
                <Content content={contact.frontmatter.address} />
                <SectionLabel>Lead Contact</SectionLabel>
                <ProfileImage src={contact.frontmatter.contactImage} />
                <p>{contact.frontmatter.contactName}</p>
                <p>{contact.frontmatter.contactRole}</p>
                <p>{contact.frontmatter.tel}</p>
                <p>{contact.frontmatter.email}</p>
            </Container>
        );
    }
}

export default ContactDetail;
