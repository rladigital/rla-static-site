import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";

import SiteNav from "./SiteNav";
import SiteNavLink from "./SiteNavLink";
import { spacing, colors } from "../theme/theme";
import { isMobile, isBrowser, transparentize } from "../helpers/helpers";

let resizeTimer;

const Logo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 148 60"
            width="88"
            height="38"
        >
            <path
                d="M105,6.1L85.3,55V44.7H67.8V6.5H49.9v15c-0.6-3.6-2.2-6.5-4.6-8.9c-3.7-3.7-9.8-6.1-19.2-6.1H0v53.4h17.9V44.7	h3.8l10.1,15.3h18.2v0h33.3h2h16.2l2.7-7.2H123l2.8,7.2h19.4L122.7,6.1H105z M32.4,26.7c0,3.3-2.6,5.2-6.9,5.2h-7.7V21.5h7.8	c4.1,0,6.8,1.7,6.8,5.1V26.7z M39.7,41.8c5.5-2.6,9.2-6.9,10.2-12.9v27.8L39.7,41.8z M108.8,40.1l4.9-13l4.9,13H108.8z M139.3,0	c-4.8,0-8.7,3.9-8.7,8.7s3.9,8.7,8.7,8.7c4.8,0,8.7-3.9,8.7-8.7S144.1,0,139.3,0z M139.3,16.4c-4.3,0-7.7-3.5-7.7-7.7	c0-4.3,3.5-7.7,7.7-7.7c4.3,0,7.7,3.5,7.7,7.7C147.1,13,143.6,16.4,139.3,16.4z M145.2,8.4v3.3h-1.3V8.7c0-0.8-0.2-1.1-0.7-1.1	c-0.7,0-1.1,0.6-1.2,1.1c0,0.2-0.1,0.4-0.1,0.6v2.4h-1.3V8.6c0-0.7-0.1-1.1-0.7-1.1c-0.7,0-1.1,0.6-1.3,1.2c0,0.1,0,0.2,0,0.4v2.6	l-1.3,0V8.1c0-0.5-0.2-0.5-0.3-0.5h0V6.5l0,0c0,0,0.1,0,0.1,0c0.7,0,1.2,0.1,1.4,0.6c0.4-0.4,1-0.7,1.6-0.7c0.8,0,1.3,0.3,1.5,0.9	c0.3-0.5,0.9-0.9,1.7-0.9C144.6,6.3,145.2,7,145.2,8.4z M136.5,10.5l0.2,0v1.2l-0.1,0c0,0-0.2,0-0.3,0c-0.6,0-2-0.2-2-2V7.5h-0.7	V6.4h0.7V5.1h1.2v1.4h1.2v1.1h-1.2v2.1c0,0.6,0.3,1,0.9,1C136.4,10.6,136.4,10.5,136.5,10.5z"
                fill="currentColor"
            />
        </svg>
    );
};

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: padding 0.5s ease, color 0.5s ease, background 0.5s ease;
`;

class SiteHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolltop: 0
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", () => this.handleScroll());
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", () => this.handleScroll());
    }
    handleScroll() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            this.setState({ scrolltop: window.scrollY });
        }, 250);
    }

    render() {
        const { items, toggleOffcanvas, isHome, offcanvasActive } = this.props;

        const { scrolltop } = this.state;

        const logoOpacity = scrolltop == 0 && isHome ? 0 : 1;

        const headerPadding = scrolltop == 0 && isHome ? 28 : 20;

        const foregroundColor =
            scrolltop == 0 && isHome ? colors.background : colors.white;

        const headerBackground =
            (isBrowser() && (scrolltop > window.innerHeight && isHome)) ||
            (isBrowser() && !isHome)
                ? `linear-gradient(to bottom,  ${transparentize(
                      colors.background,
                      0.7
                  )}, transparent)`
                : "transparent";

        return (
            <div>
                <HeaderContainer
                    style={{
                        padding: `${headerPadding}px 1rem`,
                        color: foregroundColor,
                        background: headerBackground
                    }}
                >
                    <Row expanded>
                        <Column small={6} medium={3}>
                            <Link
                                to="/"
                                style={{
                                    color: "inherit",
                                    opacity: logoOpacity
                                }}
                            >
                                <Logo alt="RLA" style={{ width: "88px" }} />
                            </Link>
                        </Column>
                        <Column small={6} medium={9}>
                            {isBrowser() &&
                            !isMobile() &&
                            (scrolltop == 0 && isHome) ? (
                                <SiteNav>
                                    {items.map((item, index) => {
                                        return (
                                            <SiteNavLink
                                                key={index}
                                                to={item.to}
                                            >
                                                {item.text}
                                            </SiteNavLink>
                                        );
                                    })}
                                </SiteNav>
                            ) : (
                                <MenuIcon
                                    active={offcanvasActive}
                                    onClick={toggleOffcanvas}
                                    style={{
                                        float: "right",
                                        marginTop: "0.7rem",
                                        cursor: "pointer"
                                    }}
                                />
                            )}
                        </Column>
                    </Row>
                </HeaderContainer>
            </div>
        );
    }
}

export default SiteHeader;

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
                onClick={onClick()}
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
