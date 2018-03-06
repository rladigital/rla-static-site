import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import SiteNav from "./SiteNav";
import SiteNavLink from "./SiteNavLink";
import { colors } from "../theme/theme";
import logo from "../img/rla.svg";

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 12px 0;
    background: ${colors.background};
    z-index: 3;
`;

const HeaderPadding = styled.div`
    padding-top: 50px;
`;

const SiteHeader = () => (
    <div>
        <HeaderPadding />
        <HeaderContainer>
            <Row>
                <Column medium={2}>
                    <Link to="/">
                        <img src={logo} alt="RLA" style={{ width: "88px" }} />
                    </Link>
                </Column>
                <Column medium={10}>
                    <SiteNav>
                        <SiteNavLink to="/solutions">Solutions</SiteNavLink>
                        <SiteNavLink to="/work">Work</SiteNavLink>
                        <SiteNavLink to="/clients">Clients</SiteNavLink>
                        <SiteNavLink to="/people">People</SiteNavLink>
                        <SiteNavLink to="/news">News</SiteNavLink>
                        <SiteNavLink to="/contact">Contact</SiteNavLink>
                    </SiteNav>
                </Column>
            </Row>
        </HeaderContainer>
    </div>
);

export default SiteHeader;
