import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";

import HeaderBlock from "../HeaderBlock";
import ClientSummary from "./ClientSummary";
import { colors, spacing } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

const StyledButton = Button.extend`
    color: ${colors.background};
    margin-top: 4em;
`;

const StyledP = styled.p`
    font-size: 14px;
    text-align: center;
    margin-bottom: 4rem;
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
                    <Row>
                        {clients.slice(0, 6).map(({ node: client }, index) => {
                            return (
                                <Column medium={4} key={index}>
                                    <ClientSummary
                                        client={client}
                                        height={24}
                                    />
                                </Column>
                            );
                        })}
                    </Row>

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
                </SectionContainer>
            </div>
        );
    }
}

export default ClientsSection;
