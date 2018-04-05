import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";

import HeaderBlock from "../HeaderBlock";
import JobSummary from "./JobSummary";
import { colors, spacing } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

const StyledButton = Button.extend`
    color: ${colors.background};
    margin-top: 4em;
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
                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                >
                    <Row expanded collapse>
                        {jobs.slice(0, 6).map(({ node: job }, index) => {
                            return (
                                <Column medium={4} key={index} collapse>
                                    <JobSummary job={job} height={24} />
                                </Column>
                            );
                        })}
                    </Row>
                </SectionContainer>
            </div>
        );
    }
}

export default JobsSection;
