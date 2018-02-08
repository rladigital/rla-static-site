import CMS from "netlify-cms";
import "netlify-cms/dist/cms.css";

import PeoplePreview from "./preview-templates/PeoplePreview";
import ClientPreview from "./preview-templates/ClientPreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("people", PeoplePreview);
CMS.registerPreviewTemplate("clients", ClientPreview);
