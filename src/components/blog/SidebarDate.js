import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { colors } from "../../theme/theme";
import { dateFormat } from "../../helpers/helpers";

const SidebarDateContainer = styled.blockquote`
    position: relative;
    padding: 5rem 0 2rem;
    background-color: ${props => props.background};
    color: ${props => props.color};
    font-size: ${props => props.fontSize}rem;
    line-height: 1.3;
    text-transform: uppercase;
    display: inline-block;
`;

const SidebarDate = ({ date, prefix, ...rest }) => {
    console.log(date);
    return (
        <SidebarDateContainer {...rest}>
            {prefix} {dateFormat(date)}
        </SidebarDateContainer>
    );
};

SidebarDate.propTypes = {
    date: PropTypes.string.isRequired,
    background: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

SidebarDate.defaultProps = {
    background: colors.white,
    color: colors.accent,
    fontSize: 1,
    prefix: <span>&mdash;</span>
};

export default SidebarDate;
