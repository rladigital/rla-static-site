import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transition from "react-transition-group/Transition";

import { colors, breakpoints } from "../../theme/theme";
import { transformScale, random, isMobile } from "../../helpers/helpers";
import SolutionModal from "./SolutionModal";
import ScrollDown from "./ScrollDown";

const Svg = styled.svg`
    font-family: ${props => props.theme.headings.fontFamily};
`;

const TitleCircle = styled.circle`
    fill: ${colors.background};
`;

const Title = styled.text`
    font-size: 58px;
    font-weight: 900;
    fill: ${colors.white};
    text-anchor: middle;
    letter-spacing: -2px;
`;

const Subtitle = styled.text`
    font-size: 18px;
    fill: ${colors.white};
    text-anchor: middle;
    letter-spacing: 0px;
    font-weight: light;
`;

const Solution = styled.text`
    font-size: 20px;
    font-weight: bold;
    font-family: "Gotham" sans-serif;
    letter-spacing: 2px;
    fill: ${colors.white};
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 16px;
    }
`;

const Orb = styled.circle`
    cursor: pointer;
`;

const G = styled.g`
    circle {
        transition: r 1s ease;
    }
    &:hover {
        circle {
            r: 12px;
        }
    }
`;

let lineId = 0;

class SolutionsVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: [],
            activeSolution: null
        };

        this.lineTicker = this.lineTicker.bind(this);
    }
    componentDidMount() {
        const { solutions } = this.props;
        const orbs = this.orbs(solutions);
        this.setState({
            orbs: orbs
        });
        this.preLoadLines(orbs);
        // this.timer = setInterval(this.lineTicker, 1000);

        this.props.innerRef(this);
    }

    componentWillUnmount() {
        clearInterval(this.timer);

        this.props.innerRef(null);
    }

    handleClick(x) {
        this.setState({
            activeSolution: x
        });
    }

    orbs(items) {
        const { width, height } = this.props;
        const { randoms, activeSolution } = this.state;

        const array = new Array();

        if (isMobile()) {
            const r = 400;
            const deviation = 0;

            for (var i = 0; i < items.length; i++) {
                array[i] = new Object();
                const theta = Math.PI / items.length;
                const count = items.length;
                const angle =
                    (i >= count / 2 ? theta * i : theta * (i - count / 2)) -
                    Math.PI / count;

                const x = 0 + r * Math.cos(angle); // center point + radius * angle
                const y = 0 + r * Math.sin(angle);
                const size = 30;

                array[i].cx = x;
                array[i].cy = y;
                array[i].r = size;
            }
        } else {
            const r = 340;
            const deviation = 50;

            for (var i = 0; i < items.length; i++) {
                array[i] = new Object();
                const theta = (Math.PI * 2) / items.length;
                const angle = theta * i - Math.PI / 2;

                const x = 0 + r * Math.cos(angle); // center point + radius * angle
                const y = 0 + r * Math.sin(angle);
                const size = random(18, 34);

                array[i].cx = x + random(-deviation, deviation);
                array[i].cy = y + random(-deviation, deviation);
                array[i].r = size;
            }
        }

        return array;
    }

    preLoadLines(orbs) {
        let lines = this.state.lines.slice();

        // Array
        for (var i = 0; i < 4; i++) {
            lines.push(this.generateLine(orbs));
        }

        this.setState({ lines });
    }

    lineTicker() {
        let lines = this.state.lines.slice();

        if (this.state.orbs) {
            // Array
            lines.push(this.generateLine());

            if (lines.length > 10) {
                lines.shift();
            }

            this.setState({ lines });
        }
    }

    generateLine(orbs = this.state.orbs) {
        if (orbs) {
            const current = random(0, orbs.length - 1);

            const end = random(0, orbs.length - 1);

            const startX = orbs[current].cx;
            const startY = orbs[current].cy;

            const endX = orbs[end].cx;
            const endY = orbs[end].cy;

            const angleX = current > end ? endX - startX : startX - endX;
            const angleY = current > end ? startY - endY : endY - startY;

            const curve = Math.abs(current - end) * 0.2;

            const midpointX = (startX + endX) / 2 + curve * angleY;
            const midpointY = (startY + endY) / 2 + curve * angleX;

            const lineProps = {
                d: `M${startX},${startY} Q${midpointX},${midpointY} ${endX}, ${endY}`,
                stroke: "url(#stroke_grad)",
                strokeWidth: "2",
                fill: "transparent"
            };

            // Return element
            return (
                <Fade key={`line_${lineId++}`}>
                    <path {...lineProps} />
                </Fade>
            );
        }
    }

    render() {
        const {
            width,
            height,
            solutions,
            style,
            transitionState,
            nextSection,
            setScrollable
        } = this.props;
        const { activeSolution, orbs, lines } = this.state;

        return (
            <div style={style}>
                <Svg width={width} height={height}>
                    <defs>
                        <filter
                            id="shadow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%">
                            <feDropShadow
                                dx="0"
                                dy="4"
                                stdDeviation="5"
                                floodColor="#55555"
                                floodOpacity="0.05"
                            />
                        </filter>
                        <linearGradient id="stroke_grad">
                            <stop
                                offset="25%"
                                stopColor="rgba(130, 155, 227, 0.2)"
                            />
                            <stop
                                offset="100%"
                                stopColor="rgba(130, 155, 227, 0.4)"
                            />
                        </linearGradient>
                        {solutions.map(({ node: solution }, index) => (
                            <linearGradient
                                key={index}
                                id={`grad_${index}`}
                                key={`$gradient_${index}`}>
                                <stop
                                    offset="5%"
                                    stopColor={solution.frontmatter.color1}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={solution.frontmatter.color2}
                                />
                            </linearGradient>
                        ))}
                    </defs>
                    <g
                        transform={`translate(${width / 2},${height /
                            2}) scale(${
                            isMobile()
                                ? transformScale(1000)
                                : transformScale(1080)
                        })`}>
                        <TransitionGroup component="g">
                            {lines.length > 4 &&
                                transitionState == "entered" &&
                                lines}
                        </TransitionGroup>

                        {orbs &&
                            solutions.map(({ node: solution }, index) => (
                                <OrbAnimation
                                    key={`solution_${index}`}
                                    visible={Boolean(
                                        [
                                            "enter",
                                            "entering",
                                            "entered"
                                        ].indexOf(transitionState) > -1
                                    )}
                                    index={index}
                                    appear={true}>
                                    <Solution
                                        y={orbs[index].cy}
                                        textAnchor={
                                            isMobile()
                                                ? "middle"
                                                : orbs[index].cx < 0
                                                    ? "end"
                                                    : "start"
                                        }>
                                        {solution.frontmatter.title
                                            .toUpperCase()
                                            .split(" ")
                                            .map((word, i) => {
                                                const x = isMobile()
                                                    ? orbs[index].cx
                                                    : orbs[index].cx +
                                                      (orbs[index].cx < 0
                                                          ? -orbs[index].r - 10
                                                          : orbs[index].r + 10);

                                                const dy = isMobile()
                                                    ? i == 0
                                                        ? orbs[index].cy > 0
                                                            ? 60
                                                            : -60
                                                        : 20
                                                    : i == 0
                                                        ? "-3px"
                                                        : "18px";

                                                return (
                                                    <tspan
                                                        key={i}
                                                        x={x}
                                                        dy={dy}>
                                                        {word}
                                                    </tspan>
                                                );
                                            })}
                                    </Solution>
                                    <Orb
                                        key={index}
                                        fill={`url(#grad_${index})`}
                                        id={`orb_${index}`}
                                        onClick={() => this.handleClick(index)}
                                        {...orbs[index]}
                                    />
                                </OrbAnimation>
                            ))}
                        <g transform={`scale(${isMobile() ? "1.5" : "1"})`}>
                            <TitleCircle cx={0} cy={0} r={200} />
                            <Title x={0} y={0}>
                                <tspan dy="-15px" x={0}>
                                    CONNECTED
                                </tspan>
                                <tspan dy="54px" x={0}>
                                    AMBITION
                                </tspan>
                            </Title>
                            <Subtitle x={0} y={0}>
                                <tspan dy="75px" x={0}>
                                    WORLD CLASS CONNECTED
                                </tspan>
                                <tspan dy="25px" x={0}>
                                    MARKETING SOLUTIONS
                                </tspan>
                            </Subtitle>
                        </g>
                    </g>
                </Svg>

                {activeSolution != undefined && (
                    <SolutionModal
                        width={width}
                        height={height}
                        solution={activeSolution}
                        solutions={solutions}
                        close={() => this.handleClick(null)}
                        setScrollable={setScrollable}
                    />
                )}

                {transitionState == "entered" && (
                    <ScrollDown
                        color={colors.white}
                        onClick={this.props.scrollDown}
                    />
                )}
            </div>
        );
    }
}

class Fade extends React.Component {
    render() {
        const { in: inProp, children, ...otherProps } = this.props;

        const duration = 1000;

        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: 0
        };

        const transitionStyles = {
            entering: { opacity: 0 },
            entered: { opacity: 1 }
        };

        return (
            <Transition in={inProp} timeout={duration} {...otherProps}>
                {state => (
                    <g
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                        {children}
                    </g>
                )}
            </Transition>
        );
    }
}

class OrbAnimation extends React.Component {
    render() {
        const { visible, children, index, ...otherProps } = this.props;

        const duration = 1000;

        const initialScale = 0.7;

        const defaultStyle = {
            transform: `scale(${initialScale})`,
            transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
            transitionDelay: `${random(0, 500)}ms`,
            opacity: 0
        };

        const transitionStyles = {
            entering: {
                opacity: 0,
                transform: `scale(${initialScale})`
            },
            entered: {
                opacity: 1,
                transform: `scale(1)`
            }
        };

        return (
            <Transition in={visible} timeout={duration} {...otherProps}>
                {state => (
                    <G
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                        {children}
                    </G>
                )}
            </Transition>
        );
    }
}

export default SolutionsVideo;
