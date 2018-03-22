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
    { to: "/solutions", text: "Solutions" },
    { to: "/Work", text: "Work" },
    { to: "/clients", text: "Clients" },
    { to: "/people", text: "People" },
    { to: "/news", text: "News" },
    { to: "/contact", text: "Contact" }
];

class TemplateWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolltop: true,
            offcanvasActive: false
        };
    }

    toggleOffcanvas() {
        this.setState({ offcanvasActive: !this.state.offcanvasActive });
        console.log("test", this.state.offcanvasActive ? "active" : "closed");
    }

    render() {
        const { scrolltop, offcanvasActive } = this.state;
        const { children, ...rest } = this.props;
        return (
            <ThemeProvider theme={merge(Theme, customTheme)}>
                <div>
                    <Helmet title="RLA" />
                    <SiteHeader
                        items={navigation}
                        location={this.props.location}
                        toggleOffcanvas={() => this.toggleOffcanvas.bind(this)}
                        offcanvasActive={offcanvasActive}
                    />
                    <Offcanvas
                        items={navigation}
                        active={true}
                        toggleOffcanvas={() => this.toggleOffcanvas.bind(this)}
                        offcanvasActive={offcanvasActive}
                    />
                    <div>{children()}</div>
                    <Footer data={this.props.data} />
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
                    slug: { regex: "/contacts/(bournemouth)|(belfast)//" }
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
