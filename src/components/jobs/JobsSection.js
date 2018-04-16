import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";

import HeaderBlock from "../HeaderBlock";
import SectionContainer from "../SectionContainer";
import JobSummary from "./JobSummary";
import { colors, spacing } from "../../theme/theme";

const StyledButton = Button.extend`
    color: ${colors.background};
    margin-top: 0em;
`;

const StyledP = styled.p`
    font-size: 14px;
    text-align: center;
    margin-bottom: 6rem;
`;

class JobsSection extends React.Component {
    render() {
        const { jobs } = this.props;
        return (
            <div>
                <Row>
                    <Column medium={9}>
                        <JobSummary job={jobs[0].node} height={36} centred />
                        <JobSummary job={jobs[2].node} height={18} />
                    </Column>
                    <Column medium={3}>
                        <JobSummary job={jobs[1].node} height={18} />
                        <PeoplePlaceholder height={36} />
                    </Column>
                </Row>
            </div>
        );
    }
}

const PeoplePlaceholder = ({ height }) => (
    <SectionContainer
        color={colors.white}
        background={colors.accent}
        padding={`${spacing.padding}rem `}
        fontSize={1}
        style={{ height: `${height}rem` }}
    >
        <HeaderBlock
            textAlign="left"
            accentColor={colors.background}
            baseColor={colors.white}
            fontSize={2.6}
            padding={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            <span>People</span> at our Core
        </HeaderBlock>
        <p>
            We deliver fresh thinking and innovative ideas that give our clients
            the edge over their competitors. Our passion and drive to know your
            business inside out and back to front enables us to work alongside
            you and become an inseparable extension of your marketing team.
        </p>
        <Button hollow size="large" color="white" borderWidth={2}>
            Check Us Out →
        </Button>
    </SectionContainer>
);

export default JobsSection;
