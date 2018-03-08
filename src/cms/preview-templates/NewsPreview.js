import React from "react";

import Content from "../../components/Content";
import { NewsTemplate } from "../../templates/news";
import withPreviewStyles from "./withPreviewStyles";

class NewsPreview extends React.Component {
    render() {
        const { entry, widgetFor } = this.props;
        return (
            <NewsTemplate
                content={entry.getIn(["data", "body"])}
                title={entry.getIn(["data", "title"])}
                intro={entry.getIn(["data", "intro"])}
                sideHeading={entry.getIn(["data", "sideHeading"])}
                galleryImages={entry.getIn(["data", "galleryImages"])}
                hero={entry.getIn(["data", "hero"])}
                date={entry.getIn(["data", "date"])}
                contentComponent={Content}
            />
        );
    }
}

export default withPreviewStyles(NewsPreview);
