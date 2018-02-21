import React from "react";
import styled from "styled-components";
import { colors, sizes } from "../../theme/theme";

export const MapListContainer = styled.div`
    width: 200px;
    height: 300px;
    position: absolute;
    z-index: 2;
    background: ${colors.mediumBlueGray};
`;

export const MapListHeader = styled.h5`
    color: ${colors.lightGray};
`;

export const ContactList = styled.ul``;

export const ContactListItem = styled.li`
    background: ${props =>
        props.active ? colors.darkBlueGray : colors.mediumBlueGray};
    font-size: ${props =>
        props.fontSize === "small" ? sizes.small : sizes.default};
`;
