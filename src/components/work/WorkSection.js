import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

import HeaderBlock from "../HeaderBlock";
import WorkSummary from "./WorkSummary";
import { colors, spacing } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

const StyledButton = Button.extend`
    color: ${colors.white};
    margin: 0.5rem 0 4rem;
`;

const StyledP = styled.p`
    text-align: center;
    margin-bottom: 1.6rem;
    color: ${colors.lightGray};
`;

class WorkSection extends React.Component {
    render() {
        const { work } = this.props;
        return (
            <div>
                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                    padding="1em 0 3em"
                >
                    <Row>
                        <Column large={7} centered>
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
                                We have a lot to offer at RLA, but if there’s
                                one thing we don’t have - it’s excuses. We’re
                                world-leaders in connecting the front-line with
                                your brand, offering a rare level of
                                commerciality that doesn’t exist in your usual
                                agency.
                            </StyledP>
                            <StyledP>
                                We strive to understand our clients’ needs
                                fully, and we’ve got the tech and creativity to
                                match.
                            </StyledP>
                            <StyledP>
                                It’s time to unite sales with marketing, and
                                stay at the forefront of opportunity - no
                                excuses.
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
