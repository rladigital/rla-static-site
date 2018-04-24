import React from "react";
import Link from "gatsby-link";
import { Row, Column } from "rla-components";
import ScrollAnimation from "react-animate-on-scroll";
import { randomChunkArray, random } from "../helpers/helpers";

import NewsSummary from "../components/news/NewsSummary";

let lastarrayIndex = null;
export default chunks => {
    const result = new Array();

    const layouts = {
        0: [
            function() {
                return null;
            }
        ],
        1: [
            function(data) {
                return (
                    <Row collapse expanded>
                        <Column collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={0}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[0].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                    </Row>
                );
            }
        ],
        2: [
            function(data) {
                return (
                    <Row collapse expanded>
                        <Column large={4} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={0}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[1].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                        <Column large={8} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={250}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[0].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                    </Row>
                );
            },
            function(data) {
                return (
                    <Row collapse expanded>
                        <Column large={8} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={0}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[0].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                        <Column large={4} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={250}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[1].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                    </Row>
                );
            }
        ],
        3: [
            function(data) {
                return (
                    <Row collapse expanded>
                        <Column large={6} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={0}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[0].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                        <Column large={3} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={250}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[1].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                        <Column large={3} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={50}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[2].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                    </Row>
                );
            },
            function(data) {
                return (
                    <Row collapse expanded>
                        <Column large={6} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={0}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[0].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                        <Column large={6} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={250}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[1].node}
                                    height={250}
                                />
                            </ScrollAnimation>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={250}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[2].node}
                                    height={250}
                                />
                            </ScrollAnimation>
                        </Column>
                    </Row>
                );
            }
        ],
        4: [
            function(data) {
                return (
                    <Row collapse expanded>
                        <Column large={4} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={0}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[1].node}
                                    height={250}
                                />
                            </ScrollAnimation>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={250}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[2].node}
                                    height={250}
                                />
                            </ScrollAnimation>
                        </Column>
                        <Column large={4} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={500}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[0].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                        <Column large={4} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={750}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[3].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                    </Row>
                );
            },
            function(data) {
                return (
                    <Row collapse expanded>
                        <Column large={4} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={0}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[0].node}
                                    height={500}
                                />
                            </ScrollAnimation>
                        </Column>
                        <Column large={4} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={250}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[1].node}
                                    height={500}
                                />{" "}
                            </ScrollAnimation>
                        </Column>
                        <Column large={4} collapse expanded>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={500}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[2].node}
                                    height={250}
                                />
                            </ScrollAnimation>
                            <ScrollAnimation
                                animateIn="fadeIn"
                                delay={750}
                                animateOnce={true}
                            >
                                <NewsSummary
                                    story={data[3].node}
                                    height={250}
                                />{" "}
                            </ScrollAnimation>
                        </Column>
                    </Row>
                );
            }
        ]
    };

    chunks.map((chunk, i) => {
        const layoutArray = layouts[chunk.length];
        const getArrayIndex = function() {
            return random(0, layoutArray.length - 1);
        };
        let arrayIndex = 0;

        // make sure that there are no duplicate rows if possible
        if (layoutArray.length > 1) {
            arrayIndex = getArrayIndex();
            while (arrayIndex == lastarrayIndex) {
                arrayIndex = getArrayIndex();
            }
            lastarrayIndex = arrayIndex;
        }

        result.push(layoutArray[arrayIndex]);
    });

    return result;
};
