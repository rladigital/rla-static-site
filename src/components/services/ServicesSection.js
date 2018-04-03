import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";

import { TweenLite } from "gsap";

import HeaderBlock from "../HeaderBlock";
import ServiceSummary from "./ServiceSummary";
import SectionContainer from "../SectionContainer";

import { colors } from "../../theme/theme";
import { hexToInt } from "../../helpers/helpers";

const Control = styled.a`
    font-size: 3em;
    color: ${colors.white};
    cursor: pointer;
`;

class ServicesSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            services: null
        };
    }

    componentDidMount() {
        this.setState({
            services: this.dataLength(this.props.services)
        });
    }

    coords(elem) {
        const { current } = this.state;
        const points = 7;
        const total = elem.getTotalLength();
        const segment = total / (points - 1);
        let coords = new Array();

        // Generate points
        for (var i = 0; i < points; i++) {
            coords[i] = elem.getPointAtLength(segment * i);
        }

        // Coord other params
        for (var i = 0; i < coords.length; i++) {
            coords[i].status =
                i == 3 ? "active" : i < 6 && i > 0 ? "visible" : null;
        }

        // Slide the points
        for (var i = 0; i < current; i++) {
            const n = coords.splice(0, 1); // remove from front
            coords = coords.concat(n); // add to back
        }

        console.log(coords);
        return coords;
    }

    dataLength(data) {
        const points = 7;

        while (data.length < points) {
            data = data.concat(data);
        }

        data.splice(-1, 1);

        return data;
    }

    prev() {
        const prev = this.state.current - 1;
        const actual = prev < 0 ? this.props.services.length - 1 : prev;
        this.setState({ current: actual });
    }

    next() {
        const next = this.state.current + 1;
        const actual = next > this.props.services.length - 1 ? 0 : next;
        this.setState({ current: actual });
    }

    render() {
        const { width, height } = this.props;
        const { current, services } = this.state;
        const coords = this.path && this.coords(this.path);

        return (
            <div>
                <Row>
                    <Column large="5">
                        <HeaderBlock
                            baseColor={colors.white}
                            padding={{
                                top: 4,
                                right: 0,
                                bottom: 2,
                                left: 0
                            }}
                            fontSize={4.5}
                            textAlign="left"
                        >
                            <span>Together,</span>
                            <br />
                            we can achieve more
                        </HeaderBlock>
                    </Column>
                </Row>
                <div style={{ position: "relative" }}>
                    <svg width={width} height={height}>
                        <defs>
                            <linearGradient
                                id="curve_grad"
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={colors.accent}
                                    stopOpacity="0.7"
                                />
                                <stop
                                    offset="100%"
                                    stopColor={colors.background}
                                    stopOpacity="1"
                                />
                            </linearGradient>
                        </defs>
                        {/* <ellipse
                    cx={width / 2}
                    cy={height + 200}
                    rx={width}
                    ry={height}
                    fill="url(#curve_grad)"
                /> */}

                        <path
                            d={`M${-60},${height / 2} Q${width /
                                2},${0} ${width + 60}, ${height /
                                2} V${height} H${0}`}
                            fill="url(#curve_grad)"
                        />
                        <path
                            d={`M${-60},${height / 2} Q${width /
                                2},${0} ${width + 60}, ${height / 2} `}
                            fill="transparent"
                            ref={path => {
                                this.path = path;
                            }}
                        />

                        {coords &&
                            services &&
                            services.map((service, i) => {
                                return (
                                    coords[i] && [
                                        <circle
                                            r={
                                                coords[i].status == "active"
                                                    ? 12
                                                    : coords[i].status ==
                                                      "visible"
                                                        ? 6
                                                        : 0
                                            }
                                            fillOpacity={
                                                coords[i].status ? 1 : 0
                                            }
                                            fill={colors.white}
                                            cx={coords[i].x}
                                            cy={coords[i].y}
                                            style={{
                                                transition: "all 1s ease"
                                            }}
                                        >
                                            {i}
                                        </circle>,
                                        <text
                                            x={coords[i].x}
                                            y={
                                                coords[i].y -
                                                (coords[i].status == "active"
                                                    ? 40
                                                    : 30)
                                            }
                                            textAnchor="middle"
                                            style={{
                                                fill: colors.white,
                                                fontWeight: 900,
                                                transition: "all 1s ease"
                                            }}
                                            fillOpacity={
                                                coords[i].status == "active"
                                                    ? 1
                                                    : coords[i].status ==
                                                      "visible"
                                                        ? 0.5
                                                        : 0
                                            }
                                        >
                                            {service.node.frontmatter.title.toUpperCase()}
                                        </text>,
                                        <line
                                            x={coords[i].x}
                                            y={coords[i].y}
                                            x1={coords[i].x}
                                            y1={coords[i].y}
                                            x2={coords[i].x}
                                            y2={
                                                coords[i].y -
                                                (coords[i].status == "active"
                                                    ? 30
                                                    : 20)
                                            }
                                            strokeWidth="1"
                                            stroke="white"
                                            style={{
                                                transition: "all 1s ease"
                                            }}
                                        />
                                    ]
                                );
                            })}
                    </svg>
                    <div
                        style={{
                            width: "100%",
                            position: "absolute",
                            top: height / 2,
                            textAlign: "center"
                        }}
                    >
                        <Row style={{ position: "relative" }}>
                            <Column small={8} centered>
                                {services && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: services[current].node.html
                                        }}
                                    />
                                )}

                                <Control
                                    className="fa-layers fa-fw"
                                    onClick={() => this.navigateChunk("next")}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0
                                    }}
                                    onClick={() => this.prev()}
                                >
                                    <FAIcon
                                        icon="chevron-left"
                                        transform="shrink-8"
                                    />
                                    <FAIcon icon={["far", "circle"]} />
                                </Control>

                                <Control
                                    className="fa-layers fa-fw"
                                    onClick={() => this.navigateChunk("next")}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0
                                    }}
                                    onClick={() => this.next()}
                                >
                                    <FAIcon
                                        icon="chevron-right"
                                        transform="shrink-8"
                                    />
                                    <FAIcon icon={["far", "circle"]} />
                                </Control>
                            </Column>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServicesSection;
