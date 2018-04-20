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
                    padding="1em 0 6em"
                >
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
                                fontSize={3.4}
                            >
                                WORKING <span>TOGETHER</span>
                            </HeaderBlock>
                            <StyledP>
                                We’re all about building connections. It’s all
                                very well having great individual components
                                within your marketing strategy, but unless they
                                are properly coordinated, integrated and working
                                efficiently together then by definition you
                                won’t be operating at your maximum potential.
                                Our ambition is to connect creative thinking to
                                commercial strategy and ultimately to help you
                                connect better with your customers. We won’t
                                just answer your briefs, we’ll look at your
                                whole business holistically.
                            </StyledP>
                        </Column>
                    </Row>
                </SectionContainer>
                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                    padding="0"
                >
                    <Row expanded collapse>
                        {work.slice(0, 6).map(({ node: work }, index) => {
                            return (
                                <Column medium={4} key={index} collapse>
                                    <ScrollAnimation
                                        animateIn="fadeIn"
                                        delay={250 * index}
                                        animateOnce={true}
                                    >
                                        <WorkSummary
                                            heightMediaQuery={heightMediaQuery}
                                            work={work}
                                            index={index}
                                        />
                                    </ScrollAnimation>
                                </Column>
                            );
                        })}
                    </Row>
                </SectionContainer>
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

export default WorkSection;
