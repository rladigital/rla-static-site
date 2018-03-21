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

import Footer from "../components/Footer";

class TemplateWrapper extends React.Component {
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
        const { children, data, location } = this.props;
        return (
            <ThemeProvider theme={merge(Theme, customTheme)}>
                <div>
                    <Helmet title="RLA" />
                    <SiteHeader location={location} scrolltop={scrolltop} />
                    <div>
                        {children({ ...this.props, scrolltop: scrolltop })}
                    </div>
                    <Footer data={data} />
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
