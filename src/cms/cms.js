import CMS from "netlify-cms";
import "netlify-cms/dist/cms.css";

import PeoplePreview from "./preview-templates/PeoplePreview";
import ClientPreview from "./preview-templates/ClientPreview";
import WorkPreview from "./preview-templates/WorkPreview";
import SolutionPreview from "./preview-templates/SolutionPreview";
import NewsPreview from "./preview-templates/NewsPreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("people", PeoplePreview);
CMS.registerPreviewTemplate("solutions", SolutionPreview);
CMS.registerPreviewTemplate("news", NewsPreview);
CMS.registerPreviewTemplate("clients", ClientPreview);
CMS.registerPreviewTemplate("work", WorkPreview);
