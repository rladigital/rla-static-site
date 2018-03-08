import React from "react";

import Content from "../../components/Content";
import { PeopleTemplate } from "../../templates/people";
import withPreviewStyles from "./withPreviewStyles";

class PeoplePreview extends React.Component {
    render() {
        const { entry, widgetFor } = this.props;
        return (
            <PeopleTemplate
                content={entry.getIn(["data", "body"])}
                title={entry.getIn(["data", "title"])}
                role={entry.getIn(["data", "role"])}
                profile={entry.getIn(["data", "profile"])}
                contentComponent={Content}
            />
        );
    }
}

export default withPreviewStyles(PeoplePreview);
