import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { ThemeProvider, injectGlobal } from "styled-components";
import { Theme } from "rla-components";
import merge from "lodash/merge";

require("../theme/font-awesome-setup");
import customTheme from "../theme/theme";
import globalCss from "../theme/globalCss";
import { serveStatic } from "../helpers/helpers";

//Add Global CSS
injectGlobal`${globalCss(customTheme)}`;

import SiteHeader from "../components/SiteHeader";
import Offcanvas from "../components/Offcanvas";

import Footer from "../components/Footer";

const navigation = [
    { to: "/Work", text: "Work" },
    { to: "/clients", text: "Clients" },
    { to: "/people", text: "People" },
    { to: "/careers", text: "Careers" },
    { to: "/news", text: "News" },
    { to: "/contact", text: "Contact" }
];

let resizeTimer;

class TemplateWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolltop: 0,
            offcanvasActive: false
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", () => this.handleScroll());
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", () => this.handleScroll());
    }

    toggleOffcanvas() {
        this.setState({ offcanvasActive: !this.state.offcanvasActive });
    }

    handleScroll() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            this.setState({ scrolltop: window.scrollY });
        }, 250);
    }

    render() {
        const { scrolltop } = this.state;
        const { children, location, ...rest } = this.props;
        const isHome = Boolean(location && location.pathname == "/");
        const offcanvasActive = Boolean(
            (scrolltop != 0 || !isHome) && this.state.offcanvasActive
        );
        return (
            <ThemeProvider theme={merge(Theme, customTheme)}>
                <div>
                    <Helmet title="RLA" />

                    <Offcanvas
                        items={navigation}
                        active={true}
                        toggleOffcanvas={() => this.toggleOffcanvas.bind(this)}
                        offcanvasActive={offcanvasActive}
                    />
                    <SiteHeader
                        items={navigation}
                        location={this.props.location}
                        toggleOffcanvas={() => this.toggleOffcanvas.bind(this)}
                        offcanvasActive={offcanvasActive}
                        scrolltop={scrolltop}
                        isHome={isHome}
                    />
                    <div>{children()}</div>
                    {this.props.data && (
                        <Footer items={navigation} data={this.props.data} />
                    )}
                </div>
            </ThemeProvider>
        );
    }
}

TemplateWrapper.propTypes = {
    children: PropTypes.func
};

export default TemplateWrapper;

export const query = graphql`
    query FooterQuery {
        allMarkdownRemark(
            filter: {
                fields: {
                    slug: { regex: "/contacts/(bournemouth)|(london)//" }
                }
            }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        address
                        tel
                        email
                    }
                }
            }
        }
    }
`;
