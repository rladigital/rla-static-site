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
import Social from "../components/blog/Social";

const StyledLink = styled(Link)`
    display: block;
    text-transform: uppercase;
    color: ${colors.white};
    margin-bottom: ${spacing.padding}rem;
    font-size: 16px;
    font-weight: 700;
`;

const ContactDetail = styled.li`
    font-size: 16px;
    padding-bottom: 1rem;
    position: relative;
    a {
        font-weight: normal;
        color: ${colors.lightGray};
        font-size: 14px;
        line-height: 1.5;
    }
`;

const Copyright = styled.div`
    padding: 14px;
    margin-top: 2em;
    font-size: 14px;
    text-align: center;
    background-color: #16263b;
    color: ${colors.lightGray};
`;

const FaUl = styled.ul`
    list-style-type: none;
    margin-left: 1.4em;
    padding-left: 0;
`;

export default ({
    data: { allMarkdownRemark: { edges: contacts } },
    items
}) => (
    <SectionContainer padding="5em 0 0">
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

            {contacts.map(({ node: contact }, index) => {
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
                <SocialIcon
                    icon="facebook-f"
                    href="https://www.facebook.com/rlagroup/"
                    target="_blank"
                />
                <SocialIcon
                    icon="linkedin-in"
                    href="https://www.linkedin.com/company/rla-group"
                    target="_blank"
                />
                <SocialIcon
                    icon="twitter"
                    href="https://twitter.com/rlagroup"
                    target="_blank"
                />
            </Column>
        </Row>
        <Copyright>
            <Row>
                <Column>
                    Copyright RLA Group Ltd. |{" "}
                    <Link to="/cookie-policy">Cookie Policy</Link> |{" "}
                    <a className="optanon-show-settings">Cookie Settings</a>
                </Column>
            </Row>
        </Copyright>
    </SectionContainer>
);

const Location = ({ to, children, address, phone, email }) => (
    <div>
        <StyledLink to={to}>{children}</StyledLink>

        <FaUl>
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
        </FaUl>
    </div>
);

const SocialIcon = ({ ...rest }) => (
    <Social
        size={35}
        borderColor={colors.accent}
        color={colors.white}
        margin="0 0 1rem 0.5rem"
        transform="shrink-8 up-0.5"
        {...rest}
    />
);
