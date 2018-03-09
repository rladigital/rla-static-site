import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";

const MainNavLink = styled(Link).attrs({
    exact: true,
    activeClassName: "active"
})`
            display: inline-block;
            margin: ${props => props.theme.navigation.navLink.margin}rem;
            padding ${props => props.theme.navigation.navLink.padding}rem;
            ${props => props.theme.navigation.navLink.padding}rem;
            ${props => props.theme.navigation.navLink.padding / 2}rem;
            ${props => props.theme.navigation.navLink.padding}rem;
            text-decoration: none;
            color: inherit;
            text-transform: ${props =>
                props.theme.navigation.navLink.textTransform};
            &:last-child {
                padding-right: 0;
            }
            &.active{
                box-shadow: inset 0px -2px ${props =>
                    props.theme.navigation.navLink.activeColor};
            }
        `;

MainNavLink.displayName = "MainNavLink";

MainNavLink.propTypes = {};

MainNavLink.defaultProps = {};
export default MainNavLink;
