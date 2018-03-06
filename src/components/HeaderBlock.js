import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Link from "gatsby-link";
import { colors, breakpoints } from "../theme/theme";

const HeaderBlock = styled.h1`
    text-align: ${props => props.textAlign};
    padding: ${props => props.padding.top}rem ${props => props.padding.right}rem
        ${props => props.padding.bottom}rem ${props => props.padding.left}rem;
    color: ${props => props.baseColor};
    letter-spacing: -0.1rem;
    font-weight: 900;
    line-height: 0.9;
    span {
        color: ${props => props.accentColor};
    }
    ${props =>
        props.fontSize &&
        css`
            @media (min-width: ${breakpoints.large}px) {
                font-size: ${props => props.fontSize}rem;
            }
        `};
`;

HeaderBlock.propTypes = {
    textAlign: PropTypes.string,
    baseColor: PropTypes.string,
    accentColor: PropTypes.string,
    fontSize: PropTypes.number,
    padding: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number
    })
};

HeaderBlock.defaultProps = {
    textAlign: "center",
    baseColor: colors.white,
    accentColor: colors.accent,
    padding: {
        top: 1,
        right: 0,
        bottom: 1,
        left: 0
    }
};

export default HeaderBlock;
