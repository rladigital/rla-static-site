import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import RemarkExternalLinks from "remark-external-links";

export default ({ content, className, style }) => {
    return (
        <div className={className} style={style}>
            {
                Remark()
                    .use(ReactRenderer)
                    .use(RemarkExternalLinks, {
                        target: "_blank"
                    })
                    .processSync(content).contents
            }
        </div>
    );
};
export const HTMLContent = ({ content, className, style }) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
            style={style}
        />
    );
};
