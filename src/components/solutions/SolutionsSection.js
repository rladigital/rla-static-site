import React from "react";
import styled from "styled-components";
import { TransitionGroup, Transition } from "react-transition-group";
import Swipe from "react-easy-swipe";

import SolutionsList from "./SolutionsList";
import SolutionsVideo from "./SolutionsVideo";
import SectionContainer from "../SectionContainer";

let scrollTimer;
let lastScrollTop = 0;

const Container = styled.div`
    background-image: url("img/background.png");
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
`;

class SolutionsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section: 0
        };

        this.nextSection = this.nextSection.bind(this);
        this.prevSection = this.prevSection.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.shouldScrollPage = this.shouldScrollPage.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll(e) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (window.pageYOffset > lastScrollTop) {
                this.nextSection();
            } else {
                this.prevSection();
            }
            lastScrollTop = window.pageYOffset;
        }, 250);
    }

    nextSection() {
        let section = Math.min(this.state.section + 1, 2);
        this.setState({ section: section });
    }

    prevSection() {
        const { height } = this.props;
        if (window.pageYOffset == 0) {
            let section = Math.max(this.state.section - 1, 0);
            this.setState({ section: section });
        }
    }

    shouldScrollPage() {
        if (this.state.section == 2) {
            return false;
        } else {
            return true;
        }
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
            <Container style={{ minHeight: height }}>
                <Swipe
                    onSwipeMove={this.shouldScrollPage}
                    onSwipeDown={this.prevSection}
                    onSwipeUp={this.nextSection}
                    allowMouseEvents
                >
                    <TransitionGroup>{sections[section]}</TransitionGroup>
                </Swipe>
            </Container>
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

        const duration = 800;

        const defaultStyle = {
            width: "100%",
            height: "100%",
            transform: "scale(1)",
            transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
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

        const duration = 500;

        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
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
        console.log(this.props);
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
