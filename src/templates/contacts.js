import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";

import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import HeaderBlock from "../components/HeaderBlock";

import styled from "styled-components";

import { getOriginalImageSrc } from "../utils/image";
import { colors, breakpoints, spacing } from "../theme/theme";
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

export class ContactTemplate extends React.Component {
    render() {
        const { contact, helmet } = this.props;
        //console.log(contact);
        return (
            <PageDetailContainer>
                {helmet || ""}
                <Row>
                    <Column>
                        <HeaderBlock
                            textAlign="left"
                            baseColor={colors.background}
                        >
                            {contact.frontmatter.title}
                        </HeaderBlock>
                    </Column>
                </Row>
                <Container>
                    <SectionLabel>Address</SectionLabel>
                    <Details>
                        <HTMLContent content={contact.frontmatter.address} />
                    </Details>
                    {contact.frontmatter.group === "RLA" && (
                        <div>
                            <SectionLabel>Lead Contact</SectionLabel>
                            <ProfileImage
                                src={getOriginalImageSrc(
                                    contact.frontmatter.contactImage
                                )}
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
            </PageDetailContainer>
        );
    }
}

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: contact } = data;
    return (
        <ContactTemplate
            helmet={<Helmet title={`Contact | ${contact.frontmatter.title}`} />}
            contact={contact}
        />
    );
};

export const pageQuery = graphql`
    query ContactByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            frontmatter {
                title
                role
                address
                tel
                email
                group
                contactImage {
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
`;
