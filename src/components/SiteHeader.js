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
    z-index: 3;
    transition: padding 0.5s ease, color 0.5s ease, background 0.5s ease;
`;

const MenuIcon = styled(FAIcon).attrs({
    icon: "bars"
})`
    cursor: pointer;
    margin: ${spacing.padding}rem 0;
    float: right;
`;

class SiteHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolltop: true
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", () => this.handleScroll());
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", () => this.handleScroll());
    }

    handleScroll() {
        const scrolltop = !Boolean(window.scrollY > 0);

        if (scrolltop != this.state.scrolltop) {
            this.setState({ scrolltop: scrolltop });
        }
    }

    render() {
        const { scrolltop } = this.state;
        const { location, items, toggleOffcanvas } = this.props;
        let isHome = Boolean(location && location.pathname == "/");

        return (
            <div>
                <HeaderContainer
                    style={{
                        padding: `${scrolltop && isHome ? 24 : 10}px 0`,
                        background:
                            scrolltop && isHome
                                ? colors.white
                                : colors.background,
                        color:
                            scrolltop && isHome
                                ? colors.background
                                : colors.white
                    }}
                >
                    <Row>
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
                                    icon="bars"
                                    onClick={toggleOffcanvas()}
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
