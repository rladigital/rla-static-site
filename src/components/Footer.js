import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";
import { HTMLContent } from "../components/Content";

import { colors, spacing } from "../theme/theme";
import logo from "../img/rla.svg";
import SectionContainer from "./SectionContainer";

const StyledLink = styled(Link)`
    display: block;
    text-transform: uppercase;
    color: ${colors.white};
    margin-bottom: ${spacing.padding}rem;
    font-size: 0.8rem;
    font-weight: 700;
`;

const SocialIcon = styled(Link)`
    width: 36px;
    margin-left: ${spacing.padding}rem;
`;

const ContactDetail = styled.li`
    padding-bottom: ${spacing.padding}rem;
    a {
        font-weight: normal;
        color: ${colors.lightGray};
        font-size: 0.8em;
        line-height: 1.5;
    }
`;

export default ({
    data: { allMarkdownRemark: { edges: contacts } },
    items
}) => (
    <SectionContainer>
        <Row>
            <Column large={2}>
                <img src={logo} alt="RLA" style={{ width: "120px" }} />
            </Column>
            <Column large={2}>
                {items.map((item, index) => {
                    return (
                        <StyledLink key={index} to={item.to}>
                            {item.text}
                        </StyledLink>
                    );
                })}
            </Column>

            {contacts
                .sort((a, b) => {
                    var nameA = a.node.frontmatter.title.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.node.frontmatter.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }

                    // names must be equal
                    return 0;
                })
                .map(({ node: contact }, index) => {
                    return (
                        <Column large={3} key={index}>
                            <Location
                                to={contact.fields.slug}
                                address={contact.frontmatter.address}
                                phone={contact.frontmatter.tel}
                                email={contact.frontmatter.email}
                            >
                                {contact.frontmatter.title}
                            </Location>
                        </Column>
                    );
                })}

            <Column large={2} style={{ textAlign: "right" }}>
                <Social icon="facebook-f" to="/contact" />
                <Social icon="linkedin-in" to="/contact" />
                <Social icon="twitter" to="/contact" />
            </Column>
        </Row>
    </SectionContainer>
);

const Location = ({ to, children, address, phone, email }) => (
    <div>
        <StyledLink to={to}>{children}</StyledLink>

        <ul className="fa-ul">
            {address && (
                <ContactDetail>
                    <FAIcon icon="map-marker-alt" listItem />
                    <a>
                        <HTMLContent content={address} />
                    </a>
                </ContactDetail>
            )}
            {phone && (
                <ContactDetail>
                    <FAIcon icon="phone" flip="horizontal" listItem />
                    <a href={`tel:${phone}`}>{phone}</a>
                </ContactDetail>
            )}
            {email && (
                <ContactDetail>
                    <FAIcon icon="envelope" listItem />
                    <a href={`mailto:${email}`}>{email}</a>
                </ContactDetail>
            )}
        </ul>
    </div>
);

const Social = ({ icon, to }) => (
    <SocialIcon className="fa-layers fa-fw" to={to}>
        <FAIcon color={colors.white} icon={["fab", icon]} transform="grow-2" />
        <FAIcon
            color={colors.accent}
            icon={["far", "circle"]}
            transform="grow-22"
        />
    </SocialIcon>
);
