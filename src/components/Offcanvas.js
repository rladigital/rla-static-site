import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { spacing, colors } from "../theme/theme";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";
import Scrollbars from "react-custom-scrollbars";
import { Transition, TransitionGroup } from "react-transition-group";

const duration = 500;

const fade = {
    default: {
        transition: `all ${duration}ms ease`,
        opacity: 0
    },
    entering: {
        opacity: 1
    },
    entered: {
        opacity: 1
    }
};

const slide = {
    default: {
        transition: `all ${duration}ms ease`,
        transform: "translateX(100%)",
        opacity: 0
    },
    entering: {
        transform: "translateX(0)",
        opacity: 1
    },
    entered: {
        transform: "translateX(0)",
        opacity: 1
    }
};

const Slide = ({ in: inProp, children }) => (
    <Transition in={inProp} timeout={duration}>
        {state => (
            <Menu
                onClick={e => e.stopPropagation()}
                style={{
                    ...slide.default,
                    ...slide[state]
                }}
            >
                {children}
            </Menu>
        )}
    </Transition>
);

const Menu = styled.div`
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    position: fixed;
    background: ${colors.background};
    padding: 0 2rem;
    text-align: right;
    z-index: 999;
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

class Offcanvas extends React.Component {
    render() {
        const { items, toggleOffcanvas, offcanvasActive } = this.props;

        return (
            <TransitionGroup className="todo-list">
                {offcanvasActive && (
                    <Slide>
                        <Scrollbars autoHide>
                            <Section padding={2.05}>&nbsp;</Section>
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
                        </Scrollbars>
                    </Slide>
                )}
            </TransitionGroup>
        );
    }
}

export default Offcanvas;
