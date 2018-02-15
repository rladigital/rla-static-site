import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { ThemeProvider, injectGlobal } from "styled-components";
import { Theme } from "rla-components";
import merge from "lodash/merge";

import customTheme from "../theme/theme";
import globalCss from "../theme/globalCss";
//Add Global CSS
injectGlobal`${globalCss(customTheme)}`;

import SiteHeader from "../components/SiteHeader";

const TemplateWrapper = ({ children }) => (
    <ThemeProvider theme={merge(Theme, customTheme)}>
        <div>
            <Helmet title="RLA" />
            <SiteHeader />
            <div>{children()}</div>
        </div>
    </ThemeProvider>
);

TemplateWrapper.propTypes = {
    children: PropTypes.func
};

export default TemplateWrapper;
