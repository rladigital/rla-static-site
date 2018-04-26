import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { Button } from "rla-components";
import HeaderBlock from "../../HeaderBlock";
import SectionContainer from "../../SectionContainer";
import { colors, spacing } from "../../../theme/theme";

const StyledP = styled.p`
    margin: 2rem 0;
`;

const PeoplePlaceholder = ({ height }) => (
    <SectionContainer
        color={colors.white}
        background={colors.accent}
        padding={`${spacing.padding}rem `}
        fontSize={1}
        style={{ height: `${height}rem`, marginBottom: `${spacing.margin}em` }}
    >
        <HeaderBlock
            textAlign="left"
            accentColor={colors.background}
            baseColor={colors.white}
            fontSize={3.1}
            padding={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            <span>People</span> at our Core
        </HeaderBlock>
        <StyledP>
            We deliver fresh thinking and innovative ideas that give our clients
            the edge over their competitors. Our passion and drive to know your
            business inside out and back to front enables us to work alongside
            you and become an inseparable extension of your marketing team.
        </StyledP>
        <Link to="/people">
            <Button
                hollow
                size="large"
                color="white"
                borderWidth={3}
                padding={2}
            >
                Check Us Out →
            </Button>
        </Link>
    </SectionContainer>
);

export default PeoplePlaceholder;
