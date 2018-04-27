import React from "react";
import styled from "styled-components";
import { TransitionGroup, Transition } from "react-transition-group";
import Swipe from "react-easy-swipe";

import SolutionsList from "./SolutionsList";
import SolutionsVideo from "./SolutionsVideo";
import SectionContainer from "../SectionContainer";

class SolutionsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section: 0
        };

        this.nextSection = this.nextSection.bind(this);
        this.prevSection = this.prevSection.bind(this);
    }

    nextSection() {
        let section = Math.min(this.state.section + 1, 2);
        this.setState({ section: section });
    }

    prevSection() {
        let section = Math.max(this.state.section - 1, 0);
        this.setState({ section: section });
    }

    render() {
        const { width, height, solutions } = this.props;
        const { section } = this.state;

        const sections = [
            <Zoom zIndex={4} key="section_1">
                <Section>
                    <SolutionsVideo width={width} height={height} />
                </Section>
            </Zoom>,

            <Zoom zIndex={1} key="section_2">
                <Section>
                    <SolutionsList
                        width={width}
                        height={height}
                        solutions={solutions}
                    />
                </Section>
            </Zoom>,

            <Slide key="section_3" height={height}>
                <Section>
                    <div>{this.props.children}</div>
                </Section>
            </Slide>
        ];

        return (
            <Swipe
                onSwipeMove={() => {
                    return true;
                }}
                onSwipeDown={this.prevSection}
                onSwipeUp={this.nextSection}
                allowMouseEvents
            >
                <TransitionGroup style={{ height: "100%" }}>
                    {sections[section]}
                </TransitionGroup>
            </Swipe>
        );
    }
}

export default SolutionsSection;

class Zoom extends React.Component {
    render() {
        const {
            zIndex,
            in: inProp,
            children,
            animationDirection,
            ...rest
        } = this.props;

        const duration = 1000;

        const defaultStyle = {
            width: "100%",
            height: "100%",
            transform: "scale(1)",
            transition: `opacity ${600}ms ease-in-out, transform ${duration}ms ease-in-out`,
            opacity: 0
        };

        const transitions = {
            entering: {
                opacity: 0,
                transform: "scale(1)"
            },
            entered: {
                opacity: 1,
                transform: "scale(2)"
            },
            exiting: {
                opacity: 0,
                transform: "scale(1)"
            }
        };

        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    transform: "scale(0.5)",
                    position: "absolute",
                    zIndex: zIndex
                }}
            >
                <Transition in={inProp} timeout={500} {...rest}>
                    {state => (
                        <div
                            style={{
                                ...defaultStyle,
                                ...transitions[state]
                            }}
                        >
                            {React.Children.map(children, child =>
                                React.cloneElement(child, {
                                    transitionState: state
                                })
                            )}
                        </div>
                    )}
                </Transition>
            </div>
        );
    }
}

class Slide extends React.Component {
    render() {
        const {
            in: inProp,
            height,
            children,
            animationDirection,
            ...rest
        } = this.props;

        const duration = 1000;

        const defaultStyle = {
            transition: `opacity ${600}ms ease-in-out, transform ${duration}ms ease-in-out`,
            opacity: 0
        };

        const transitions = {
            entering: {
                opacity: 0,
                transform: `translateY(${height}px)`,
                position: "absolute"
            },
            entered: {
                opacity: 1,
                transform: "translate(0)"
            },
            exiting: {
                opacity: 0,
                transform: `translateY(${height}px)`,
                position: "absolute"
            }
        };

        return (
            <Transition in={inProp} timeout={500} {...rest}>
                {state => (
                    <div
                        style={{
                            ...defaultStyle,
                            ...transitions[state]
                        }}
                    >
                        {children}
                    </div>
                )}
            </Transition>
        );
    }
}

class Section extends React.Component {
    render() {
        const { children, ...rest } = this.props;
        return (
            <div style={{ minHeight: "100%", overflow: "hidden" }}>
                {React.Children.map(children, child =>
                    React.cloneElement(child, {
                        ...rest
                    })
                )}
            </div>
        );
    }
}
