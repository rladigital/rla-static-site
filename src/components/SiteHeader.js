import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";

import SiteNav from "./SiteNav";
import SiteNavLink from "./SiteNavLink";
import { spacing, colors } from "../theme/theme";
import logo from "../img/rla.svg";
import { serveStatic } from "../helpers/helpers";

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: padding 0.5s ease, color 0.5s ease, background 0.5s ease;
`;

class SiteHeader extends React.Component {
    render() {
        const {
            items,
            toggleOffcanvas,
            scrolltop,
            isHome,
            offcanvasActive
        } = this.props;

        return (
            <div>
                <HeaderContainer
                    style={{
                        padding: `${scrolltop && isHome ? 28 : 20}px 1rem`,
                        color:
                            scrolltop && isHome
                                ? colors.background
                                : colors.white
                    }}
                >
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
                            {scrolltop && isHome ? (
                                <SiteNav>
                                    {items.map((item, index) => {
                                        return (
                                            <SiteNavLink to={item.to}>
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
    }
    componentWillReceiveProps() {
        this.animate.map((animate, i) => {
            animate.beginElement();
        });
    }
    render() {
        const { active, onClick, style } = this.props;

        const pathProps = {
            stroke: "white",
            strokeWidth: 10
        };

        const animateProps = {
            attributeName: "d",
            dur: "500ms",
            fill: "freeze"
        };

        //const menuPaths = ["M5,5 45,5", "M5,25 45,25", "M5,45 45,45"];
        const menuPaths = ["M0,5 50,5", "M0,25 50,25", "M0,45 50,45"];

        const closePaths = ["M5,5 45,45", "M5,25 5,25", "M5,45 45,5"];

        console.log(this.props);

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
