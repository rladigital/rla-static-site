import CMS from "netlify-cms";
import "netlify-cms/dist/cms.css";

import PeoplePreview from "./preview-templates/PeoplePreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("people", PeoplePreview);
