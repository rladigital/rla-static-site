import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import { colors } from "../../theme/theme";
import { transformScale, random } from "../../helpers/helpers";
import SolutionModal from "./SolutionModal";

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
    font-size: 16px;
    font-weight: 900;
    fill: ${colors.white};
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
            randoms: null,
            activeSolution: null
        };
    }
    orbs(items) {
        const { width, height } = this.props;
        const { randoms, activeSolution } = this.state;
        const r = 360;
        const array = new Array();

        if (randoms) {
            for (var i = 0; i < items.length; i++) {
                array[i] = new Object();
                const theta = Math.PI * 2 / items.length;
                const angle = theta * i - Math.PI / 2;
                const x = 0 + r * Math.cos(angle); // center point + radius * angle
                const y = 0 + r * Math.sin(angle);
                const size = randoms[i].orbs.size;

                array[i].cx = x + randoms[i].orbs.x;
                array[i].cy = y + randoms[i].orbs.y;
                array[i].r = size;
            }

            return array;
        }
    }

    randoms(items) {
        const deviation = 50;
        const array = new Array();

        for (var i = 0; i < items.length; i++) {
            array[i] = new Object();
            array[i].orbs = new Object();
            array[i].lines = new Object();

            // For the orbs
            array[i].orbs.size = random(18, 34);
            array[i].orbs.x = random(-deviation, deviation);
            array[i].orbs.y = random(-deviation, deviation);

            // For the lines
            // For the lines
            array[i].line = random(
                Math.max(0, i - 4),
                Math.min(items.length - 1, i + 4)
            );
        }

        return array;
    }

    lines(coords) {
        const { randoms } = this.state;
        const lines = new Array();

        if (coords) {
            for (var i = 0; i < coords.length; i++) {
                const current = coords[i];

                const end = randoms[i].line;

                const startX = current.cx;
                const startY = current.cy;

                const endX = coords[end].cx;
                const endY = coords[end].cy;

                const angleX = i > end ? endX - startX : startX - endX;
                const angleY = i > end ? startY - endY : endY - startY;

                const curve = Math.abs(i - end) * 0.2;

                const midpointX = (startX + endX) / 2 + curve * angleY;
                const midpointY = (startY + endY) / 2 + curve * angleX;

                lines[i] = {
                    d: `M${startX},${startY} Q${midpointX},${midpointY} ${endX}, ${endY}`,
                    stroke: "url(#stroke_grad)",
                    strokeWidth: "3",
                    fill: "transparent"
                };
            }

            return lines;
        }
    }

    componentDidMount() {
        const { solutions } = this.props;
        this.setState({ randoms: this.randoms(solutions) });
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
        const { activeSolution } = this.state;

        const scale = Math.min(scrollY / height, 1);

        const orbs = this.orbs(solutions);

        const lines = this.lines(orbs);

        return (
            <Gradient style={style}>
                <Container
                    style={{
                        opacity: scale,
                        transform: `scale(${scale})`,
                        transition: `transform ${animation}`
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
                                2}) scale(${transformScale(1080)})`}
                        >
                            {lines &&
                                lines.map((line, index) => (
                                    <path key={index} {...line} />
                                ))}
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
                                            orbs[index].cx < 0 ? "end" : "start"
                                        }
                                    >
                                        {solution.frontmatter.title
                                            .toUpperCase()
                                            .split(" ")
                                            .map((word, i) => (
                                                <tspan
                                                    key={i}
                                                    x={
                                                        orbs[index].cx +
                                                        (orbs[index].cx < 0
                                                            ? -orbs[index].r -
                                                              10
                                                            : orbs[index].r +
                                                              10)
                                                    }
                                                    dy={
                                                        i == 0 ? "-3px" : "18px"
                                                    }
                                                >
                                                    {word}
                                                </tspan>
                                            ))}
                                    </Solution>,
                                    <Orb
                                        key={index}
                                        fill={`url(#grad_${index})`}
                                        id={`orb_${index}`}
                                        onClick={() =>
                                            this.handleClick(solution)
                                        }
                                        {...orbs[index]}
                                    />
                                ])}
                        </g>
                    </Svg>
                </Container>
                {activeSolution && (
                    <SolutionModal
                        width={width}
                        height={height}
                        solution={activeSolution}
                        close={() => this.handleClick(null)}
                    />
                )}
            </Gradient>
        );
    }
}

export default SolutionsVideo;
