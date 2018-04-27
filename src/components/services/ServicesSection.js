import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";

import HeaderBlock from "../HeaderBlock";
import ServiceSummary from "./ServiceSummary";
import SectionContainer from "../SectionContainer";

import { colors } from "../../theme/theme";
import { isMobile, hexToInt } from "../../helpers/helpers";

const points = isMobile() ? 5 : 7;

const Control = styled.a`
    font-size: 3em;
    color: ${colors.white};
    cursor: pointer;
`;

const IntroPara = styled.p`
    text-align: center;
    margin-bottom: 8rem;
    color: ${colors.lightGray};
`;

const Service = styled.text`
    font-family: ${props => props.theme.headings.fontFamily};
`;

let resizeTimer;

class ServicesSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    coords(elem, servicesLength) {
        const { current } = this.state;

        const total = elem.getTotalLength();
        const segment = total / (points - 1);
        let coords = new Array();

        // Generate points
        for (var i = 0; i < servicesLength; i++) {
            // if more items than points
            if (i > points) {
                coords[i] = { x: 0, y: 0 };
            } else {
                coords[i] = elem.getPointAtLength(segment * i);
            }
        }

        // Coord other params
        for (var i = 0; i < points; i++) {
            if (isMobile()) {
                coords[i].status =
                    i == 2 ? "active" : i < 4 && i > 0 ? "visible" : null;
            } else {
                coords[i].status =
                    i == 3 ? "active" : i < 6 && i > 0 ? "visible" : null;
            }
        }

        // Slide the points
        for (var i = 0; i < current; i++) {
            const n = coords.splice(0, 1); // remove from front
            coords = coords.concat(n); // add to back
        }

        return coords;
    }

    // splitPath() {
    //     var numPieces = 20,
    //         pieceSizes = [],
    //         pieces = [];

    //     for (var i = 0; i < numPieces; i++) {
    //         pieceSizes.push({ i: i, size: Math.floor(Math.random() * 20) + 5 });
    //     }

    //     var size = pieceSizes.reduce(function(a, b) {
    //         return a + b.size;
    //     }, 0);

    //     var pieceSize = pLength / size;

    //     pieceSizes.forEach(function(x, j) {
    //         var segs = [];
    //         for (var i = 0; i <= x.size + sampleInterval; i += sampleInterval) {
    //             pt = p.getPointAtLength(i * pieceSize + cumu * pieceSize);
    //             segs.push([pt.x, pt.y]);
    //         }
    //         angle =
    //             Math.atan2(segs[1][1] - segs[0][1], segs[1][0] - segs[0][0]) *
    //             180 /
    //             Math.PI;
    //         pieces.push({ id: j, segs: segs, angle: angle });
    //         cumu += x.size;
    //     });

    //     return pieces;
    // }

    prev() {
        const next = this.state.current + 1;
        const actual = next > this.props.services.length - 1 ? 0 : next;
        this.setCurrent(actual);
    }

    next() {
        const prev = this.state.current - 1;
        const actual = prev < 0 ? this.props.services.length - 1 : prev;
        this.setCurrent(actual);
    }

    setCurrent(x) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            this.setState({ current: x });
        }, 500);
    }

    render() {
        const { width, height, services } = this.props;
        const { current } = this.state;
        const coords = this.path && this.coords(this.path, services.length);

        return (
            <SectionContainer
                color={colors.white}
                background={colors.background}
                padding="2em 0"
                style={{ marginBottom: "-8em" }}
            >
                <Row>
                    <Column large={8} centered>
                        <HeaderBlock
                            baseColor={colors.white}
                            padding={{
                                top: 4,
                                right: 0,
                                bottom: 0,
                                left: 0
                            }}
                            fontSize={3.4}
                            textAlign="center"
                        >
                            ALL <span>JOINED UP</span>{" "}
                        </HeaderBlock>
                        <IntroPara>
                            With our unique insight and range of talents, we can
                            provide and seamlessly connect all of these key
                            services. And everything in between.
                        </IntroPara>
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
                                //console.log(coords[i]);
                                return (
                                    coords[i] && (
                                        <g
                                            key={i}
                                            transform={`translate(${
                                                coords[i].x
                                            }, ${coords[i].y})`}
                                            style={{
                                                opacity: coords[i].status
                                                    ? 1
                                                    : 0,
                                                transition: "all 1s ease"
                                            }}
                                        >
                                            <circle
                                                r={
                                                    coords[i].status == "active"
                                                        ? 12
                                                        : 6
                                                }
                                                style={{
                                                    transition: "r 1s ease"
                                                }}
                                                fill={colors.white}
                                                cx={0}
                                                cy={0}
                                            >
                                                {i}
                                            </circle>
                                            <Service
                                                textAnchor="middle"
                                                transform={`translate(0 ${
                                                    coords[i].status == "active"
                                                        ? "-45"
                                                        : "-30"
                                                })`}
                                                style={{
                                                    fill: colors.white,
                                                    fontWeight: 700,
                                                    letterSpacing: "0.05rem",

                                                    transition: "all 1s ease"
                                                }}
                                                fillOpacity={
                                                    coords[i].status == "active"
                                                        ? 1
                                                        : 0.5
                                                }
                                            >
                                                {service.node.frontmatter.title.toUpperCase()}
                                            </Service>
                                            <line
                                                x={0}
                                                y={0}
                                                x1={0}
                                                y1={0}
                                                x2={0}
                                                y2={
                                                    coords[i].status == "active"
                                                        ? -35
                                                        : -20
                                                }
                                                strokeWidth="1"
                                                stroke="white"
                                            />
                                        </g>
                                    )
                                );
                            })}
                    </svg>
                    <div
                        style={{
                            width: "100%",

                            top: height / 2,
                            textAlign: "center"
                        }}
                    >
                        <Row style={{ position: "relative", top: -200 }}>
                            <Column small={8} centered>
                                {coords &&
                                    services && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    services[
                                                        coords
                                                            .map(e => {
                                                                return e.status;
                                                            })
                                                            .indexOf("active")
                                                    ].node.html
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
            </SectionContainer>
        );
    }
}

export default ServicesSection;
