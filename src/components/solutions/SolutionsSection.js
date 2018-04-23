import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import { StickyContainer, Sticky } from "react-sticky";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transition from "react-transition-group/Transition";

import { colors } from "../../theme/theme";
import { hexToInt } from "../../helpers/helpers";

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
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`
};

const transitionStyles = {
    entering: {
        opacity: 0,
        transform: "scale(2)"
    },
    entered: {
        opacity: 1,
        transform: "scale(1)"
    }
};

const Fade = ({ in: inProp, children, style, ...rest }) => (
    <Transition in={inProp} timeout={duration} unmountOnExit={true} {...rest}>
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
                        ...transitionStyles[state]
                    }}
                >
                    {children}
                </div>
            </div>
        )}
    </Transition>
);

const StyledStickyContainer = styled(StickyContainer)`
    background-image: radial-gradient(#2e3e60 10%, ${colors.background});
    background-attachment: fixed;
`;

let hasScrolledTop = false;
class SolutionsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: window.pageYOffset
        };

        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    handleScroll() {
        this.setState({
            scrollY: window.pageYOffset
        });
    }

    render() {
        const { width, height, font, scrolltop, solutions } = this.props;
        const { scrollY } = this.state;
        const animation = "transform 0.75s ease, opacity 0.75s ease";
        const visibleSection =
            scrollY > height * 2
                ? "none"
                : scrollY > height / 2 ? "list" : "video";

        return (
            <StyledStickyContainer style={{ height: height * 2 }}>
                <Sticky>
                    {({ style }) => {
                        return (
                            <TransitionGroup>
                                {visibleSection == "list" && (
                                    <Fade style={style}>
                                        <SolutionsList
                                            style={style}
                                            width={width - 16}
                                            height={height}
                                            solutions={solutions}
                                            animation={animation}
                                        />
                                    </Fade>
                                )}
                                {visibleSection == "video" && (
                                    <Fade style={style}>
                                        <SolutionsVideo
                                            style={style}
                                            width={width}
                                            height={height}
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
