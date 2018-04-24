import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";
import Scrollbars from "react-custom-scrollbars";
import { Transition, TransitionGroup } from "react-transition-group";

import Social from "../components/blog/Social";
import logo from "../img/rla.svg";

import { spacing, colors } from "../theme/theme";
import { navigation } from "../utils/config";
import { transparentize } from "../helpers/helpers";

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

const HeaderContainer = styled.div`
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    color: ${colors.white};
    padding: 1.2rem 1rem;
    background: linear-gradient(
        to bottom,
        ${transparentize(colors.background, 0.7)},
        transparent
    );
    z-index: 2;
`;

const Menu = styled.div`
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    position: fixed;
    background: ${colors.reallyDarkBlueGray};
    padding: 0 2rem;
    text-align: right;
    z-index: 1;
    font-family: ${props => props.theme.headings.fontFamily};
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

        this.toggleOffcanvas = this.toggleOffcanvas.bind(this);
    }

    toggleOffcanvas() {
        this.setState({ offcanvasActive: !this.state.offcanvasActive });
    }

    render() {
        const { offcanvasActive } = this.state;

        return [
            <HeaderContainer>
                <Row expanded>
                    <Column small={6} medium={3}>
                        <Link to="/">
                            <img
                                src={logo}
                                alt="RLA"
                                style={{ width: "88px" }}
                            />
                        </Link>
                    </Column>
                    <Column small={6} medium={9}>
                        <MenuIcon
                            active={offcanvasActive}
                            onClick={this.toggleOffcanvas}
                            style={{
                                float: "right",
                                marginTop: "0.7rem",
                                cursor: "pointer"
                            }}
                        />
                    </Column>
                </Row>
            </HeaderContainer>,

            <TransitionGroup>
                {offcanvasActive && (
                    <Slide>
                        <Scrollbars autoHide>
                            <Section padding={2.05}>&nbsp;</Section>
                            <Section padding={3}>
                                {navigation.map((item, index) => {
                                    return (
                                        <Item key={index}>
                                            <StyledLink to={item.to}>
                                                {item.text}
                                            </StyledLink>
                                        </Item>
                                    );
                                })}
                            </Section>

                            <SocialContainer padding={3}>
                                <SocialIcon
                                    icon="facebook-f"
                                    href="https://www.facebook.com/rlagroup/"
                                    target="_blank"
                                />
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
                    </Slide>
                )}
            </TransitionGroup>
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
        }
    }
    render() {
        const { active, onClick, style } = this.props;
        const { menuPaths, closePaths } = this.state;

        const pathProps = {
            stroke: "currentColor",
            strokeWidth: 10
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
                style={style}
            >
                {menuPaths.map((path, i) => {
                    return (
                        <path
                            key={i}
                            d={active ? path : closePaths[i]}
                            {...pathProps}
                        >
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

const Slide = ({ in: inProp, children }) => (
    <Transition in={inProp} timeout={duration} appear={true}>
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
