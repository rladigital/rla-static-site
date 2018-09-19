import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";
import Scrollbars from "react-custom-scrollbars";
import { Transition, TransitionGroup } from "react-transition-group";

import { Social } from "../components/blog/Icon";
import logo from "../img/rla.svg";

import { spacing, colors, breakpoints } from "../theme/theme";
import { navigation } from "../utils/config";
import { transparentize, isBrowser, isMobile } from "../helpers/helpers";

const duration = 500;

const fade = {
    default: {
        transition: `all ${duration}ms ease`,
        opacity: 0
    },
    entering: {
        opacity: 0
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
        transform: "translateX(100%)",
        opacity: 0
    },
    entered: {
        transform: "translateX(0)",
        opacity: 1
    }
};

const HeaderBackground = styled.div`
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 80px;
    position: fixed;
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        ${transparentize(colors.background, 0.7)},
        transparent
    );
    z-index: 1;
`;

const HeaderContainer = styled.div`
    top: 0;
    z-index: 6;
    position: fixed;
    text-align: center;
    color: ${props =>
        props.offcanvasColor ? props.offcanvasColor : colors.white};
    padding: ${spacing.padding}rem;
    transition: color 1s ease;
    @media (min-width: ${breakpoints.medium}px) {
        z-index: ${props => props.zIndex};
    }
`;

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 4;
    background: ${transparentize(colors.reallyDarkBlueGray, 0.1)};
    z-index: 2;
    top: 0;
`;

const Menu = styled.div`
    top: 0;
    right: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    position: fixed;
    text-align: right;
    padding: 0 ${spacing.padding}rem;
    background: ${colors.reallyDarkBlueGray};
    font-family: ${props => props.theme.headings.fontFamily};
    @media (min-width: ${breakpoints.medium}px) {
        z-index: 2;
        width: 400px;
    }
`;

const Section = styled.div`
    padding: ${props => props.padding}rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Item = styled.div`
    font-weight: 600;
    padding-bottom: 2rem;
    text-transform: uppercase;
    &:last-child {
        padding-bottom: 0;
    }
`;

const Logo = styled.img`
    width: 88px;
`;

const StyledLink = styled(Link)`
    font-weight: 600;
    color: ${colors.white};
    &:hover {
        color: ${colors.accent};
    }
`;

const SocialContainer = styled.div`
    padding: ${props => props.padding}rem 0;
`;

class Offcanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offcanvasActive: false
        };

        this.openOffcanvas = this.openOffcanvas.bind(this);
        this.closeOffcanvas = this.closeOffcanvas.bind(this);
    }

    openOffcanvas() {
        this.setState({ offcanvasActive: true });
    }

    closeOffcanvas() {
        this.setState({ offcanvasActive: false });
    }

    renderLogo() {
        return (
            <Link to="/">
                <Logo src={logo} alt="RLA" />
            </Link>
        );
    }

    render() {
        const { location, offcanvasColor } = this.props;
        const { offcanvasActive } = this.state;

        const transitionProps = {
            in: offcanvasActive,
            timeout: duration,
            appear: true,
            unmountOnExit: true,
            mountOnEnter: true
        };

        return [
            <HeaderBackground />,
            <HeaderContainer
                zIndex={2}
                style={{ left: 0 }}
                offcanvasColor={offcanvasColor}>
                {this.renderLogo.apply(this)}
            </HeaderContainer>,
            <HeaderContainer
                zIndex={4}
                style={{ right: 0 }}
                offcanvasColor={
                    offcanvasActive ? colors.white : offcanvasColor
                }>
                <MenuIcon
                    active={offcanvasActive}
                    onClick={
                        offcanvasActive
                            ? this.closeOffcanvas
                            : this.openOffcanvas
                    }
                    style={{
                        float: "right",
                        margin: "0.7rem",
                        cursor: "pointer"
                    }}
                />
            </HeaderContainer>,
            <Transition {...transitionProps}>
                {state => (
                    <Overlay
                        onClick={this.closeOffcanvas}
                        id="overlay"
                        style={{
                            ...fade.default,
                            ...fade[state]
                        }}
                    />
                )}
            </Transition>,

            <Transition {...transitionProps}>
                {state => (
                    <Menu
                        onClick={e => e.stopPropagation()}
                        style={{
                            ...slide.default,
                            ...slide[state]
                        }}>
                        <Scrollbars autoHide>
                            <Section padding={2.2}>&nbsp;</Section>
                            <Section padding={3}>
                                {navigation.map((item, index) => {
                                    return (
                                        <Item key={index}>
                                            <StyledLink
                                                to={item.to}
                                                onClick={this.closeOffcanvas}>
                                                {item.text}
                                            </StyledLink>
                                        </Item>
                                    );
                                })}
                            </Section>

                            <SocialContainer padding={3}>
                                <SocialIcon
                                    icon="twitter"
                                    href="https://twitter.com/rlagroup"
                                    target="_blank"
                                />
                                <SocialIcon
                                    icon="linkedin-in"
                                    href="https://www.linkedin.com/company/rla-group"
                                    target="_blank"
                                />
                            </SocialContainer>
                        </Scrollbars>
                    </Menu>
                )}
            </Transition>
        ];
    }
}

export default Offcanvas;

const SocialIcon = ({ ...rest }) => (
    <Social
        size={35}
        borderColor={colors.accent}
        color={colors.white}
        margin="0 0 1rem 0.8rem"
        transform="shrink-8 up-0.5"
        {...rest}
    />
);
class MenuIcon extends React.Component {
    constructor(props) {
        super(props);
        this.animate = [];
        this.state = {
            active: false,
            canAnimate: true,
            shouldAnimate: false,
            menuPaths: ["M0,5 50,5", "M0,25 50,25", "M0,45 50,45"],
            closePaths: ["M5,5 45,45", "M5,25 5,25", "M5,45 45,5"]
        };
    }

    componentDidMount() {
        if ("beginElement" in this.animate[0] === false) {
            this.setState({
                canAnimate: false,
                closePaths: this.state.menuPaths
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { active } = nextProps;
        if (this.state.active != active) {
            this.animate.map((animate, i) => {
                if ("beginElement" in animate) {
                    animate.beginElement();
                }
            });
            this.setState({ active: active });

            // update should animate
            if (this.state.shouldAnimate == false) {
                this.setState({ shouldAnimate: true });
            }
        }
    }
    render() {
        const { active, onClick, innerRef, ...rest } = this.props;
        const { shouldAnimate, menuPaths, closePaths } = this.state;

        const pathProps = {
            stroke: "currentColor",
            strokeWidth: 5
        };

        const animateProps = {
            attributeName: "d",
            dur: "500ms",
            fill: "freeze"
        };

        return (
            <svg
                width="20"
                height="20"
                viewBox="0 0 50 50"
                onClick={onClick}
                ref={innerRef}
                {...rest}>
                {menuPaths.map((path, i) => {
                    return (
                        <path
                            key={i}
                            d={!shouldAnimate || active ? path : closePaths[i]}
                            {...pathProps}>
                            <animate
                                {...animateProps}
                                to={active ? closePaths[i] : path}
                                ref={svg => {
                                    this.animate[i] = svg;
                                }}
                            />
                        </path>
                    );
                })}
            </svg>
        );
    }
}
