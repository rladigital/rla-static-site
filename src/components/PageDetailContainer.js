import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors, spacing } from "../theme/theme";

const PageDetailContainer = styled.section`
    position: relative;
    margin-top: 88px;
    padding-top: ${spacing.padding}em;
    padding-bottom: ${spacing.padding}em;
    background-color: ${props => props.background};
    color: ${props => props.color};
`;

PageDetailContainer.propTypes = {
    background: PropTypes.string,
    color: PropTypes.string
};

PageDetailContainer.defaultProps = {
    background: colors.white,
    color: colors.background
};

export default PageDetailContainer;
