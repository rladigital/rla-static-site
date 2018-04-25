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
    opacity: 0,
    transform: "scale(0.5)",
    transition: `opacity ${500}ms ease-in-out, transform ${duration}ms ease-in-out`
};

const transitions = {
    forwards: {
        entering: {
            opacity: 0,
            transform: "scale(0)"
        },
        entered: {
            opacity: 1,
            transform: "scale(1)"
        },
        exiting: {
            opacity: 0,
            transform: "scale(2)"
        }
    },
    backwards: {
        entering: {
            opacity: 0,
            transform: "scale(2)"
        },
        entered: {
            opacity: 1,
            transform: "scale(1)"
        },
        exiting: {
            opacity: 0,
            transform: "scale(0)"
        }
    }
};

const StyledStickyContainer = styled(StickyContainer)`
    background-image: url("img/background.png");
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
`;

class Fade extends React.Component {
    render() {
        const {
            in: inProp,
            children,
            style,
            animationDirection,
            ...rest
        } = this.props;

        return (
            <Transition
                in={inProp}
                timeout={500}
                unmountOnExit={true}
                {...rest}
            >
                {state => (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            ...style
                        }}
                    >
                        <div
                            style={{
                                ...defaultStyle,
                                ...transitions[animationDirection][state]
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

let hasScrolledTop = false;
class SolutionsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: window.pageYOffset,
            animationDirection: "forwards"
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
    setAnimationDirection(x) {
        this.setState({ animationDirection: x });
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
        const { scrollY, animationDirection } = this.state;
        const animation = "transform 0.75s ease, opacity 0.75s ease";
        const visibleSection =
            scrollY > height * 2
                ? "none"
                : scrollY > height / 2 ? "list" : "video";

        return (
            <StyledStickyContainer style={{ height: height * 2 }}>
                <Sticky style={{ height: "50%", background: "red" }}>
                    {({ style }) => {
                        return (
                            <TransitionGroup>
                                {visibleSection == "video" && (
                                    <Fade
                                        animationDirection={animationDirection}
                                        style={{
                                            ...style,
                                            zIndex: isMobile() ? 0 : 4,
                                            position: "fixed"
                                        }}
                                        onEntered={() =>
                                            this.setAnimationDirection(
                                                "backwards"
                                            )
                                        }
                                    >
                                        <SolutionsVideo
                                            width={width}
                                            height={height}
                                            animation={animation}
                                        />
                                    </Fade>
                                )}
                                {visibleSection == "list" && (
                                    <Fade
                                        animationDirection={animationDirection}
                                        style={style}
                                        onEnter={this.pauseScroll}
                                        onEntered={() =>
                                            this.setAnimationDirection(
                                                "forwards"
                                            )
                                        }
                                    >
                                        <SolutionsList
                                            width={width}
                                            height={height}
                                            solutions={solutions}
                                            animation={animation}
                                        />
                                    </Fade>
                                )}
                            </TransitionGroup>
                        );
                    }}
                </Sticky>
            </StyledStickyContainer>
        );
    }
}

export default SolutionsSection;
