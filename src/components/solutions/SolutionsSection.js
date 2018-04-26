import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import { StickyContainer, Sticky } from "react-sticky";
import { TransitionGroup, Transition } from "react-transition-group";

import { colors } from "../../theme/theme";
import { hexToInt, isMobile } from "../../helpers/helpers";

import HeaderBlock from "../HeaderBlock";
import SolutionsList from "./SolutionsList";
import SolutionsVideo from "./SolutionsVideo";
import SectionContainer from "../SectionContainer";

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

const StyledStickyContainer = styled(StickyContainer)`
    background-image: url("img/background.png");
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
`;

class SolutionsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: window.pageYOffset,
            scrollDirection: "down"
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.pauseScroll = this.pauseScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        this.setState({
            scrollY: window.pageYOffset,
            scrollDirection:
                window.pageYOffset < this.state.scrollY ? "up" : "down"
        });
    }

    pauseScroll() {
        const { scrollDirection } = this.state;
        const html = document.querySelector("html");

        if (scrollDirection == "down") {
            html.style.overflowY = "hidden";
            setTimeout(function() {
                html.style.overflowY = "auto";
            }, 2000);
        }
    }

    render() {
        const { width, height, font, scrolltop, solutions } = this.props;
        const { scrollY, scrollDirection } = this.state;
        const animation = "transform 0.75s ease, opacity 0.75s ease";
        const visibleSection =
            scrollY > height * 2
                ? "none"
                : scrollY > height / 2 ? "list" : "video";

        return (
            <StyledStickyContainer style={{ height: height * 2 }}>
                <Sticky style={{ height: "50%", background: "red" }}>
                    {({ style, isSticky }) => {
                        return (
                            <div
                                style={{
                                    ...style,
                                    transform: "scale(0.5)",
                                    width: "100%",
                                    height: "100%",
                                    zIndex:
                                        visibleSection == "video" && !isMobile()
                                            ? 4
                                            : 0,
                                    visibility: isSticky ? "visible" : "hidden"
                                }}
                            >
                                <TransitionGroup>
                                    {visibleSection == "video" && (
                                        <Fade>
                                            <SolutionsVideo
                                                width={width}
                                                height={height}
                                                animation={animation}
                                            />
                                        </Fade>
                                    )}
                                    {visibleSection == "list" && (
                                        <Fade onEnter={this.pauseScroll}>
                                            <SolutionsList
                                                width={width}
                                                height={height}
                                                solutions={solutions}
                                                animation={animation}
                                            />
                                        </Fade>
                                    )}
                                </TransitionGroup>
                            </div>
                        );
                    }}
                </Sticky>
            </StyledStickyContainer>
        );
    }
}

export default SolutionsSection;

class Fade extends React.Component {
    render() {
        const {
            in: inProp,
            children,
            zIndex,
            animationDirection,
            ...rest
        } = this.props;

        return (
            <Transition in={inProp} timeout={500} {...rest}>
                {state => (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            zIndex: state != "exited" ? zIndex : 0
                        }}
                    >
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
                    </div>
                )}
            </Transition>
        );
    }
}
