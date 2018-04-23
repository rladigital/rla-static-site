import React from "react";
import styled from "styled-components";
import { colors, sizes, spacing } from "../../theme/theme";

export const MapWrapper = styled.div`
    position: relative;
`;

export const MapListHeader = styled.h5`
    padding-top: ${spacing.padding}em;
    margin: 0 0 0.5em ${spacing.padding}em;
    color: ${colors.lightGray};
`;

export const ContactList = styled.ul``;

export const ContactListItem = styled.li`
    padding: 0.8em ${spacing.padding}em;
    background: ${props =>
        props.active ? colors.darkBlueGray : colors.mediumBlueGray};
    // font-size: ${props => (props.fontSize === "small" ? 0.8 : 1.2)}em;
    cursor: pointer;
    &:hover {
        background: ${colors.darkBlueGray};
    }
`;
