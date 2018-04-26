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
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`
};

const transitions = {
    down: {
        default: {
            transform: "scale(2)"
        },
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
    up: {
        default: {
            transform: "scale(0)"
        },
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

class SolutionsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            scrollY: window.pageYOffset,
            scrollDirection: "down",
            count: 0
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.pauseScroll = this.pauseScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);

        // Don't play animations until page has loaded
        setTimeout(() => {
            this.setState({ loaded: true });
        }, duration);
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
        const { loaded, scrollY, scrollDirection } = this.state;
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
                            <div>
                                {loaded && [
                                    <Fade
                                        visible={visibleSection == "video"}
                                        animationDirection={scrollDirection}
                                        style={{
                                            ...style,
                                            position: "fixed"
                                        }}
                                        zIndex={isMobile() ? 0 : 4}
                                    >
                                        <SolutionsVideo
                                            width={width}
                                            height={height}
                                            animation={animation}
                                        />
                                    </Fade>,
                                    <Fade
                                        visible={visibleSection == "list"}
                                        animationDirection={scrollDirection}
                                        style={style}
                                        onEnter={this.pauseScroll}
                                        zIndex={0}
                                    >
                                        <SolutionsList
                                            width={width}
                                            height={height}
                                            solutions={solutions}
                                            animation={animation}
                                        />
                                    </Fade>
                                ]}
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
            visible,
            children,
            style,
            zIndex,
            animationDirection,
            ...rest
        } = this.props;

        return (
            <Transition in={visible} timeout={500} {...rest}>
                {state => (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex: state != "exited" ? zIndex : 0,
                            ...style
                        }}
                    >
                        <div
                            style={{
                                ...defaultStyle,
                                ...transitions[animationDirection].default,
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
