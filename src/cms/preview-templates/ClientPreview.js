import React from "react";
import { ClientTemplate } from "../../templates/clients";

const ClientPreview = ({ entry, widgetFor }) => (
    <ClientTemplate
        content={widgetFor("body")}
        description={entry.getIn(["data", "description"])}
        title={entry.getIn(["data", "title"])}
        logo={entry.getIn(["data", "logo"])}
        project={entry.getIn(["data", "project"])}
        outcome={entry.getIn(["data", "outcome"])}
        galleryImages={entry.getIn(["data", "galleryImages"])}
        solutions={entry.getIn(["data", "solutions"])}
    />
);

export default ClientPreview;
