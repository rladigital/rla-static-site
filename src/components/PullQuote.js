import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors, breakpoints } from "../theme/theme";

const PullQuote = styled.blockquote`
    position: relative;
    background-color: ${props => props.background};
    color: ${props => props.color};
    font-size: ${props => props.fontSize / 1.5}rem;
    padding-bottom: ${props => props.padding}rem;
    font-family: "Adobe Caslon Pro";
    line-height: 1.2;
    @media (min-width: ${breakpoints.large}px) {
        font-size: ${props => props.fontSize}rem;
        padding-bottom: ${props => props.padding}rem;
    }
    p {
        line-height: 1.2;
    }
`;

PullQuote.propTypes = {
    background: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.number
};

PullQuote.defaultProps = {
    background: colors.white,
    color: colors.background,
    fontSize: 2
};

export default PullQuote;
