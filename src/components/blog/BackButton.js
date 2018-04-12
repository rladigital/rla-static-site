import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";

import { colors, spacing } from "../../theme/theme";

const StyledRow = styled(Row)`
    @media (min-width: 1516px) {
        position: absolute;
    }
`;

const Button = styled(Link)`
    font-size: 1.2em;
    display: inline-block;
    padding: ${spacing.padding}em 0;
    color: ${colors.lightGray};
    @media (min-width: 1516px) {
        padding: 0;
    }
`;

const BackButton = ({ to }) => (
    <StyledRow expanded>
        <Column>
            <Button to={to}>
                <FAIcon icon="arrow-left" />
            </Button>
        </Column>
    </StyledRow>
);

export default BackButton;
