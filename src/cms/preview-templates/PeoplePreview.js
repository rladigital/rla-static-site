import React from "react";
import { ThemeProvider, injectGlobal } from "styled-components";
import { Theme } from "rla-components";
import merge from "lodash/merge";

import Content from "../../components/Content";

require("../../theme/font-awesome-setup");
import customTheme from "../../theme/theme";
import globalCss from "../../theme/globalCss";
//Add Global CSS
injectGlobal`${globalCss(customTheme)}`;
import { PeopleTemplate } from "../../templates/people";

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

export default class PeoplePreview extends React.Component {
    render() {
        const { entry, widgetFor } = this.props;
        return (
            <ThemeProvider theme={merge(Theme, customTheme)}>
                <div>
                    <div dangerouslySetInnerHTML={injectStyles()} />
                    <PeopleTemplate
                        content={entry.getIn(["data", "body"])}
                        title={entry.getIn(["data", "title"])}
                        role={entry.getIn(["data", "role"])}
                        profile={entry.getIn(["data", "profile"])}
                        contentComponent={Content}
                    />
                </div>
            </ThemeProvider>
        );
    }
}
