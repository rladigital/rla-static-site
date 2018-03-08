import CMS from "netlify-cms";
import "netlify-cms/dist/cms.css";

import PeoplePreview from "./preview-templates/PeoplePreview";
import ClientPreview from "./preview-templates/ClientPreview";

// // Find all style tags
// const styleTags = document.head.getElementsByTagName("style");

// // Iterate over all the tags
// for (let i = 0; i < styleTags.length; i++) {
//     let tag = styleTags[i];

//     // If the style tag is from styled-components then copy it into the div.
//     if (tag.hasAttribute("data-styled-components")) {
//         console.log(tag.innerHTML);
//         //div.appendChild(tag.cloneNode(true));
//     }
// }

// Get the innerHTML of the div as a string
//let styles = div.innerHTML;

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("people", PeoplePreview);
CMS.registerPreviewTemplate("clients", ClientPreview);
