import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { ThemeProvider, injectGlobal } from "styled-components";
import { Theme } from "rla-components";
import merge from "lodash/merge";

import customTheme from "../theme/theme";
import globalCss from "../theme/globalCss";
import { serveStatic } from "../helpers/helpers";
import Offcanvas from "../components/Offcanvas";
import Footer from "../components/Footer";
require("../theme/font-awesome-setup");

//Add Global CSS
injectGlobal`${globalCss(customTheme)}`;

class TemplateWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offcanvasColor: null
        };

        this.setOffcanvasColor = this.setOffcanvasColor.bind(this);
    }
    setOffcanvasColor(x) {
        this.setState({ offcanvasColor: x });
    }
    render() {
        const { offcanvasColor } = this.state;
        const { children, location, ...rest } = this.props;

        return (
            <ThemeProvider theme={merge(Theme, customTheme)}>
                <div style={{ height: "100%" }}>
                    <Helmet title="RLA" />
                    <Offcanvas
                        location={location}
                        offcanvasColor={offcanvasColor}
                    />
                    <div style={{ height: "100%" }}>
                        {children({
                            ...this.props,
                            setOffcanvasColor: this.setOffcanvasColor
                        })}
                    </div>
                    {this.props.data && <Footer data={this.props.data} />}
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
            sort: { fields: [frontmatter___title], order: ASC }
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
