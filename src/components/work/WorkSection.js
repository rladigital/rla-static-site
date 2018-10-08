import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled, { css } from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

import HeaderBlock from "../HeaderBlock";
import WorkSummary from "./WorkSummary";
import { colors, spacing, breakpoints } from "../../theme/theme";
import SectionContainer from "../SectionContainer";
import { height } from "window-size";

const StyledButton = Button.extend`
    color: ${colors.white};
    margin: 0.5rem 0 4rem;
    letter-spacing: 0.1rem;
`;

const StyledP = styled.p`
    text-align: center;
    margin-bottom: 1.6rem;
    color: ${colors.lightGray};
`;

const heightMediaQuery = `
    @media (min-width: ${breakpoints.medium}px) {
        height: 33.33vw;
    }
`;

class WorkSection extends React.Component {
    render() {
        const { work } = this.props;
        return (
            <div>
                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                    padding="5em 0 6em">
                    <Row>
                        <Column large={7} centered>
                            <HeaderBlock
                                baseColor={colors.background}
                                padding={{
                                    top: 6,
                                    right: 0,
                                    bottom: 3,
                                    left: 0
                                }}
                                fontSize={3.4}>
                                THE <span>BIGGER PICTURE</span>
                            </HeaderBlock>
                            <StyledP>
                                We’re about building connections. It’s what we
                                do. Whether it’s connecting creative thinking to
                                commercial strategy, connecting brand awareness
                                to customer engagement or ultimately helping
                                your business connect better with it's customers
                                – we’re here to help. It’s not about just
                                answering your individual briefs, it’s about
                                connecting the dots and taking a look at the
                                bigger picture.
                            </StyledP>
                        </Column>
                    </Row>
                </SectionContainer>
                <SectionContainer
                    color={colors.background}
                    background={colors.background}
                    padding="0">
                    <Row expanded collapse>
                        {work.slice(0, 6).map(({ node: work }, index) => {
                            return (
                                <Column medium={4} key={index} collapse>
                                    <WorkSummary
                                        heightMediaQuery={heightMediaQuery}
                                        work={work}
                                        index={index}
                                    />
                                </Column>
                            );
                        })}
                    </Row>
                </SectionContainer>
                <SectionContainer
                    color={colors.white}
                    background={colors.background}>
                    <Row style={{ textAlign: "center" }}>
                        <Link to="work">
                            <StyledButton
                                hollow={true}
                                size="large"
                                color="accent"
                                borderWidth={3}
                                padding={2}>
                                VIEW OUR WORK &rarr;
                            </StyledButton>
                        </Link>
                    </Row>
                </SectionContainer>
            </div>
        );
    }
}

export default WorkSection;
