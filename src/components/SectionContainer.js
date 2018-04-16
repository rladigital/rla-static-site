import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../theme/theme";

const SectionContainer = styled.section`
    position: relative;
    padding: ${props => props.padding};
    background-color: ${props => props.background};
    color: ${props => props.color};
    text-align: ${props => props.textAlign};
    font-size: ${props => props.fontSize}em;
`;

SectionContainer.propTypes = {
    padding: PropTypes.string,
    background: PropTypes.string,
    color: PropTypes.string,
    textAlign: PropTypes.string,
    fontSize: PropTypes.number
};

SectionContainer.defaultProps = {
    padding: "2rem 0rem",
    background: colors.background,
    color: colors.white,
    textAlign: "left",
    fontSize: 1
};

export default SectionContainer;
