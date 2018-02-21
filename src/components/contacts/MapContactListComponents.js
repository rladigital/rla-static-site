import React from "react";
import styled from "styled-components";
import { colors, sizes } from "../../theme/theme";

export const MapWrapper = styled.div`
    position: relative;
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
