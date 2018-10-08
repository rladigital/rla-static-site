import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../../theme/theme";
import FAIcon from "@fortawesome/react-fontawesome";
import Link from "gatsby-link";

const Circle = styled.a`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    color: ${props => props.color};
    border: ${props => props.borderWidth}px solid ${props => props.borderColor};
    font-size: ${props => props.size}px;
    line-height: ${props => props.size}px;
    border-radius: ${props => props.size}px;
    text-align: center;
    display: inline-block;
    margin: ${props => props.margin};
    position: relative;
`;

const Icon = ({ icon, transform, ...rest }) => {
    return (
        <Circle {...rest} target="_blank">
            <FAIcon icon={icon} transform={transform} />
        </Circle>
    );
};

export const Social = ({ icon, transform, ...rest }) => {
    return (
        <Circle {...rest} target="_blank">
            <FAIcon icon={["fab", icon]} transform={transform} />
        </Circle>
    );
};

Icon.defaultProps = {
    size: 20,
    color: "#ffffff",
    borderColor: "#ffffff",
    borderWidth: 1,
    transform: "shrink-8 up-1"
};

Social.defaultProps = Icon.defaultProps;

export default Icon;
