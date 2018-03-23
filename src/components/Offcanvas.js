import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { spacing, colors } from "../theme/theme";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";
import Scrollbars from "react-custom-scrollbars";
import { Transition, TransitionGroup } from "react-transition-group";

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 }
};

const Fade = ({ in: inProp, children }) => (
    <Transition in={inProp} timeout={duration}>
        {state => (
            <div
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}
            >
                {children}
            </div>
        )}
    </Transition>
);

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    background: rgba(7, 23, 44, 0.62);
`;

const Menu = styled.div`
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    position: absolute;
    background: ${colors.background};
    padding: 0 2rem;
    text-align: right;
`;

const Section = styled.div`
    padding: ${props => props.padding}rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Item = styled.div`
    font-weight: 900;
    padding-bottom: 2rem;
    text-transform: uppercase;

    &:last-child {
        padding-bottom: 0;
    }
`;

const StyledLink = styled(Link)`
    font-weight: 900;
    color: ${colors.white};
    &:hover {
        color: ${colors.accent};
    }
`;

const CloseIcon = styled(FAIcon).attrs({
    icon: "times"
})`
    cursor: pointer;
    position: relative;
    z-index: 1;
`;

class Offcanvas extends React.Component {
    render() {
        const { items, toggleOffcanvas, offcanvasActive } = this.props;

        return (
            <TransitionGroup className="todo-list">
                {offcanvasActive && (
                    <Fade>
                        <Overlay onClick={toggleOffcanvas()}>
                            <Menu onClick={e => e.stopPropagation()}>
                                <Scrollbars autoHide>
                                    <Section padding={1.45}>
                                        <CloseIcon
                                            onClick={toggleOffcanvas()}
                                        />
                                    </Section>
                                    <Section padding={3}>
                                        {items.map((item, index) => {
                                            return (
                                                <Item>
                                                    <StyledLink
                                                        to={item.to}
                                                        onClick={toggleOffcanvas()}
                                                    >
                                                        {item.text}
                                                    </StyledLink>
                                                </Item>
                                            );
                                        })}
                                    </Section>
                                    <Section padding={3}>
                                        <Item>Connected Ambition</Item>
                                        <Item>Play Show Reel</Item>
                                    </Section>
                                </Scrollbars>
                            </Menu>
                        </Overlay>
                    </Fade>
                )}
            </TransitionGroup>
        );
    }
}

export default Offcanvas;
