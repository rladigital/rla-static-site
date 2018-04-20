import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";

import { colors, spacing } from "../../theme/theme";

const StyledRow = styled(Row)`
    @media (min-width: 1516px) {
        position: absolute;
    }
`;

const Button = styled.a.attrs({
    role: "button"
})`
    font-size: 1.2em;
    display: inline-block;
    padding: ${spacing.padding}em 0;
    color: ${colors.lightGray};
    @media (min-width: 1516px) {
        padding: 0;
    }
`;

const BackButton = ({ goBack }) => (
    <StyledRow expanded>
        <Column>
            <Button onClick={goBack}>
                {console.log(goBack)}
                <FAIcon icon="arrow-left" />
            </Button>
        </Column>
    </StyledRow>
);

export default BackButton;
