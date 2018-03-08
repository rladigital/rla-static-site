import React from "react";
import { ThemeProvider, injectGlobal } from "styled-components";
import { Theme } from "rla-components";
import merge from "lodash/merge";

require("../../theme/font-awesome-setup");
import customTheme from "../../theme/theme";
import globalCss from "../../theme/globalCss";
//Add Global CSS
injectGlobal`${globalCss(customTheme)}`;

const injectStyles = () => {
    // Make a new div
    const div = document.createElement("div");
    // Find all style tags
    const styleTags = document.head.getElementsByTagName("style");

    // Iterate over all the tags
    for (let i = 0; i < styleTags.length; i++) {
        let tag = styleTags[i];

        // If the style tag is from styled-components then copy it into the div.
        if (tag.hasAttribute("data-styled-components")) {
            //console.log(tag.innerHTML);
            div.appendChild(tag.cloneNode(true));
        }
    }

    // Get the innerHTML of the div as a string
    return { __html: div.innerHTML };
};
const withPreviewStyles = WrappedComponent => {
    return class PreviewWrapper extends React.Component {
        render() {
            return (
                <ThemeProvider theme={merge(Theme, customTheme)}>
                    <div>
                        <div dangerouslySetInnerHTML={injectStyles()} />
                        <WrappedComponent {...this.props} />
                    </div>
                </ThemeProvider>
            );
        }
    };
};
export default withPreviewStyles;
