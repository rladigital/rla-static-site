import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";

import HeaderBlock from "../HeaderBlock";
import ClientSummary from "./ClientSummary";
import { colors, spacing } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

const StyledButton = Button.extend`
    color: ${colors.white};
    margin-top: ${spacing.padding}em;
`;

const StyledP = styled.p`
    font-size: 14px;
    text-align: center;
    margin-bottom: 4rem;
`;

const StyledSectionContainer = SectionContainer.extend`
    &:before {
        top: -4vw;
        height: 4vw;
        width: 100%;
        content: " ";
        position: absolute;
        pointer-events: none;
        background: linear-gradient(
            to bottom,
            transparent,
            ${props => props.background}
        );
    }
`;

class ClientsSection extends React.Component {
    render() {
        const { clients } = this.props;
        return (
            <div>
                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                >
                    <Row>
                        <Column large={8} centered>
                            <HeaderBlock
                                baseColor={colors.background}
                                padding={{
                                    top: 4,
                                    right: 0,
                                    bottom: 4,
                                    left: 0
                                }}
                                fontSize={3}
                            >
                                30 Years of Delivering<br />
                                <span>
                                    Strategic, Profitable Communications
                                </span>
                            </HeaderBlock>
                            <StyledP>
                                We deliver fresh thinking and innovative ideas
                                that give our clients the edge over their
                                competitors. Our passion and drive to know your
                                business inside out and back to front enables us
                                to work alongside you and become an inseparable
                                extension of your marketing team.
                            </StyledP>
                        </Column>
                    </Row>
                </SectionContainer>
                <SectionContainer
                    color={colors.white}
                    background={colors.background}
                    padding={{
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                >
                    <Row expanded collapse>
                        {clients.slice(0, 6).map(({ node: client }, index) => {
                            return (
                                <Column medium={4} key={index} collapse>
                                    <ClientSummary
                                        client={client}
                                        height={34}
                                    />
                                </Column>
                            );
                        })}
                    </Row>
                </SectionContainer>
                <StyledSectionContainer
                    color={colors.white}
                    background={colors.background}
                >
                    <Row style={{ textAlign: "center" }}>
                        <Link to="work">
                            <StyledButton
                                hollow={true}
                                size="large"
                                color="accent"
                            >
                                See All Case Studies &rarr;
                            </StyledButton>
                        </Link>
                    </Row>
                </StyledSectionContainer>
            </div>
        );
    }
}

export default ClientsSection;
