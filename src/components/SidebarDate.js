import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import format from "date-fns/format";
import { colors } from "../theme/theme";

const SidebarDateContainer = styled.blockquote`
    position: relative;
    padding: 0 2rem 1.4rem 2rem;
    background-color: ${props => props.background};
    color: ${props => props.color};
    font-size: ${props => props.fontSize}rem;
    line-height: 1.3;
    text-transform: uppercase;
`;

const SidebarDate = ({ date, prefix, ...rest }) => {
    return (
        <SidebarDateContainer {...rest}>
            {prefix} {format(date, "DD MMM YYYY")}
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
