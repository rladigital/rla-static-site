import React from "react";
import styled, { keyframes } from "styled-components";
import { Row, Column } from "rla-components";
import { StickyContainer, Sticky } from "react-sticky";
import FAIcon from "@fortawesome/react-fontawesome";

import { colors } from "../../theme/theme";
import { hexToInt } from "../../helpers/helpers";

import HeaderBlock from "../HeaderBlock";
import SolutionsList from "./SolutionsList";
import SolutionsVideo from "./SolutionsVideo";
import SectionContainer from "../SectionContainer";

const fadeDown = keyframes`
  0%{
    opacity: 0;
    transform: translateY(-10px);
  }

  50%{
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(10px);
  }
`;

let ScrollDown = styled.div.attrs({
    role: "button"
})`
    width: 100%;
    bottom: 0;
    padding: 50px;
    position: fixed;
    text-align: center;
    color: ${colors.background};
    transition: opacity 1s;
    cursor: pointer;
`;

const Chevron = styled(FAIcon).attrs({
    icon: "chevron-down"
})`
    animation: ${fadeDown} 2s linear infinite;
`;

const ScrollDownText = styled.p.attrs({
    children: "Scroll Down"
})`
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
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
        const { height } = this.props;
        const trigger = 50;

        this.setState({
            scrollY: window.pageYOffset
        });

        // Set scroll snapping if  scrolls below a certain point
        if (
            !hasScrolledTop &&
            window.pageYOffset > trigger &&
            window.pageYOffset < height * 2
        ) {
            this.scrollDown();
            hasScrolledTop = true;
        }

        // Reset scroll snapping if scrolls to top of page
        if (hasScrolledTop && window.pageYOffset < trigger) {
            hasScrolledTop = false;
        }
    }
    scrollDown() {
        document.documentElement.scrollTop = this.props.height;
    }

    render() {
        const { width, height, font, scrolltop, solutions } = this.props;
        const { scrollY } = this.state;
        const animation = "transform 0.75s ease, opacity 0.75s ease";

        return (
            <StickyContainer style={{ height: height * 2.5 }}>
                <Sticky>
                    {({ style }) => {
                        return (
                            <div>
                                {window.pageYOffset > 0 &&
                                    window.pageYOffset < height * 2.5 && (
                                        <SolutionsList
                                            style={style}
                                            width={width - 16}
                                            height={height}
                                            scrollY={scrollY}
                                            solutions={solutions}
                                            animation={animation}
                                        />
                                    )}
                                <SolutionsVideo
                                    style={style}
                                    width={width}
                                    height={height}
                                    scrollY={scrollY}
                                    animation={animation}
                                />
                            </div>
                        );
                    }}
                </Sticky>

                <ScrollDown
                    style={{
                        opacity: scrollY == 0 ? 1 : 0
                    }}
                    onClick={() => this.scrollDown()}
                >
                    <ScrollDownText />
                    <Chevron />
                </ScrollDown>
            </StickyContainer>
        );
    }
}

export default SolutionsSection;
