import React from "react";

import Content from "../../components/Content";
import { SolutionTemplate } from "../../templates/solutions";
import withPreviewStyles from "./withPreviewStyles";

class SolutionPreview extends React.Component {
    render() {
        const { entry, widgetFor } = this.props;
        return (
            <SolutionTemplate
                content={entry.getIn(["data", "body"])}
                title={entry.getIn(["data", "title"])}
                intro={entry.getIn(["data", "intro"])}
                color={entry.getIn(["data", "color"])}
                icon={entry.getIn(["data", "icon"])}
                contentComponent={Content}
            />
        );
    }
}

export default withPreviewStyles(SolutionPreview);
