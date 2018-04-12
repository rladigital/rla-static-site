import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../theme/theme";

const PullQuote = styled.blockquote`
    position: relative;
    background-color: ${props => props.background};
    color: ${props => props.color};
    font-size: ${props => props.fontSize}rem;
    padding: ${props => props.padding};
    font-family: "Adobe Caslon Pro";
    line-height: 1.3;
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
