import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";
import { Row, Column } from "rla-components";
import { colors, breakpoints } from "../../theme/theme";
import { scale, random, isBrowser } from "../../helpers/helpers";
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
`;

const Content = styled.div`
    transition: all 1s ease;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 3vw 0 0;
    font-size: 5vw;
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 3vw;
    }
    @media (min-width: ${breakpoints.large}px) {
        font-size: 2vw;
    }
    @media (min-width: ${breakpoints.xlarge}px) {
        font-size: 1.5vw;
    }
`;

const H1 = styled.h1`
    font-weight: 900;
    font-size: 10vw;
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 8vw;
    }
    @media (min-width: ${breakpoints.large}px) {
        font-size: 6vw;
    }
`;

const Circle = styled.circle`
    transition: all 1s cubic-bezier(0.76, -0.46, 0.2, 1.38);
`;

const BackButton = styled.a`
    top: 0;
    left: 0;
    padding: 2em;
    position: absolute;
    z-index: 999;
    color: ${colors.white};
    font-size: 1.2em;
    cursor: pointer;
`;

class SolutionModal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
        this.state = {
            animation: 0
        };
    }

    componentDidMount() {
        if (isBrowser()) {
            modalRoot.appendChild(this.el);
        }

        setTimeout(() => {
            this.setState({
                animation: 1
            });
        }, 25);
    }

    componentWillUnmount() {
        if (isBrowser()) {
            modalRoot.removeChild(this.el);
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

    render() {
        const { animation } = this.state;
        const { solution, width, height, close } = this.props;
        const isLarge = Boolean(width > breakpoints.xlarge);

        const w = isLarge ? width - width / 5 : width;
        const h = isLarge ? height - height / 5 : height;

        const circleProps = {
            cx: isLarge ? width / 2 + 100 : width / 2,
            cy: isLarge ? height / 2 : height / 2 + 100,
            r: Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2,
            fill: "url(#active_solution_grad)",
            transform: `translate(${width * (1 - animation)} 0)`
        };

        return ReactDOM.createPortal(
            <Container
                id="container"
                style={{ opacity: animation }}
                onClick={() => this.handleClose(close)}
            >
                <BackButton
                    role="button"
                    onClick={() => this.handleClose(close)}
                >
                    <FAIcon icon="chevron-left" /> Back
                </BackButton>
                <Svg>
                    <linearGradient id="active_solution_grad">
                        <stop
                            offset="5%"
                            stopColor={solution.frontmatter.color2}
                        />
                        <stop
                            offset="95%"
                            stopColor={solution.frontmatter.color1}
                        />
                    </linearGradient>
                    <Circle {...circleProps} />
                </Svg>
                <Content
                    style={{
                        width: w,
                        height: h,
                        top: circleProps.cy,
                        left: circleProps.cx,
                        opacity: animation,
                        transitionDelay: animation ? "0.5s" : "0s"
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <Row expanded>
                        <Column collapse>
                            <H1>{solution.frontmatter.title}</H1>
                            <p>{solution.frontmatter.intro}</p>
                        </Column>
                    </Row>
                </Content>
            </Container>,
            this.el
        );
    }
}

export default SolutionModal;
