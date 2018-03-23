import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import Carousel from "nuka-carousel";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import theme, { colors } from "../theme/theme";
import ClientSummary from "../components/clients/ClientSummary";
import HeaderBlock from "../components/HeaderBlock";

const rotate360 = keyframes`
  from {
    opacity: 0;
    top: -20px;
  }

  to {
    opacity: 1;
    top: 0;
  }
`;

const Brand = styled.div`
    transition opacity 0.5s ease;
`;

const Container = styled.div`
    padding-left: 2rem;
    overflow: hidden;
`;

const LogoContainer = styled.div`
    background: ${colors.secondary};
    padding: 4vw 3vw;
    cursor: pointer;
`;

const Logo = styled.div`
    width: 100%;
    height: 10vw;
    min-height: 200px;
    max-height: 400px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const Line = styled.div`
    background-color: ${colors.white};
    transition: all 0.5s ease;
`;

const Solution = styled.div`
    height: 56px;
    margin-left: 4rem;
    border-left: 1px solid ${colors.white};
    position: relative;
    animation: ${rotate360} 0.5s linear;
    animation-fill-mode: forwards;

    opacity: 0;
    top: -50px;
`;

const SolutionDot = styled.div`
    width: 24px;
    height: 24px;
    bottom: 0px;
    left: -12px;
    position: absolute;
    border-radius: 50px;
    background: linear-gradient(to bottom, #3eb2de, #2c7cdb);
    z-index: 1;
    &:after {
        width: 24px;
        height: 24px;
        position: absolute;
        border-radius: 50px;
        box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.2);
        padding: 6px;
        left: -6px;
        top: -6px;
        content: " ";
    }
`;

const SolutionText = styled.div`
    font-size: 0.9rem;
    font-weight: 700;
    position: absolute;
    text-transform: uppercase;
    bottom: 5px;
    left: 30px;
`;

export default class ClientsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentSlide: 0 };
    }
    setSlide(x) {
        this.setState({ currentSlide: x });
    }
    render() {
        const {
            data: { allMarkdownRemark: { edges: clients } },
            transition
        } = this.props;
        console.log(clients);

        const settings = {
            slideWidth: 0.3,
            cellAlign: "center",
            dots: false,
            slideIndex: this.state.currentSlide,
            renderCenterRightControls: ({ nextSlide }) => null,
            renderCenterLeftControls: ({ previousSlide }) => null,
            renderBottomCenterControls: ({ currentSlide }) => null
        };

        const solutions = [
            "Brand Desire",
            "Customer Loyalty",
            "Sales Performance"
        ];

        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            <span>Brands</span> we work with
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row expanded collapse>
                    <Carousel {...settings}>
                        {clients.map(({ node: client }, index) => {
                            const isCurrent = Boolean(
                                this.state.currentSlide == index
                            );
                            return (
                                // <ClientSummary client={client} />
                                <Brand
                                    key={index}
                                    style={{ opacity: isCurrent ? 1 : 0.1 }}
                                >
                                    <Container>
                                        <LogoContainer
                                            onClick={() => this.setSlide(index)}
                                        >
                                            <Logo
                                                style={{
                                                    backgroundImage: `url('${
                                                        client.frontmatter.logo
                                                    }')`
                                                }}
                                            />
                                        </LogoContainer>
                                    </Container>
                                    <Container
                                        style={{
                                            paddingLeft:
                                                isCurrent || index == 0
                                                    ? "2rem"
                                                    : 0,

                                            marginRight:
                                                !isCurrent &&
                                                index ==
                                                    this.state.currentSlide - 1
                                                    ? "-2rem"
                                                    : 0
                                        }}
                                    >
                                        <Line
                                            style={{
                                                marginTop: isCurrent ? 30 : 34,
                                                height: isCurrent ? 8 : 1
                                            }}
                                        />
                                    </Container>
                                    <Container style={{ height: 300 }}>
                                        {isCurrent &&
                                            solutions.map((solution, index) => {
                                                return (
                                                    <Solution
                                                        style={{
                                                            animationDelay: `${0.2 *
                                                                index}s`,
                                                            zIndex: 1 - index
                                                        }}
                                                    >
                                                        <SolutionDot />
                                                        <SolutionText>
                                                            {solution}
                                                        </SolutionText>
                                                    </Solution>
                                                );
                                            })}
                                    </Container>
                                </Brand>
                            );
                        })}
                    </Carousel>
                </Row>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query clientsQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "clients" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    html
                    id
                    frontmatter {
                        title
                        templateKey
                        logo
                    }
                }
            }
        }
    }
`;
