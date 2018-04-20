import React from "react";
import styled, { keyframes } from "styled-components";
import { Row, Column } from "rla-components";
import { colors, breakpoints } from "../../theme/theme";
import { transformScale, random, isMobile } from "../../helpers/helpers";
import SolutionModal from "./SolutionModal";

const rotate360 = keyframes`
  0% {
    opacity: 0
  }

  50%{
    opacity: 1;
  }

  100% {
    opacity: 0
  }
`;

const Path = styled.path``;

const Svg = styled.svg`
    position: absolute;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Gradient = styled.div`
    width: 100%;
    height: 100%;
    background: radial-gradient(#2e3e60 10%, ${colors.background});
`;

const TitleCircle = styled.circle`
    fill: #344470;
`;

const Title = styled.text`
    font-size: 80px;
    font-weight: 900;
    fill: ${colors.white};
    text-anchor: middle;
    letter-spacing: -2px;
`;

const Subtitle = styled.text`
    font-size: 20px;
    fill: #829be3;
    text-anchor: middle;
    letter-spacing: 0px;
`;

const Solution = styled.text`
    font-size: 20px;
    font-weight: 900;
    fill: ${colors.white};
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 16px;
    }
`;

const Orb = styled.circle`
    cursor: pointer;
    transition: r 1s cubic-bezier(1, -0.2, 0, 1.2);
    &:hover {
        r: 16px;
    }
`;

class SolutionsVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSolution: null,
            lines: []
        };

        this.lines = this.lines.bind(this);
    }
    orbs(items) {
        const { width, height } = this.props;
        const { randoms, activeSolution } = this.state;

        const array = new Array();
        const deviation = 50;

        if (isMobile()) {
            const r = 340;
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
            const r = 360;
            for (var i = 0; i < items.length; i++) {
                array[i] = new Object();
                const theta = Math.PI * 2 / items.length;
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

    componentDidMount() {
        const { solutions } = this.props;
        const orbs = this.orbs(solutions);
        this.setState({
            orbs: orbs
        });

        this.lines(orbs);
    }

    lines(orbs) {
        let lines = new Array();

        for (var i = 0; i < 80; i++) {
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
                strokeWidth: "3",
                fill: "transparent",
                style: { animationDelay: random(0, 4000) }
            };

            // Array
            lines.push(<Path key={i} {...lineProps} />);

            console.log(lines);
        }

        this.setState({ lines });
    }

    handleClick(x) {
        this.setState({
            activeSolution: x
        });
    }

    render() {
        const {
            width,
            height,
            scrollY,
            style,
            solutions,
            animation
        } = this.props;
        const { activeSolution, orbs } = this.state;

        const scale = Math.min(scrollY / height, 1);

        return (
            <Gradient style={style}>
                <Container
                    style={{
                        opacity: scale,
                        transform: `scale(${scale})`,
                        transition: animation
                    }}
                >
                    <Svg width={width} height={height}>
                        <defs>
                            <filter
                                id="shadow"
                                x="-20%"
                                y="-20%"
                                width="140%"
                                height="140%"
                            >
                                <feDropShadow
                                    dx="0"
                                    dy="4"
                                    stdDeviation="5"
                                    floodColor="#55555"
                                    floodOpacity="0.2"
                                />
                            </filter>
                            <linearGradient id="stroke_grad">
                                <stop
                                    offset="25%"
                                    stopColor="rgba(130, 155, 227, 0)"
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
                                    key={`$gradient_${index}`}
                                >
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
                                    ? transformScale(700)
                                    : transformScale(1080)
                            })`}
                        >
                            {this.state.lines}
                            <TitleCircle cx={0} cy={0} r={200} />
                            <Title
                                style={{ filter: "url(#shadow)" }}
                                x={0}
                                y={0}
                            >
                                <tspan dy="-30px" x={0}>
                                    CONNECTED
                                </tspan>
                                <tspan dy="70px" x={0}>
                                    AMBITION
                                </tspan>
                            </Title>
                            <Subtitle x={0} y={0}>
                                <tspan dy="85px" x={0}>
                                    WORLD CLASS CONNECTED
                                </tspan>
                                <tspan dy="25px" x={0}>
                                    MARKETING SOLUTIONS
                                </tspan>
                            </Subtitle>
                            {orbs &&
                                solutions.map(({ node: solution }, index) => [
                                    <Solution
                                        y={orbs[index].cy}
                                        textAnchor={
                                            isMobile()
                                                ? "middle"
                                                : orbs[index].cx < 0
                                                    ? "end"
                                                    : "start"
                                        }
                                        key={`solution_${index}`}
                                    >
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
                                                    : i == 0 ? "-3px" : "18px";

                                                return (
                                                    <tspan
                                                        key={i}
                                                        x={x}
                                                        dy={dy}
                                                    >
                                                        {word}
                                                    </tspan>
                                                );
                                            })}
                                    </Solution>,
                                    <Orb
                                        key={index}
                                        fill={`url(#grad_${index})`}
                                        id={`orb_${index}`}
                                        onClick={() => this.handleClick(index)}
                                        {...orbs[index]}
                                    />
                                ])}
                        </g>
                    </Svg>
                </Container>
                {activeSolution != undefined && (
                    <SolutionModal
                        width={width}
                        height={height}
                        solution={activeSolution}
                        solutions={solutions}
                        close={() => this.handleClick(null)}
                    />
                )}
            </Gradient>
        );
    }
}

export default SolutionsVideo;
