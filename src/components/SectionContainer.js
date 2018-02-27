import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../theme/theme";

const SectionContainer = styled.section`
    position: relative;
    padding: ${props => props.padding};
    background-color: ${props => props.background};
    color: ${props => props.color};
`;

SectionContainer.propTypes = {
    padding: PropTypes.string,
    background: PropTypes.string,
    color: PropTypes.string
};

SectionContainer.defaultProps = {
    padding: "2rem 0rem",
    background: colors.background,
    color: colors.white
};

export default SectionContainer;
