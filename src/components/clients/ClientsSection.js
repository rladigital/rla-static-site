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
    margin: 0.5rem 0 4rem;
`;

const StyledP = styled.p`
    font-size: 14px;
    text-align: center;
    margin-bottom: 1.6rem;
    color: ${colors.lightGray};
`;

const Highlight = StyledP.extend`
    font-weight: bold;
    color: ${colors.accent};
`;

class ClientsSection extends React.Component {
    render() {
        const { clients } = this.props;
        return (
            <div>
                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                    padding="1em 0 3em"
                >
                    <Row>
                        <Column large={8} centered>
                            <HeaderBlock
                                baseColor={colors.background}
                                padding={{
                                    top: 4,
                                    right: 0,
                                    bottom: 3,
                                    left: 0
                                }}
                                fontSize={3.4}
                            >
                                <span>NO</span> EXCUSES
                            </HeaderBlock>
                            <StyledP>
                                If there’s one thing we don’t have, it’s
                                excuses. We’re the leaders connecting the
                                front-line with your brand, upholding a level of
                                rare commerciality that doesn’t exist in your
                                usual agency.
                            </StyledP>
                            <StyledP>
                                We understand. We’ve got the tech. And the
                                creativity.
                            </StyledP>
                            <StyledP>
                                It’s time to unite sales with marketing to be at
                                the forefront of opportunity.
                            </StyledP>
                            <Highlight>No excuses.</Highlight>
                            <StyledP>
                                Have a look at some of our work below.{" "}
                            </StyledP>
                        </Column>
                    </Row>
                </SectionContainer>
                <Row expanded collapse>
                    {clients.slice(0, 6).map(({ node: client }, index) => {
                        return (
                            <Column medium={4} key={index} collapse>
                                <ClientSummary client={client} index={index} />
                            </Column>
                        );
                    })}
                </Row>

                <SectionContainer
                    color={colors.white}
                    background={colors.background}
                >
                    <Row style={{ textAlign: "center" }}>
                        <Link to="work">
                            <StyledButton
                                hollow={true}
                                size="large"
                                color="accent"
                                borderWidth={3}
                            >
                                VIEW OUR WORK &rarr;
                            </StyledButton>
                        </Link>
                    </Row>
                </SectionContainer>
            </div>
        );
    }
}

export default ClientsSection;
