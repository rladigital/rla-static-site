import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { ThemeProvider, injectGlobal } from "styled-components";
import { Theme } from "rla-components";
import merge from "lodash/merge";

require("../theme/font-awesome-setup");
import customTheme from "../theme/theme";
import globalCss from "../theme/globalCss";
//Add Global CSS
injectGlobal`${globalCss(customTheme)}`;

import SiteHeader from "../components/SiteHeader";

import Footer from "../components/Footer";

const TemplateWrapper = ({ children, data, location }) => (
    <ThemeProvider theme={merge(Theme, customTheme)}>
        <div>
            <Helmet title="RLA" />
            <SiteHeader location={location} />
            <div>{children()}</div>
            <Footer data={data} />
        </div>
    </ThemeProvider>
);

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
