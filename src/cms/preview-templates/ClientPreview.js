import React from "react";
import { ClientTemplate } from "../../templates/clients";
import withPreviewStyles from "./withPreviewStyles";

const ClientPreview = ({ entry, widgetFor }) => (
    <ClientTemplate
        content={entry.getIn(["data", "description"])}
        title={entry.getIn(["data", "title"])}
        hero={entry.getIn(["data", "hero"])}
        logo={entry.getIn(["data", "logo"])}
        intro={entry.getIn(["data", "intro"])}
        solutions={
            entry.getIn(["data", "solutionsList"])
                ? entry.getIn(["data", "solutionsList"])
                : []
        }
    />
);

export default withPreviewStyles(ClientPreview);
