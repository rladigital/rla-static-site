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

let ScrollDown = styled.div`
    width: 100%;
    bottom: 0;
    padding: 50px;
    position: fixed;
    text-align: center;
    pointer-events: none;
    color: ${colors.background};
    transition: opacity 1s;
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

//#082748
class SolutionsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: window.scrollY
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", () => this.handleScroll());
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", () => this.handleScroll());
    }
    handleScroll() {
        this.setState({
            scrollY: window.scrollY
        });
    }

    render() {
        const { width, height, font, scrolltop, solutions } = this.props;
        const { scrollY } = this.state;
        const animation = "transform 0.25s ease, opacity 0.25s ease";

        return (
            <StickyContainer style={{ height: height * 2.5 }}>
                <Sticky>
                    {({ style }) => {
                        return (
                            <div>
                                <SolutionsList
                                    style={style}
                                    width={width - 16}
                                    height={height}
                                    scrollY={scrollY}
                                    solutions={solutions}
                                    animation={animation}
                                />
                                {scrollY < height && (
                                    <SolutionsVideo
                                        style={style}
                                        width={width}
                                        height={height}
                                        scrollY={scrollY}
                                        animation={animation}
                                    />
                                )}
                            </div>
                        );
                    }}
                </Sticky>

                <ScrollDown
                    style={{
                        opacity: font && scrolltop != 0 ? 1 : 0
                    }}
                >
                    <ScrollDownText />
                    <Chevron />
                </ScrollDown>
            </StickyContainer>
        );
    }
}

export default SolutionsSection;
