import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "gatsby-link";
import { colors } from "../theme/theme";

const HeaderBlock = styled.h1`
    text-align: ${props => props.textAlign};
    padding: ${props => props.padding}rem;
    color: ${props => props.baseColor};
    font-size: ${props => props.fontSize}rem;
    font-weight: bold;
    span {
        color: ${props => props.accentColor};
    }
`;

HeaderBlock.propTypes = {
    textAlign: PropTypes.string,
    baseColor: PropTypes.string,
    accentColor: PropTypes.string,
    fontSize: PropTypes.number,
    padding: PropTypes.string
};

HeaderBlock.defaultProps = {
    textAlign: "center",
    baseColor: colors.white,
    accentColor: colors.primary,
    fontSize: 5,
    padding: 1
};

export default HeaderBlock;
