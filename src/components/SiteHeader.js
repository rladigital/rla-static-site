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
    z-index: 1;
    background: ${colors.background};
    transition: padding 0.5s ease;
    z-index: 3;
`;

const Icon = styled(FAIcon)`
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
        !serveStatic() &&
            window.addEventListener("scroll", () => this.handleScroll());
    }
    componentWillUnmount() {
        !serveStatic() &&
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
        return (
            <div>
                <HeaderContainer
                    style={{
                        padding: `${scrolltop ? 24 : 10}px 0`
                    }}
                >
                    <Row>
                        <Column medium={2}>
                            <Link to="/">
                                <img
                                    src={logo}
                                    alt="RLA"
                                    style={{ width: "88px" }}
                                />
                            </Link>
                        </Column>
                        <Column medium={10}>
                            {scrolltop ? (
                                <SiteNav>
                                    <SiteNavLink to="/solutions">
                                        Solutions
                                    </SiteNavLink>
                                    <SiteNavLink to="/work">Work</SiteNavLink>
                                    <SiteNavLink to="/clients">
                                        Clients
                                    </SiteNavLink>
                                    <SiteNavLink to="/people">
                                        People
                                    </SiteNavLink>
                                    <SiteNavLink to="/news">News</SiteNavLink>
                                    <SiteNavLink to="/contact">
                                        Contact
                                    </SiteNavLink>
                                </SiteNav>
                            ) : (
                                <Icon icon="bars" />
                            )}
                        </Column>
                    </Row>
                </HeaderContainer>
            </div>
        );
    }
}

export default SiteHeader;
