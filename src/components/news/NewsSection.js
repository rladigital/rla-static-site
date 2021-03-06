import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

import HeaderBlock from "../HeaderBlock";
import NewsSummary from "./NewsSummary";
import { colors, breakpoints } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

const HeaderContainer = styled.div`
    width: 100%;
    text-align: center;
    @media (min-width: ${breakpoints.xlarge}px) {
        text-align: left;
        position: absolute;
    }
`;

class NewsSection extends React.Component {
    render() {
        const { width, news } = this.props;
        return (
            <SectionContainer
                color={colors.background}
                background={colors.white}
                padding="0"
            >
                <HeaderContainer>
                    <Row>
                        <Column xlarge={6} collapse>
                            <HeaderBlock
                                baseColor={colors.background}
                                fontSize={5}
                                textAlign="inherit"
                                padding={{
                                    top: 4,
                                    right: 0,
                                    bottom: 1,
                                    left: 0
                                }}
                            >
                                News &amp;{width > breakpoints.xlarge && <br />}{" "}
                                Insights
                            </HeaderBlock>
                            <Link to="news">
                                <Button
                                    hollow={true}
                                    size="large"
                                    color="background"
                                    borderWidth={3}
                                    padding={2}
                                >
                                    See All News &rarr;
                                </Button>
                            </Link>
                        </Column>
                    </Row>
                </HeaderContainer>
                <Row expanded collapse>
                    <Column xlarge={6} collapse>
                        &nbsp;
                    </Column>
                    <Column medium={6} collapse>
                        <ScrollAnimation
                            animateIn="fadeIn"
                            delay={0}
                            animateOnce={true}
                        >
                            <NewsSummary story={news[0].node} />
                        </ScrollAnimation>
                    </Column>
                    {news[1] && (
                        <Column medium={6} collapse>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={250}
                                animateOnce={true}
                            >
                                <NewsSummary story={news[1].node} />
                            </ScrollAnimation>
                        </Column>
                    )}
                    {news[2] &&
                        (!news[3] ? (
                            <Column medium={6} collapse>
                                <ScrollAnimation
                                    animateIn="fadeIn"
                                    delay={500}
                                    animateOnce={true}
                                >
                                    <NewsSummary story={news[2].node} />
                                </ScrollAnimation>
                            </Column>
                        ) : (
                            [
                                <Column medium={6} xlarge={3} collapse>
                                    <ScrollAnimation
                                        animateIn="fadeIn"
                                        delay={500}
                                        animateOnce={true}
                                    >
                                        <NewsSummary story={news[2].node} />
                                    </ScrollAnimation>
                                </Column>,
                                <Column medium={6} xlarge={3} collapse>
                                    <ScrollAnimation
                                        animateIn="fadeIn"
                                        delay={750}
                                        animateOnce={true}
                                    >
                                        <NewsSummary story={news[3].node} />
                                    </ScrollAnimation>
                                </Column>
                            ]
                        ))}
                </Row>
            </SectionContainer>
        );
    }
}

export default NewsSection;
