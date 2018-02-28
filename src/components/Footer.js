import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";

import { colors, spacing } from "../theme/theme";
import logo from "../img/rla.svg";
import SectionContainer from "./SectionContainer";

const StyledLink = styled(Link)`
    display: block;
    text-transform: uppercase;
    color: ${colors.white};
    margin-bottom: ${spacing.padding}rem;
`;

const Layers = styled(Link)`
    width: 36px;
`;

const Footer = () => (
    <SectionContainer>
        <Row>
            <Column large={2}>
                <img src={logo} alt="RLA" style={{ width: "120px" }} />
            </Column>
            <Column large={2}>
                <StyledLink to="/solutions">Solutions</StyledLink>
                <StyledLink to="/work">Work</StyledLink>
                <StyledLink to="/clients">Clients</StyledLink>
                <StyledLink to="/people">People</StyledLink>
                <StyledLink to="/news">News</StyledLink>
                <StyledLink to="/contact">Contact</StyledLink>
            </Column>
            <Column large={3}>
                <Location to="/contact">Bournemouth</Location>
            </Column>
            <Column large={3}>
                <Location to="/contact">London</Location>
            </Column>
            <Column large={2} style={{ textAlign: "right" }}>
                <Social icon="facebook-f" to="/contact" />{" "}
                <Social icon="linkedin-in" to="/contact" />{" "}
                <Social icon="twitter" to="/contact" />
            </Column>
        </Row>
    </SectionContainer>
);

const Location = ({ to, children }) => (
    <div>
        <StyledLink to={to}>{children}</StyledLink>

        <ul className="fa-ul">
            <li>
                <FAIcon icon="map-marker-alt" listItem />List icons
            </li>
            <li>
                <FAIcon icon="phone" flip="horizontal" listItem />can be used
            </li>
            <li>
                <FAIcon icon="envelope" listItem />as bullets
            </li>
        </ul>
    </div>
);

const Social = ({ icon, to }) => (
    <Layers className="fa-layers fa-fw" to={to}>
        <FAIcon color={colors.white} icon={["fab", icon]} transform="grow-2" />
        <FAIcon
            color={colors.accent}
            icon={["far", "circle"]}
            transform="grow-22"
        />
    </Layers>
);

export default Footer;
