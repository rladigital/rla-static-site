import CMS from "netlify-cms";
import "netlify-cms/dist/cms.css";

import PeoplePreview from "./preview-templates/PeoplePreview";
import ClientPreview from "./preview-templates/ClientPreview";
import WorkPreview from "./preview-templates/WorkPreview";
import SolutionPreview from "./preview-templates/SolutionPreview";
import NewsPreview from "./preview-templates/NewsPreview";

//CMS.registerPreviewStyle("/styles.css");
//CMS.registerPreviewTemplate("people", PeoplePreview);
//CMS.registerPreviewTemplate("solutions", SolutionPreview);
//CMS.registerPreviewTemplate("news", NewsPreview);
//CMS.registerPreviewTemplate("clients", ClientPreview);
//CMS.registerPreviewTemplate("work", WorkPreview);

CMS.registerEditorComponent({
    // Internal id of the component
    id: "alignableImage",
    // Visible label
    label: "Image (alignable)",
    // Fields the user need to fill out when adding an instance of the component
    fields: [
        { name: "image", label: "Image", widget: "image" },
        { name: "alt", label: "Alt Text", widget: "string" },
        {
            name: "align",
            label: "Alignment",
            widget: "select",
            options: ["Left", "Right"]
        },
        {
            name: "width",
            label: "Width",
            widget: "select",
            options: ["25", "50", "75"],
            default: "50"
        }
    ],
    // Pattern to identify a block as being an instance of this component
    pattern: /^<img src="(\S+)" alt="(\S+)" class="float(\S+) width(\S+)" \/>$/,

    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
        console.log("fromBlock", match);
        return {
            image: match[1],
            alt: match[2],
            align: match[3],
            width: match[4]
        };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) {
        console.log("toBlock", obj);
        return (
            '<img src="' +
            obj.image +
            '" alt="' +
            obj.alt +
            '" class="float' +
            obj.align +
            " width" +
            obj.width +
            '" />'
        );
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) {
        console.log("toPreview", obj);
        return (
            '<img src="' +
            obj.image +
            '" alt="' +
            obj.alt +
            '" class="float' +
            obj.align +
            " width" +
            obj.width +
            '" />'
        );
    }
});
