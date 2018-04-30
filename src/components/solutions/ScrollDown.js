import React from "react";
import styled, { keyframes } from "styled-components";
import FAIcon from "@fortawesome/react-fontawesome";
import { breakpoints } from "../../theme/theme";

let Container = styled.div.attrs({
    role: "button"
})`
    width: 100%;
    bottom: 0;
    padding: 5px;
    position: fixed;
    text-align: center;
    transition: opacity 1s;
    cursor: pointer;
    z-index: 1;
    color: ${props => props.color};
    @media (min-width: ${breakpoints.medium}px) {
        padding: 50px;
    }
`;

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

const ScrollDownText = styled.h6.attrs({
    children: "Scroll Down"
})`
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
`;

const Chevron = styled(FAIcon).attrs({
    icon: "chevron-down"
})`
    animation: ${fadeDown} 2s linear infinite;
`;

const ScrollDown = ({ ...rest }) => {
    return (
        <Container {...rest}>
            <ScrollDownText />
            <Chevron />
        </Container>
    );
};

export default ScrollDown;
