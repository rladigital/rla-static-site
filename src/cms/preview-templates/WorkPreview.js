import React from "react";
import { WorkTemplate } from "../../templates/work";
import withPreviewStyles from "./withPreviewStyles";

const WorkPreview = ({ entry, widgetFor }) => {
    console.log(entry.getIn(["data", "description"]));
    return (
        <WorkTemplate
            description={entry.getIn(["data", "description"])}
            title={entry.getIn(["data", "title"])}
            hero={entry.getIn(["data", "hero"])}
            logo={entry.getIn(["data", "logo"])}
            intro={entry.getIn(["data", "intro"])}
            description={entry.getIn(["data", "description"])}
            galleryImages={entry.getIn(["data", "galleryImages"])}
            solutionsList={entry.getIn(["data", "solutionsList"])}
        />
    );
};

export default withPreviewStyles(WorkPreview);
