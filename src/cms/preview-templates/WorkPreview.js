import React from "react";
import { WorkTemplate } from "../../templates/work";
import withPreviewStyles from "./withPreviewStyles";

const WorkPreview = ({ entry, widgetFor }) => (
    <WorkTemplate
        content={entry.getIn(["data", "description"])}
        title={entry.getIn(["data", "title"])}
        hero={entry.getIn(["data", "hero"])}
        logo={entry.getIn(["data", "logo"])}
        intro={entry.getIn(["data", "intro"])}
        project={entry.getIn(["data", "project"])}
        outcome={entry.getIn(["data", "outcome"])}
        galleryImages={entry.getIn(["data", "galleryImages"])}
        solutions={entry.getIn(["data", "solutions"])}
    />
);

export default withPreviewStyles(WorkPreview);
