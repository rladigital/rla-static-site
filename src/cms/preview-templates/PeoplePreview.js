import React from "react";
import { PeopleTemplate } from "../../templates/people";

const PeoplePreview = ({ entry, widgetFor }) => (
    <PeopleTemplate
        content={widgetFor("body")}
        description={entry.getIn(["data", "description"])}
        title={entry.getIn(["data", "title"])}
    />
);

export default PeoplePreview;
