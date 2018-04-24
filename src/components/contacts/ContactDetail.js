import React from "react";
import styled from "styled-components";
import { colors, breakpoints, spacing } from "../../theme/theme";
import { HTMLContent } from "../Content";
import FAIcon from "@fortawesome/react-fontawesome";

const Container = styled.div`
    height: 100%;
    padding: ${spacing.padding}em;
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
        font-size: 1.5vw;
    }
`;
const SectionLabel = styled.h4`
    margin: 2rem 0 1rem 0;
    color: ${colors.lightGray};
    font-weight: bold;
    font-size: 5vw;
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 2.3vw;
    }
    @media (min-width: ${breakpoints.large}px) {
        font-size: 0.8vw;
    }
`;

const Icon = styled(FAIcon)`
    color: ${colors.accent};
    font-size: 1.5rem;
    margin: 0.5rem 0.3rem -0.3rem 0;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1em;
`;

const Details = styled.div`
    line-height: 1.2;
    margin-bottom: 1em;
    font-weight: bold;
    font-size: 1em;
    a {
        color: ${colors.black};
    }
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
                <Details>
                    <HTMLContent content={contact.frontmatter.address} />
                </Details>
                {contact.frontmatter.group === "RLA" && (
                    <div>
                        <SectionLabel>Lead Contact</SectionLabel>
                        <ProfileImage
                            src={
                                contact.frontmatter.contactImage.childImageSharp
                                    .original.src
                            }
                        />
                        <Details>
                            {contact.frontmatter.contactName}
                            <br />
                            {contact.frontmatter.contactRole}
                        </Details>
                        <Details>
                            <Icon
                                icon="phone"
                                mask={["fas", "circle"]}
                                transform="shrink-9"
                            />
                            {contact.frontmatter.tel}
                        </Details>
                        <Details>
                            <Icon
                                icon="envelope"
                                mask={["fas", "circle"]}
                                transform="shrink-9"
                            />
                            <a href={`mailto:${contact.frontmatter.email}`}>
                                {contact.frontmatter.email}
                            </a>
                        </Details>
                    </div>
                )}
            </Container>
        );
    }
}

export default ContactDetail;
