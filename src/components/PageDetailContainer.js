import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../theme/theme";

const PageDetailContainer = styled.section`
    position: relative;
    margin-top: 80px;
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
