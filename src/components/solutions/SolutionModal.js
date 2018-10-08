import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import graphql from "graphql";
import styled from "styled-components";
import { Row, Column, Button } from "rla-components";
import { colors, breakpoints } from "../../theme/theme";
import ContentMarkdown, { HTMLContent } from "../Content";
import { scale, random, isBrowser, isMobile } from "../../helpers/helpers";
import { Scrollbars } from "react-custom-scrollbars";

import FAIcon from "@fortawesome/react-fontawesome";

const modalRoot = isBrowser() ? document.getElementById("modal-root") : null;

const Container = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999999;
    background: ${colors.background};
    transition: all 1s ease;
`;

const Svg = styled.svg`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    display: none;
    @media (min-width: ${breakpoints.medium}px) {
        display: block;
    }
`;

const ContentWrapper = styled.div`
    height: 100%;
    @media (min-width: ${breakpoints.medium}px) {
        position: absolute;
        padding: 10vw 0 0;
        transition: all 1s ease;
        transform: translate(-50%, -50%);
    }
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    font-size: 2vw;
    //display: table;

    @media (min-width: ${breakpoints.large}px) {
        font-size: 2vw;
    }
    @media (min-width: ${breakpoints.xlarge}px) {
        font-size: 1.4vw;
        // padding: 2vw 10vw 0 2vw;
    }
`;

const ContentRow = styled.div`
    //display: table-row;
`;

const H1 = styled.h1`
    font-weight: 900;
    font-size: 8vw;
    @media (min-width: ${breakpoints.medium}px) {
        padding-bottom: 1.3rem;
        font-size: 8vw;
    }
    @media (min-width: ${breakpoints.large}px) {
        font-size: 5vw;
    }
`;

const H2 = styled.h2`
    font-size: 1rem;
    letter-spacing: 0.1rem;
    @media (min-width: ${breakpoints.large}px) {
        padding-bottom: 1.3rem;
        font-weight: 700;
        font-size: 1rem;
    }
`;

const Circle = styled.circle`
    transition: all 1s cubic-bezier(0.76, -0.46, 0.2, 1.38), fill 1s ease;
`;

const BackButton = styled.a`
    top: 0;
    left: 0;
    padding: 2em 1em;
    z-index: 999;
    color: ${colors.white};
    font-size: 1em;
    cursor: pointer;
    letter-spacing: 2px;
    display: block;
    @media (min-width: ${breakpoints.medium}px) {
        position: absolute;
        padding: 2em;
        text-shadow: 1px 2px 11px ${colors.background};
    }
`;

const ContentContainer = styled.div`
    font-size: 1rem;
    padding: 0 2vw 0 0;
    p {
        line-height: 1.5;
        margin: 0 0 1.5rem 0;
    }
    a {
        font-weight: bold;
        color: #fff;
        text-decoration: underline;
    }
    @media (min-width: ${breakpoints.medium}px) {
        p {
            line-height: 1.8;
        }
    }
`;

const ButtonContainer = ContentContainer.extend`
    padding-bottom: 0 !important;
`;

const StyledButton = styled(Button)`
    letter-spacing: 2px;
`;

class SolutionModal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
        this.state = {
            current: this.props.solution,
            animation: 0
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        if (isBrowser()) {
            modalRoot.appendChild(this.el);
        }

        if (this.props.setScrollable) {
            this.props.setScrollable(false);
        }

        setTimeout(() => {
            this.setState({
                animation: 1
            });
        }, 25);

        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        if (isBrowser()) {
            modalRoot.removeChild(this.el);
        }

        if (this.props.setScrollable) {
            this.props.setScrollable(true);
        }

        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e) {
        const { current } = this.state;
        const { solutions } = this.props;
        const prevSolution =
            current - 1 < 0 ? solutions.length - 1 : current - 1;
        const nextSolution = current + 1 >= solutions.length ? 0 : current + 1;

        if (e.key == "ArrowLeft") {
            this.handleClick(prevSolution);
        }
        if (e.key == "ArrowRight") {
            this.handleClick(nextSolution);
        }
    }

    handleClose(cb) {
        this.setState({
            animation: 0
        });
        setTimeout(() => {
            cb();
        }, 1000);
    }

    handleClick(x) {
        this.setState({ current: x });
    }

    calculateHeight(windowHeight, showButtons) {
        //console.log("window Height", windowHeight);
        const windowHeightDivisor = showButtons ? 4 : 6;
        if (windowHeight < 500) {
            return windowHeight;
        }
        return windowHeight - windowHeight / windowHeightDivisor;
    }

    calculateTopOffset(windowHeight, showButtons) {
        if (windowHeight < 500) {
            return windowHeight / 4;
        }
        return showButtons ? windowHeight / 2.6 : windowHeight / 1.9;
    }

    render() {
        //console.log(this.props);
        const { animation, current } = this.state;
        const { solutions, width, height, close, showButtons } = this.props;
        const isLarge = Boolean(width > breakpoints.xlarge);
        const w = width - width / 4;
        const h = this.calculateHeight(height, showButtons);
        //console.log(h);

        const currentSolution = solutions[current].node;
        const prevSolution =
            current - 1 < 0 ? solutions.length - 1 : current - 1;
        const nextSolution = current + 1 >= solutions.length ? 0 : current + 1;
        //console.log("prevSolution", prevSolution, "nextSolution", nextSolution);
        const circleProps = {
            cx: isLarge ? width / 2 + 100 : width / 2,
            cy: height / 2,
            r: Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2,
            fill: currentSolution.frontmatter.color2,
            transform: `translate(${width * (1 - animation)} 0)`
        };

        //console.log("Current Solution", currentSolution);

        return ReactDOM.createPortal(
            <Container
                id="container"
                style={{ opacity: animation }}
                onClick={() => this.handleClose(close)}
                style={{
                    background:
                        isMobile() && currentSolution.frontmatter.color2,
                    opacity: animation,
                    transitionDelay: animation ? "0.5s" : "0s"
                }}
            >
                <BackButton
                    role="button"
                    onClick={() => this.handleClose(close)}
                >
                    <FAIcon icon="chevron-left" /> BACK
                </BackButton>
                <Svg>
                    <Circle {...circleProps} />
                </Svg>
                <ContentWrapper
                    style={{
                        width: !isMobile() && w,
                        height: isMobile()
                            ? height - 81
                            : (width < 500 ? h / 1.3 : h / 1.1) - 50,
                        top: this.calculateTopOffset(height, showButtons),
                        left: circleProps.cx,
                        opacity: animation,
                        transitionDelay: animation ? "0.5s" : "0s"
                    }}
                >
                    <Content onClick={e => e.stopPropagation()}>
                        <Scrollbars style={{ height: "100%" }} autoHide>
                            <ContentRow>
                                <Row expanded>
                                    <Column>
                                        <H1>
                                            {currentSolution.frontmatter.title}
                                        </H1>
                                        <H2>
                                            {currentSolution.frontmatter.intro}
                                        </H2>
                                    </Column>
                                </Row>
                            </ContentRow>
                            <ContentRow>
                                <Row expanded>
                                    <Column xlarge={5}>
                                        <ContentContainer>
                                            <ContentMarkdown
                                                content={
                                                    currentSolution.frontmatter
                                                        .description1
                                                }
                                            />
                                        </ContentContainer>
                                    </Column>
                                    <Column xlarge={5}>
                                        <ContentContainer>
                                            <ContentMarkdown
                                                content={
                                                    currentSolution.frontmatter
                                                        .description2
                                                }
                                            />
                                        </ContentContainer>
                                    </Column>
                                </Row>
                            </ContentRow>
                        </Scrollbars>
                        {this.props.showButtons &&
                            width > 500 && (
                                <ContentRow>
                                    <Row expanded>
                                        <Column xlarge={5}>
                                            <ButtonContainer>
                                                <StyledButton
                                                    size="large"
                                                    color="white"
                                                    hollow
                                                    borderWidth={2}
                                                    onClick={() =>
                                                        this.handleClick(
                                                            prevSolution
                                                        )
                                                    }
                                                >
                                                    <FAIcon icon="arrow-left" />{" "}
                                                    {
                                                        solutions[prevSolution]
                                                            .node.frontmatter
                                                            .title
                                                    }
                                                </StyledButton>
                                            </ButtonContainer>
                                        </Column>
                                        <Column xlarge={5}>
                                            <ButtonContainer>
                                                <StyledButton
                                                    size="large"
                                                    color="white"
                                                    hollow
                                                    borderWidth={2}
                                                    onClick={() =>
                                                        this.handleClick(
                                                            nextSolution
                                                        )
                                                    }
                                                >
                                                    {
                                                        solutions[nextSolution]
                                                            .node.frontmatter
                                                            .title
                                                    }{" "}
                                                    <FAIcon icon="arrow-right" />
                                                </StyledButton>
                                            </ButtonContainer>
                                        </Column>
                                    </Row>
                                </ContentRow>
                            )}
                    </Content>
                </ContentWrapper>
            </Container>,
            this.el
        );
    }
}

SolutionModal.propTypes = {
    showButtons: PropTypes.bool
};

SolutionModal.defaultProps = {
    showButtons: true
};

export default SolutionModal;
