import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";

const Container = styled.div`
    color: ${props => props.color};
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    background: ${props => props.background};
    margin: ${props => props.margin};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
    float: right;
`;

class MainNavMenu extends React.Component {
    render() {
        return <Container {...this.props}>{this.props.children}</Container>;
    }
}

MainNavMenu.displayName = "MainNavMenu";

MainNavMenu.propTypes = {
    /** Font color - A valid css color value */
    color: PropTypes.string,
    /** Font size - A valid css size value */
    size: PropTypes.string,
    /** Font wieght - A valid css weight value */
    wieght: PropTypes.string,
    /** The css background property for the navigation container */
    background: PropTypes.string,
    /** The css margin property for the navigation container */
    margin: PropTypes.string
};

MainNavMenu.defaultProps = {
    color: colors.white,
    size: "14px",
    weight: "bold",
    background: colors.background,
    margin: `0 0 0 0`
};

export default MainNavMenu;
